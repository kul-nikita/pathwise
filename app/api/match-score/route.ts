import { NextResponse } from "next/server";
import { z } from "zod";
import { requireUser } from "@/lib/auth/session";
import { computeRoleMatchScore } from "@/lib/llm/jd-parsing";
import { getSkillGraph, getRole } from "@/lib/graph/queries";
import { getMastery } from "@/lib/db/learners";

export const dynamic = "force-dynamic";

const requestSchema = z.object({
  roleId: z.string().min(1)
});

export async function POST(request: Request) {
  let user;
  try {
    user = await requireUser();
  } catch {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  const parsed = requestSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { roleId } = parsed.data;

  const [role, graph, mastery] = await Promise.all([
    getRole(roleId),
    getSkillGraph(),
    getMastery(user.id)
  ]);

  if (!role) {
    return NextResponse.json({ error: `Unknown role: ${roleId}` }, { status: 404 });
  }

  const matchScore = computeRoleMatchScore(role, graph, mastery);

  return NextResponse.json(matchScore);
}
