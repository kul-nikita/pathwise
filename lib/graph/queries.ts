import { runQuery } from "@/lib/graph/neo4j";
import type { Domain, MasteryMap, Role, Skill, SkillGraph } from "@/lib/types";

/**
 * All sequencing structure is read from Neo4j at request time. The traversals
 * that matter — transitive prerequisites and transitive dependents — run as
 * variable-length Cypher patterns, not as recursion in application code.
 */

export async function listDomains(): Promise<Domain[]> {
  const rows = await runQuery<{ id: string; name: string; description: string }>(
    `MATCH (d:Domain)
     RETURN d.id AS id, d.name AS name, d.description AS description
     ORDER BY d.name`
  );

  return rows;
}

export async function listRoles(domainId?: string): Promise<Role[]> {
  const rows = await runQuery<{
    id: string;
    domainId: string;
    title: string;
    description: string;
    requiredSkills: Array<{ skillId: string; importance: number }>;
  }>(
    `MATCH (r:Role)-[:IN_DOMAIN]->(d:Domain)
     WHERE $domainId IS NULL OR d.id = $domainId
     OPTIONAL MATCH (r)-[req:REQUIRES]->(s:Skill)
     WITH r, d, collect({ skillId: s.id, importance: req.importance }) AS requiredSkills
     RETURN r.id AS id, d.id AS domainId, r.title AS title, r.description AS description,
            [x IN requiredSkills WHERE x.skillId IS NOT NULL] AS requiredSkills
     ORDER BY r.title`,
    { domainId: domainId ?? null }
  );

  return rows;
}

export async function getRole(roleId: string): Promise<Role | null> {
  const [role] = await listRolesByIds([roleId]);
  return role ?? null;
}

async function listRolesByIds(roleIds: string[]): Promise<Role[]> {
  return runQuery<Role>(
    `MATCH (r:Role)-[:IN_DOMAIN]->(d:Domain)
     WHERE r.id IN $roleIds
     OPTIONAL MATCH (r)-[req:REQUIRES]->(s:Skill)
     WITH r, d, collect({ skillId: s.id, importance: req.importance }) AS requiredSkills
     RETURN r.id AS id, d.id AS domainId, r.title AS title, r.description AS description,
            [x IN requiredSkills WHERE x.skillId IS NOT NULL] AS requiredSkills`,
    { roleIds }
  );
}

/** Skills for one domain, each with its direct prerequisites. */
export async function getSkillGraph(domainId?: string): Promise<SkillGraph> {
  const skills = await runQuery<Skill>(
    `MATCH (s:Skill)-[:IN_DOMAIN]->(d:Domain)
     WHERE $domainId IS NULL OR d.id = $domainId
     OPTIONAL MATCH (prereq:Skill)-[:PREREQUISITE_OF]->(s)
     WITH s, d, collect(prereq.id) AS prerequisites
     RETURN s.id AS id, d.id AS domainId, s.name AS name, s.category AS category,
            s.description AS description, prerequisites
     ORDER BY s.name`,
    { domainId: domainId ?? null }
  );

  return { skills };
}

/**
 * Prerequisite validation as a graph traversal: walks the full transitive
 * prerequisite chain and filters by the learner's mastery inside Cypher.
 * Returns the skill ids that are still unmet.
 */
export async function findUnmetPrerequisites(
  skillId: string,
  mastery: MasteryMap,
  threshold = 0.6
): Promise<string[]> {
  const rows = await runQuery<{ unmet: string[] }>(
    `MATCH (target:Skill {id: $skillId})
     OPTIONAL MATCH (prereq:Skill)-[:PREREQUISITE_OF*1..]->(target)
     WITH collect(DISTINCT prereq.id) AS prereqIds
     RETURN [p IN prereqIds WHERE p IS NOT NULL AND coalesce($mastery[p], 0.0) < $threshold] AS unmet`,
    { skillId, mastery, threshold }
  );

  return rows[0]?.unmet ?? [];
}

/** Transitive dependents — one traversal instead of a breadth-first search in TS. */
export async function findDownstreamSkills(skillId: string): Promise<string[]> {
  const rows = await runQuery<{ downstream: string[] }>(
    `MATCH (s:Skill {id: $skillId})
     OPTIONAL MATCH (s)-[:PREREQUISITE_OF*1..]->(dependent:Skill)
     RETURN [x IN collect(DISTINCT dependent.id) WHERE x IS NOT NULL] AS downstream`,
    { skillId }
  );

  return rows[0]?.downstream ?? [];
}

export type ResourceGateResult = {
  resourceId: string;
  unmetPrerequisites: string[];
  teaches: string[];
};

/**
 * The gate applied to candidates that arrived from anywhere other than a tag
 * match — notably Qdrant. Returns each resource with the prerequisites the
 * learner is still missing, so the UI can explain *why* something is blocked
 * instead of silently dropping it.
 */
export async function gateResources(
  resourceIds: string[],
  mastery: MasteryMap,
  threshold = 0.6
): Promise<ResourceGateResult[]> {
  if (resourceIds.length === 0) {
    return [];
  }

  return runQuery<ResourceGateResult>(
    // `toString(p)` is not cosmetic: Cypher infers a list comprehension's
    // element type from its WHERE predicate, so a list built this way is typed
    // as LIST<BOOLEAN> and is rejected as a map key even though it holds
    // strings at runtime. toString() restores the static type.
    // A resource is gated on its own REQUIRES_SKILL edges *and* on the full
    // prerequisite chain of whatever it TEACHES. Without the second half a row
    // that simply declares no prerequisites would bypass the skill graph
    // entirely — the catalog would be able to unlock a skill, which is exactly
    // what the graph is meant to prevent. Skills the resource itself teaches
    // are excluded, so a resource covering both a skill and its prerequisite
    // does not block itself.
    `MATCH (res:Resource) WHERE res.id IN $resourceIds
     OPTIONAL MATCH (res)-[:TEACHES]->(taught:Skill)
     WITH res, collect(DISTINCT taught.id) AS teaches
     OPTIONAL MATCH (res)-[:REQUIRES_SKILL]->(direct:Skill)
     WITH res, teaches, collect(DISTINCT direct.id) AS directIds
     OPTIONAL MATCH (res)-[:TEACHES]->(:Skill)<-[:PREREQUISITE_OF*1..]-(chain:Skill)
     WITH res, teaches, directIds, collect(DISTINCT chain.id) AS chainIds
     WITH res, teaches,
          [d IN directIds WHERE NOT d IN chainIds AND NOT d IN teaches] +
          [c IN chainIds WHERE NOT c IN teaches] AS prereqIds
     RETURN res.id AS resourceId, teaches,
            [p IN prereqIds WHERE coalesce($mastery[toString(p)], 0.0) < $threshold]
              AS unmetPrerequisites`,
    { resourceIds, mastery, threshold }
  );
}

/**
 * Resource ids that teach a skill AND whose own prerequisites the learner has
 * met — the graph gate every candidate must pass before scoring.
 */
export async function findPrerequisiteValidResourceIds(
  skillId: string,
  mastery: MasteryMap,
  threshold = 0.6
): Promise<string[]> {
  const rows = await runQuery<{ resourceIds: string[] }>(
    // Same rule as `gateResources`: the resource's own prerequisites plus the
    // transitive prerequisites of the skill being learned.
    `MATCH (res:Resource)-[:TEACHES]->(target:Skill {id: $skillId})
     OPTIONAL MATCH (res)-[:TEACHES]->(taught:Skill)
     WITH res, target, collect(DISTINCT taught.id) AS teaches
     OPTIONAL MATCH (res)-[:REQUIRES_SKILL]->(direct:Skill)
     WITH res, target, teaches, collect(DISTINCT direct.id) AS directIds
     OPTIONAL MATCH (chain:Skill)-[:PREREQUISITE_OF*1..]->(target)
     WITH res, teaches, directIds, collect(DISTINCT chain.id) AS chainIds
     WITH res, teaches,
          [d IN directIds WHERE NOT d IN chainIds AND NOT d IN teaches] +
          [c IN chainIds WHERE NOT c IN teaches] AS prereqIds
     WHERE all(p IN prereqIds WHERE coalesce($mastery[toString(p)], 0.0) >= $threshold)
     RETURN collect(res.id) AS resourceIds`,
    { skillId, mastery, threshold }
  );

  return rows[0]?.resourceIds ?? [];
}
