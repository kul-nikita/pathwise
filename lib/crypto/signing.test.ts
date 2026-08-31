import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { serializeEvidence, signEvidence, verifyEvidenceSignature } from "./signing";

const RECORD = {
  id: "ev-1",
  skillId: "linux-fundamentals",
  resourceId: "linux-journey-command-line",
  summary: "Worked through the command-line track and took notes.",
  evidenceType: "post-check",
  artifactUrl: null as string | null,
  rubricScore: 0.8,
  validatedCapabilities: ["Navigate the filesystem", "Manage permissions"],
  createdAt: "2026-08-31T00:00:00.000Z"
};

describe("evidence signing", () => {
  const original = process.env.EVIDENCE_SIGNING_SECRET;
  beforeEach(() => {
    process.env.EVIDENCE_SIGNING_SECRET = "test-secret";
  });
  afterEach(() => {
    if (original === undefined) delete process.env.EVIDENCE_SIGNING_SECRET;
    else process.env.EVIDENCE_SIGNING_SECRET = original;
  });

  it("round-trips a valid signature", () => {
    const sig = signEvidence(RECORD);
    expect(verifyEvidenceSignature(RECORD, sig)).toBe(true);
  });

  it("rejects a signature for a mutated record", () => {
    const sig = signEvidence(RECORD);
    expect(verifyEvidenceSignature({ ...RECORD, rubricScore: 0.99 }, sig)).toBe(false);
    expect(verifyEvidenceSignature({ ...RECORD, summary: "something else" }, sig)).toBe(false);
  });

  it("rejects a malformed signature instead of throwing", () => {
    // Buffer.from("zz", "hex") yields an empty buffer — the same class of bug
    // that once made password verification accept anything.
    expect(verifyEvidenceSignature(RECORD, "zz")).toBe(false);
    expect(verifyEvidenceSignature(RECORD, "")).toBe(false);
    expect(verifyEvidenceSignature(RECORD, "not-hex-at-all")).toBe(false);
  });

  it("serializes fields in a fixed order regardless of input key order", () => {
    const reordered = {
      createdAt: RECORD.createdAt,
      validatedCapabilities: RECORD.validatedCapabilities,
      rubricScore: RECORD.rubricScore,
      artifactUrl: RECORD.artifactUrl,
      evidenceType: RECORD.evidenceType,
      summary: RECORD.summary,
      resourceId: RECORD.resourceId,
      skillId: RECORD.skillId,
      id: RECORD.id
    };
    expect(serializeEvidence(reordered)).toBe(serializeEvidence(RECORD));
    expect(signEvidence(reordered)).toBe(signEvidence(RECORD));
  });

  it("falls back to a dev key when the secret is unset (does not throw)", () => {
    delete process.env.EVIDENCE_SIGNING_SECRET;
    const sig = signEvidence(RECORD);
    expect(sig).toMatch(/^[0-9a-f]{64}$/);
    expect(verifyEvidenceSignature(RECORD, sig)).toBe(true);
  });
});
