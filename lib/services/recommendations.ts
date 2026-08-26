import { findPrerequisiteValidResourceIds, getRole, getSkillGraph } from "@/lib/graph/queries";
import { findResourcesByIds } from "@/lib/db/resources";
import { planRoadmap, type RoadmapPlan } from "@/lib/planner/roadmap";
import { scoreResourcesForGap, type ScoredRecommendation } from "@/lib/scoring/recommendations";
import type { Gap, LearnerPreferences, MasteryMap } from "@/lib/types";

/**
 * The real pipeline, in order:
 *   Neo4j  — prerequisite gate (transitive, in Cypher)
 *   Mongo  — resource metadata for the surviving ids
 *   lib/scoring — deterministic ranking
 * Nothing may skip the graph gate.
 */
export async function candidatesForGap(
  gap: Gap,
  mastery: MasteryMap,
  preferences: LearnerPreferences,
  weeklyHours: number
): Promise<ScoredRecommendation[]> {
  const validIds = await findPrerequisiteValidResourceIds(gap.skill.id, mastery);
  const resources = await findResourcesByIds(validIds);

  return scoreResourcesForGap({ gap, resources, mastery, preferences, weeklyHours });
}

export async function candidatesBySkill(
  gaps: Gap[],
  mastery: MasteryMap,
  preferences: LearnerPreferences,
  weeklyHours: number
): Promise<Record<string, ScoredRecommendation[]>> {
  const entries = await Promise.all(
    gaps.map(async (gap) => [gap.skill.id, await candidatesForGap(gap, mastery, preferences, weeklyHours)] as const)
  );

  return Object.fromEntries(entries);
}

export async function buildRoadmap(roleId: string, mastery: MasteryMap): Promise<RoadmapPlan> {
  const role = await getRole(roleId);

  if (!role) {
    throw new Error(`Unknown role: ${roleId}`);
  }

  const graph = await getSkillGraph(role.domainId);
  return planRoadmap({ role, graph, mastery });
}
