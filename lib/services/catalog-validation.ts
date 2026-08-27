import { allResources } from "@/seed/data";
import type { LearningResource } from "@/lib/types";

/**
 * Rule 7: resource sourcing stays inside a domain allowlist.
 *
 * The list is derived from the hosts already represented in the curated
 * catalog, plus the sources named in docs/ARCHITECTURE.md#resource-sourcing.
 * Hardcoding a short list would be wrong — 225 curated rows already span 112
 * hosts — and skipping the check entirely would turn the admin form into
 * general open-web ingestion, which the scope rules forbid.
 */
const ARCHITECTURE_SOURCES = [
  "portswigger.net",
  "learn.microsoft.com",
  "tryhackme.com",
  "academy.hackthebox.com",
  "owasp.org",
  "freecodecamp.org",
  "docs.aws.amazon.com",
  "skillbuilder.aws",
  "netacad.com",
  "github.com",
  "youtube.com"
];

export function normalizeHost(url: string): string {
  return new URL(url).host.replace(/^www\./, "").toLowerCase();
}

let cached: Set<string> | null = null;

export function allowedHosts(): Set<string> {
  cached ??= new Set([
    ...allResources.map((resource) => normalizeHost(resource.url)),
    ...ARCHITECTURE_SOURCES
  ]);
  return cached;
}

export function isAllowedHost(url: string): boolean {
  try {
    return allowedHosts().has(normalizeHost(url));
  } catch {
    return false;
  }
}

export type ValidationIssue = { field: string; message: string };

/**
 * The structural rules, as pure functions over the row plus the ids that
 * actually exist in the graph.
 *
 * Every rule here corresponds to a defect that was found by hand during the
 * build — a skill listed as both taught and required (twice), a duplicated
 * URL (three times), and a tag naming a skill that does not exist. The admin
 * form is the place they can be reintroduced, so it is the place they get
 * checked.
 */
export function structuralIssues(
  resource: LearningResource,
  knownSkillIds: string[]
): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const known = new Set(knownSkillIds);

  if (resource.skillTags.length === 0) {
    issues.push({ field: "skillTags", message: "A resource must teach at least one skill." });
  }

  for (const skillId of resource.skillTags) {
    if (!known.has(skillId)) {
      issues.push({ field: "skillTags", message: `No such skill in the graph: ${skillId}` });
    }
  }

  for (const skillId of resource.prerequisites) {
    if (!known.has(skillId)) {
      issues.push({ field: "prerequisites", message: `No such skill in the graph: ${skillId}` });
    }
  }

  // A row that requires what it teaches can never be recommended for that gap:
  // the gate filters it out precisely when the learner needs it.
  for (const skillId of resource.prerequisites) {
    if (resource.skillTags.includes(skillId)) {
      issues.push({
        field: "prerequisites",
        message: `"${skillId}" is listed as both taught and required, so this resource could never be recommended for it.`
      });
    }
  }

  if (resource.durationMinutes <= 0) {
    issues.push({ field: "durationMinutes", message: "Duration must be greater than zero." });
  }

  if (resource.qualityScore < 0 || resource.qualityScore > 1) {
    issues.push({ field: "qualityScore", message: "Quality score is a 0–1 value." });
  }

  return issues;
}

export type UrlCheck = { ok: boolean; status: number | null; detail: string };

/**
 * Rule 8 says every seeded row needs a real, working URL. That has been a
 * hand-verification rule enforced by curl and discipline — one confabulated URL
 * and eleven dead ones were caught that way. Here it becomes machine-enforced:
 * the server fetches the URL itself and refuses to store a row it could not
 * reach, so `lastVerifiedAt` records a check that actually happened.
 */
export async function checkUrl(url: string, timeoutMs = 10_000): Promise<UrlCheck> {
  const attempt = async (method: "HEAD" | "GET") => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      return await fetch(url, {
        method,
        redirect: "follow",
        signal: controller.signal,
        // Some providers 403 anything that does not look like a browser.
        headers: { "User-Agent": "Mozilla/5.0 (compatible; SkillForgeCatalogBot/1.0)" }
      });
    } finally {
      clearTimeout(timer);
    }
  };

  try {
    // HEAD first because it is cheap; a fair number of docs hosts reject it,
    // so fall through to GET rather than recording a false failure.
    let response = await attempt("HEAD");
    if (response.status === 405 || response.status === 403 || response.status === 501) {
      response = await attempt("GET");
    }

    return {
      ok: response.ok,
      status: response.status,
      detail: response.ok ? `Reachable (HTTP ${response.status})` : `Returned HTTP ${response.status}`
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      ok: false,
      status: null,
      detail: message.includes("abort") ? `No response within ${timeoutMs / 1000}s` : message
    };
  }
}
