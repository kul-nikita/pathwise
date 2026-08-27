import { randomUUID } from "node:crypto";
import { getDb } from "@/lib/db/mongo";

export type User = {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: string;
  /** Product rule 5: nothing is analyzed until this is explicitly true. */
  consentGiven: boolean;
};

/** Emails are stored lowercased so lookups and uniqueness are case-insensitive. */
export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

async function users() {
  return (await getDb()).collection<User>("users");
}

export async function findUserByEmail(email: string): Promise<User | null> {
  return (await users()).findOne({ email: normalizeEmail(email) }, { projection: { _id: 0 } });
}

export async function findUserById(id: string): Promise<User | null> {
  return (await users()).findOne({ id }, { projection: { _id: 0 } });
}

export async function createUser(email: string, passwordHash: string): Promise<User> {
  const user: User = {
    id: randomUUID(),
    email: normalizeEmail(email),
    passwordHash,
    createdAt: new Date().toISOString(),
    consentGiven: false
  };

  try {
    await (await users()).insertOne(user);
  } catch (error) {
    // Unique index on email turns a race into a duplicate-key error.
    if (isDuplicateKey(error)) {
      throw new Error("An account with that email already exists.");
    }
    throw error;
  }

  return user;
}

export async function setConsent(userId: string, consentGiven: boolean) {
  await (await users()).updateOne({ id: userId }, { $set: { consentGiven } });
}

export async function deleteUser(userId: string) {
  await (await users()).deleteOne({ id: userId });
}

function isDuplicateKey(error: unknown) {
  return typeof error === "object" && error !== null && "code" in error && error.code === 11000;
}
