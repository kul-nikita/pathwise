import { describe, expect, it } from "vitest";
import { allowedNumbers, findGroundingViolations, type GroundedFacts } from "@/lib/llm/grounded-explanations";

const facts: GroundedFacts = {
  resource: {
    title: "Audit Logon Events",
    provider: "Microsoft Learn",
    durationMinutes: 45,
    costType: "free",
    evidenceType: "log-triage-writeup",
    difficulty: "beginner"
  },
  skillName: "Log Analysis",
  currentMasteryPercent: 20,
  score: {
    gapMatch: 1,
    prereqReadiness: 1,
    quality: 0.84,
    preferenceFit: 0.55,
    timeFit: 0.87,
    costFit: 1,
    total: 0.9
  }
};

describe("grounding guard", () => {
  it("accepts prose that only uses supplied facts", () => {
    const text =
      "Audit Logon Events from Microsoft Learn targets Log Analysis, where your current mastery is 20%. " +
      "It takes 45 minutes and is free, producing a log-triage-writeup.";
    expect(findGroundingViolations(text, facts)).toEqual([]);
  });

  it("catches an invented URL", () => {
    const text = "Read more at https://totally-made-up.example.com for details.";
    expect(findGroundingViolations(text, facts).some((v) => v.kind === "url")).toBe(true);
  });

  it("catches a bare domain, not just a full URL", () => {
    expect(findGroundingViolations("Go to microsoft.com now.", facts).some((v) => v.kind === "url")).toBe(true);
  });

  it("catches an invented duration", () => {
    const text = "This 90 minute module covers Log Analysis.";
    const violations = findGroundingViolations(text, facts);
    expect(violations.some((v) => v.kind === "number" && v.detail === "90")).toBe(true);
  });

  it("catches an invented price", () => {
    const text = "Costs $49 to enrol.";
    const violations = findGroundingViolations(text, facts);
    expect(violations.some((v) => v.kind === "claim")).toBe(true);
  });

  it("catches an invented certificate claim", () => {
    const text = "Finish it to earn an industry certificate.";
    expect(findGroundingViolations(text, facts).some((v) => v.kind === "claim")).toBe(true);
  });

  it("allows a certificate mention when the artifact really is one", () => {
    const certFacts: GroundedFacts = {
      ...facts,
      resource: { ...facts.resource, evidenceType: "certificate-of-completion" }
    };
    expect(findGroundingViolations("You receive a certificate.", certFacts).some((v) => v.kind === "claim")).toBe(
      false
    );
  });

  it("catches a job guarantee", () => {
    expect(
      findGroundingViolations("This guarantees you a job.", facts).some((v) => v.kind === "claim")
    ).toBe(true);
  });

  it("permits only duration and mastery numbers, not score percents", () => {
    const permitted = allowedNumbers(facts);
    expect(permitted.has("45")).toBe(true);
    expect(permitted.has("20")).toBe(true);
    // Score components are intentionally NOT permitted: allowing them widens
    // the set enough for an invented duration to collide with a percentage.
    expect(permitted.has("84")).toBe(false);
    expect(permitted.has("90")).toBe(false);
  });
});
