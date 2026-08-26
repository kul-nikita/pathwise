import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(scryptCallback) as (
  password: string,
  salt: Buffer,
  keylen: number
) => Promise<Buffer>;

const KEY_LENGTH = 64;
const SALT_LENGTH = 16;

/** Stored as `scrypt$<saltHex>$<hashHex>` so the format can evolve later. */
export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(SALT_LENGTH);
  const derived = await scrypt(password, salt, KEY_LENGTH);
  return `scrypt$${salt.toString("hex")}$${derived.toString("hex")}`;
}

/** Buffer.from(x, "hex") silently drops invalid characters, so validate first. */
function isHex(value: string, expectedBytes: number) {
  return new RegExp(`^[0-9a-fA-F]{${expectedBytes * 2}}$`).test(value);
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [scheme, saltHex, hashHex] = stored.split("$");

  // Without the length checks a malformed record ("scrypt$zz$zz") decodes to
  // two empty buffers and timingSafeEqual returns true for ANY password.
  if (scheme !== "scrypt" || !isHex(saltHex ?? "", SALT_LENGTH) || !isHex(hashHex ?? "", KEY_LENGTH)) {
    return false;
  }

  const expected = Buffer.from(hashHex, "hex");
  const derived = await scrypt(password, Buffer.from(saltHex, "hex"), KEY_LENGTH);

  // Constant-time compare so a wrong password can't be found byte by byte.
  return derived.length === expected.length && timingSafeEqual(derived, expected);
}
