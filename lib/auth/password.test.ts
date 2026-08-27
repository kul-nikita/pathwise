import { describe, expect, it } from "vitest";
import { hashPassword, verifyPassword } from "@/lib/auth/password";

describe("password hashing", () => {
  it("accepts the correct password", async () => {
    const stored = await hashPassword("correct horse battery staple");
    expect(await verifyPassword("correct horse battery staple", stored)).toBe(true);
  });

  it("rejects a wrong password", async () => {
    const stored = await hashPassword("correct horse battery staple");
    expect(await verifyPassword("Correct horse battery staple", stored)).toBe(false);
    expect(await verifyPassword("", stored)).toBe(false);
  });

  it("never stores the password in the hash", async () => {
    const stored = await hashPassword("hunter2hunter2");
    expect(stored).not.toContain("hunter2");
  });

  it("salts, so identical passwords produce different hashes", async () => {
    const [a, b] = await Promise.all([hashPassword("same-password"), hashPassword("same-password")]);
    expect(a).not.toBe(b);
    expect(await verifyPassword("same-password", a)).toBe(true);
    expect(await verifyPassword("same-password", b)).toBe(true);
  });

  it("rejects malformed stored values instead of authenticating everyone", async () => {
    const bad = [
      "",
      "garbage",
      "scrypt$",
      "bcrypt$aa$bb",
      // Regression: non-hex decodes to empty buffers, and timingSafeEqual on
      // two empty buffers is true — this used to accept any password.
      "scrypt$zz$zz",
      "scrypt$$",
      `scrypt$${"a".repeat(32)}$`,
      `scrypt$${"a".repeat(32)}$${"b".repeat(10)}`
    ];

    for (const stored of bad) {
      expect(await verifyPassword("whatever", stored), stored).toBe(false);
    }
  });
});
