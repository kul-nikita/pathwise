import { describe, expect, it } from "vitest";
import { demoLearnerMastery, roles, skillGraph } from "@/lib/data/demo-catalog";
import { planRoadmap, prerequisitesSatisfied } from "@/lib/planner/roadmap";

describe("planner", () => {
  it("orders missing skills before their dependents", () => {
    const plan = planRoadmap({
      role: roles[0],
      graph: skillGraph,
      mastery: demoLearnerMastery
    });

    const gapIds = plan.gaps.map((gap) => gap.skill.id);

    expect(gapIds.indexOf("log-analysis")).toBeLessThan(gapIds.indexOf("siem-querying"));
    expect(gapIds.indexOf("siem-querying")).toBeLessThan(gapIds.indexOf("alert-triage"));
  });

  it("uses mastery scores instead of binary completion", () => {
    expect(prerequisitesSatisfied({ prerequisites: ["linux-fundamentals"] }, demoLearnerMastery)).toBe(false);
    expect(prerequisitesSatisfied({ prerequisites: ["networking-basics"] }, demoLearnerMastery)).toBe(true);
  });
});
