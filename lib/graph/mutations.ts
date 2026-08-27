import { runQuery } from "@/lib/graph/neo4j";
import type { LearningResource } from "@/lib/types";

/**
 * Writes a resource's *structure* — what it teaches and what it demands. This
 * is the only part of a resource Neo4j owns; title, URL and the rest live in
 * Mongo. Edges are replaced rather than merged, so removing a skill tag in the
 * admin UI actually removes the edge instead of leaving a stale one behind
 * that would keep gating recommendations.
 */
export async function upsertResourceNode(resource: LearningResource): Promise<void> {
  await runQuery(
    `MERGE (res:Resource {id: $id})
     WITH res
     OPTIONAL MATCH (res)-[old:TEACHES|REQUIRES_SKILL]->()
     DELETE old
     WITH res
     UNWIND (CASE WHEN size($skillTags) = 0 THEN [null] ELSE $skillTags END) AS skillId
     OPTIONAL MATCH (s:Skill {id: skillId})
     FOREACH (_ IN CASE WHEN s IS NULL THEN [] ELSE [1] END | MERGE (res)-[:TEACHES]->(s))
     WITH DISTINCT res
     UNWIND (CASE WHEN size($prerequisites) = 0 THEN [null] ELSE $prerequisites END) AS prereqId
     OPTIONAL MATCH (p:Skill {id: prereqId})
     FOREACH (_ IN CASE WHEN p IS NULL THEN [] ELSE [1] END | MERGE (res)-[:REQUIRES_SKILL]->(p))
     RETURN count(*) AS written`,
    { id: resource.id, skillTags: resource.skillTags, prerequisites: resource.prerequisites }
  );
}

export async function deleteResourceNode(resourceId: string): Promise<void> {
  await runQuery("MATCH (res:Resource {id: $resourceId}) DETACH DELETE res", { resourceId });
}

/** Which of these skill ids actually exist — used to reject bad tags up front. */
export async function existingSkillIds(skillIds: string[]): Promise<string[]> {
  if (skillIds.length === 0) {
    return [];
  }

  const rows = await runQuery<{ id: string }>(
    "MATCH (s:Skill) WHERE s.id IN $skillIds RETURN s.id AS id",
    { skillIds }
  );

  return rows.map((row) => row.id);
}
