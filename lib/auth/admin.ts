import type { User } from "@/lib/db/users";
import { normalizeEmail } from "@/lib/db/users";

/**
 * Admin is an env-var allowlist rather than a role column: the catalog has
 * exactly one curator in this product, and a roles table would be a schema
 * migration to express a list of one. Unset means nobody is an admin, so the
 * catalog is read-only by default rather than open by default.
 */
export function adminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => normalizeEmail(email))
    .filter(Boolean);
}

export function isAdmin(user: Pick<User, "email"> | null | undefined): boolean {
  return Boolean(user && adminEmails().includes(normalizeEmail(user.email)));
}
