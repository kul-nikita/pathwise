import { NextResponse } from "next/server";
import { z } from "zod";
import { requireUser } from "@/lib/auth/session";
import { isAdmin } from "@/lib/auth/admin";
import {
  deleteResource,
  findResourceByUrl,
  findResourcesByIds,
  listResources,
  upsertResource
} from "@/lib/db/resources";
import { deleteResourceNode, existingSkillIds, upsertResourceNode } from "@/lib/graph/mutations";
import { indexResource, removeResourceFromIndex } from "@/lib/vector/index-resource";
import {
  checkUrl,
  isAllowedHost,
  normalizeHost,
  structuralIssues
} from "@/lib/services/catalog-validation";
import type { LearningResource } from "@/lib/types";

export const dynamic = "force-dynamic";

async function requireAdmin() {
  const user = await requireUser();
  if (!isAdmin(user)) {
    throw new Error("forbidden");
  }
  return user;
}

function guard(error: unknown) {
  const message = error instanceof Error ? error.message : "";
  return message === "forbidden"
    ? NextResponse.json({ error: "Admin access required." }, { status: 403 })
    : NextResponse.json({ error: "Not signed in." }, { status: 401 });
}

export async function GET() {
  try {
    await requireAdmin();
  } catch (error) {
    return guard(error);
  }

  const resources = await listResources();
  return NextResponse.json({
    resources: resources.sort((a, b) => a.title.localeCompare(b.title))
  });
}

const resourceSchema = z.object({
  id: z
    .string()
    .min(3)
    .max(80)
    .regex(/^[a-z0-9-]+$/, "Use lowercase letters, numbers and hyphens."),
  title: z.string().min(3).max(200),
  provider: z.string().min(2).max(100),
  url: z.string().url().max(2000),
  resourceType: z.enum(["course", "lab", "doc", "project", "video"]),
  skillTags: z.array(z.string().min(1)).min(1),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
  durationMinutes: z.number().int().positive().max(10_000),
  costType: z.enum(["free", "paid", "freemium"]),
  language: z.string().min(2).max(10).default("en"),
  qualityScore: z.number().min(0).max(1),
  prerequisites: z.array(z.string().min(1)).default([]),
  evidenceType: z.string().max(80).nullable().default(null),
  description: z.string().min(10).max(2000),
  /** Rule 7 is a guardrail, not a wall — but stepping over it has to be explicit. */
  allowNewDomain: z.boolean().default(false)
});

/**
 * Create or update one catalog row across all three stores.
 *
 * Mongo and Neo4j both have to succeed: Mongo holds the metadata the UI reads
 * and Neo4j holds the edges the prerequisite gate traverses, so a row present
 * in one and missing from the other is a genuinely broken state. Qdrant is
 * different — it only ranks, and a resource missing from it is still fully
 * reachable by skill tag, so an embedding failure degrades search rather than
 * failing the write.
 */
export async function POST(request: Request) {
  try {
    await requireAdmin();
  } catch (error) {
    return guard(error);
  }

  const parsed = resourceSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { allowNewDomain, ...input } = parsed.data;
  const known = await existingSkillIds([...input.skillTags, ...input.prerequisites]);
  const issues = structuralIssues(
    { ...input, isCurated: true, lastVerifiedAt: "" } as LearningResource,
    known
  );

  if (!isAllowedHost(input.url) && !allowNewDomain) {
    return NextResponse.json(
      {
        error: "new_domain",
        host: normalizeHost(input.url),
        message:
          "That host is not in the sourcing allowlist. Confirm it is a trusted provider to add it."
      },
      { status: 409 }
    );
  }

  const duplicate = await findResourceByUrl(input.url);
  if (duplicate && duplicate.id !== input.id) {
    issues.push({
      field: "url",
      message: `That URL is already in the catalog as "${duplicate.title}" (${duplicate.id}).`
    });
  }

  if (issues.length > 0) {
    return NextResponse.json({ error: "invalid", issues }, { status: 422 });
  }

  // Rule 8: the row is only stored if the server could actually reach the URL.
  const urlCheck = await checkUrl(input.url);
  if (!urlCheck.ok) {
    return NextResponse.json(
      { error: "unreachable_url", issues: [{ field: "url", message: urlCheck.detail }] },
      { status: 422 }
    );
  }

  const resource: LearningResource = {
    ...input,
    isCurated: true,
    // Set from the check that just happened, never accepted from the client —
    // it is a claim about verification, so it has to be earned.
    lastVerifiedAt: new Date().toISOString().slice(0, 10)
  };

  await upsertResource(resource);
  await upsertResourceNode(resource);

  let indexed = true;
  let indexError: string | null = null;
  try {
    await indexResource(resource);
  } catch (error) {
    indexed = false;
    indexError = error instanceof Error ? error.message : String(error);
  }

  return NextResponse.json({
    resource,
    stores: { mongo: true, neo4j: true, qdrant: indexed },
    urlCheck,
    warning: indexed
      ? null
      : `Saved, but semantic search was not updated (${indexError}). The resource is still reachable by skill tag.`
  });
}

export async function DELETE(request: Request) {
  try {
    await requireAdmin();
  } catch (error) {
    return guard(error);
  }

  const id = new URL(request.url).searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "id is required." }, { status: 400 });
  }

  const [existing] = await findResourcesByIds([id]);
  if (!existing) {
    return NextResponse.json({ error: `Unknown resource: ${id}` }, { status: 404 });
  }

  const removed = await deleteResource(id);
  await deleteResourceNode(id);

  let deindexed = true;
  try {
    await removeResourceFromIndex(id);
  } catch {
    // Same reasoning as the write path: a stale vector can still be filtered
    // out downstream, because every hit is re-fetched from Mongo by id.
    deindexed = false;
  }

  return NextResponse.json({ removed, stores: { mongo: removed, neo4j: true, qdrant: deindexed } });
}
