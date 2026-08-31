import { createHmac, timingSafeEqual } from "node:crypto";

const ALGORITHM = "sha256";

// Falls back like GEMINI_API_KEY does, rather than throwing like MONGODB_URI:
// a missing secret must not break the learn -> prove loop for a local or demo
// deployment. Signatures stay internally consistent (mint and verify use the
// same value), they are just not secret. Set EVIDENCE_SIGNING_SECRET in any
// deployment where a shared evidence link needs to be unforgeable.
const DEV_FALLBACK_SECRET = "skillforge-dev-evidence-signing-secret";
let warnedAboutFallback = false;

function getSecret(): string {
  const secret = process.env.EVIDENCE_SIGNING_SECRET;
  if (secret) {
    return secret;
  }
  if (!warnedAboutFallback) {
    console.warn(
      "[signing] EVIDENCE_SIGNING_SECRET is not set — using a well-known dev key. " +
        "Evidence signatures will not be unforgeable. Set it before relying on /verify."
    );
    warnedAboutFallback = true;
  }
  return DEV_FALLBACK_SECRET;
}

/**
 * Serialize evidence fields into a canonical string for signing.
 * Fields are in alphabetical order to ensure consistent hashing.
 */
export function serializeEvidence(data: {
  id: string;
  skillId: string;
  resourceId: string;
  summary: string;
  evidenceType: string;
  artifactUrl: string | null;
  rubricScore: number;
  validatedCapabilities: string[];
  createdAt: string;
}): string {
  return JSON.stringify({
    id: data.id,
    skillId: data.skillId,
    resourceId: data.resourceId,
    summary: data.summary,
    evidenceType: data.evidenceType,
    artifactUrl: data.artifactUrl,
    rubricScore: data.rubricScore,
    validatedCapabilities: data.validatedCapabilities,
    createdAt: data.createdAt
  });
}

/**
 * Sign evidence data using HMAC-SHA256.
 * Returns a hex-encoded signature.
 */
export function signEvidence(data: {
  id: string;
  skillId: string;
  resourceId: string;
  summary: string;
  evidenceType: string;
  artifactUrl: string | null;
  rubricScore: number;
  validatedCapabilities: string[];
  createdAt: string;
}): string {
  const secret = getSecret();
  const payload = serializeEvidence(data);
  return createHmac(ALGORITHM, secret).update(payload).digest("hex");
}

/**
 * Verify an evidence signature.
 * Uses constant-time comparison to prevent timing attacks.
 */
export function verifyEvidenceSignature(
  data: {
    id: string;
    skillId: string;
    resourceId: string;
    summary: string;
    evidenceType: string;
    artifactUrl: string | null;
    rubricScore: number;
    validatedCapabilities: string[];
    createdAt: string;
  },
  signature: string
): boolean {
  try {
    const expected = signEvidence(data);
    const sigBuffer = Buffer.from(signature, "hex");
    const expectedBuffer = Buffer.from(expected, "hex");

    if (sigBuffer.length !== expectedBuffer.length) {
      return false;
    }

    return timingSafeEqual(sigBuffer, expectedBuffer);
  } catch {
    return false;
  }
}
