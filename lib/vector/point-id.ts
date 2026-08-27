import { createHash } from "node:crypto";

/**
 * Qdrant point IDs must be numeric or a UUID, but our resources are slugs.
 * Deriving the UUID from the slug makes the mapping stable and reversible in
 * practice: re-indexing a resource overwrites its own point instead of adding
 * a duplicate, and deleting one removes the right vector. The seed script used
 * to use the array index, which silently reshuffled every id whenever the
 * catalog order changed.
 */
export function pointIdForResource(resourceId: string): string {
  const hex = createHash("md5").update(resourceId).digest("hex");
  return [
    hex.slice(0, 8),
    hex.slice(8, 12),
    hex.slice(12, 16),
    hex.slice(16, 20),
    hex.slice(20, 32)
  ].join("-");
}
