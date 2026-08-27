import { describe, expect, it } from "vitest";
import { buildIntentSchema } from "@/lib/llm/intent-extraction";
import type { Role } from "@/lib/types";

const roles: Role[] = [
  {
    id: "data-analyst",
    domainId: "data",
    title: "Data Analyst",
    description: "Analyse and communicate data.",
    requiredSkills: []
  },
  {
    id: "soc-analyst",
    domainId: "cybersecurity",
    title: "Junior SOC Analyst",
    description: "Monitor and triage alerts.",
    requiredSkills: []
  }
];

const valid = {
  targetRoleId: "soc-analyst",
  timelineWeeks: 12,
  weeklyHours: 8,
  preferences: { maxHoursPerStep: 2, cost: "free", format: "lab" },
  // The learner-profile fields are required by the schema, so a fixture without
  // them fails for the wrong reason and hides what these tests actually pin:
  // that the role enum is built from seeded data.
  careerObjective: "Become a junior SOC analyst",
  experienceLevel: "beginner",
  currentSkills: ["linux-fundamentals"],
  interests: ["threat detection"],
  learningHistory: [],
  preferredTechnologies: ["Splunk"],
  learningStyle: "hands-on"
};

describe("learner intent validation (LLM trust boundary)", () => {
  it("accepts intent naming a real role", () => {
    expect(buildIntentSchema(roles).parse(valid).targetRoleId).toBe("soc-analyst");
  });

  it("rejects a role the model invented", () => {
    const result = buildIntentSchema(roles).safeParse({ ...valid, targetRoleId: "astronaut" });
    expect(result.success).toBe(false);
  });

  it("builds its role list from the data it is given, not a hardcoded enum", () => {
    // A role that exists in no cybersecurity catalog still validates when seeded.
    expect(buildIntentSchema(roles).safeParse({ ...valid, targetRoleId: "data-analyst" }).success).toBe(true);
    expect(buildIntentSchema([roles[1]]).safeParse({ ...valid, targetRoleId: "data-analyst" }).success).toBe(
      false
    );
  });

  it("clamps out-of-range numbers the model might return", () => {
    const schema = buildIntentSchema(roles);
    expect(schema.safeParse({ ...valid, timelineWeeks: 0 }).success).toBe(false);
    expect(schema.safeParse({ ...valid, timelineWeeks: 999 }).success).toBe(false);
    expect(schema.safeParse({ ...valid, weeklyHours: 0 }).success).toBe(false);
    expect(schema.safeParse({ ...valid, weeklyHours: 200 }).success).toBe(false);
  });

  it("rejects unknown enum values for cost and format", () => {
    const schema = buildIntentSchema(roles);
    expect(schema.safeParse({ ...valid, preferences: { ...valid.preferences, cost: "cheap" } }).success).toBe(
      false
    );
    expect(
      schema.safeParse({ ...valid, preferences: { ...valid.preferences, format: "hologram" } }).success
    ).toBe(false);
  });
});
