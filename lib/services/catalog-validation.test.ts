import { describe, expect, it } from "vitest";
import {
  isAllowedHost,
  normalizeHost,
  structuralIssues
} from "@/lib/services/catalog-validation";
import { allResources } from "@/seed/data";
import type { LearningResource } from "@/lib/types";

const base: LearningResource = {
  id: "test-row",
  title: "A Test Row",
  provider: "Example",
  url: "https://owasp.org/example",
  resourceType: "course",
  skillTags: ["linux-fundamentals"],
  difficulty: "beginner",
  durationMinutes: 60,
  costType: "free",
  language: "en",
  qualityScore: 0.8,
  isCurated: true,
  prerequisites: [],
  evidenceType: null,
  lastVerifiedAt: "2026-08-27",
  description: "A row used only by tests."
};

const known = ["linux-fundamentals", "networking-basics"];

describe("sourcing allowlist", () => {
  it("accepts every host already curated in the catalog", () => {
    for (const resource of allResources) {
      expect(isAllowedHost(resource.url), resource.url).toBe(true);
    }
  });

  it("rejects an arbitrary host", () => {
    expect(isAllowedHost("https://random-course-mill.example.com/x")).toBe(false);
  });

  it("treats www as the same host", () => {
    expect(normalizeHost("https://www.owasp.org/a")).toBe("owasp.org");
  });

  it("rejects a malformed url rather than throwing", () => {
    expect(isAllowedHost("not-a-url")).toBe(false);
  });
});

describe("structural rules", () => {
  it("accepts a well-formed row", () => {
    expect(structuralIssues(base, known)).toEqual([]);
  });

  // This exact defect shipped twice: the NIST row and kubernetes-basics-tutorial.
  it("rejects a row that requires what it teaches", () => {
    const issues = structuralIssues(
      { ...base, prerequisites: ["linux-fundamentals"] },
      known
    );
    expect(issues.some((issue) => issue.message.includes("both taught and required"))).toBe(true);
  });

  it("rejects a tag naming a skill that does not exist in the graph", () => {
    const issues = structuralIssues({ ...base, skillTags: ["not-a-skill"] }, known);
    expect(issues.some((issue) => issue.field === "skillTags")).toBe(true);
  });

  it("rejects a row that teaches nothing", () => {
    expect(structuralIssues({ ...base, skillTags: [] }, known).length).toBeGreaterThan(0);
  });

  it("rejects nonsense duration and quality", () => {
    expect(structuralIssues({ ...base, durationMinutes: 0 }, known).length).toBe(1);
    expect(structuralIssues({ ...base, qualityScore: 1.5 }, known).length).toBe(1);
  });
});
