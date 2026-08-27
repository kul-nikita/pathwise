import type { Gap, MasteryMap, Role, Skill, SkillGraph } from "@/lib/types";

export type RoadmapPlan = {
  role: Role;
  readiness: number;
  gaps: Gap[];
  mastered: Gap[];
};

export type PlanRoadmapInput = {
  role: Role;
  graph: SkillGraph;
  mastery: MasteryMap;
  masteryThreshold?: number;
};

const DEFAULT_MASTERY_THRESHOLD = 0.8;
const PREREQUISITE_THRESHOLD = 0.6;

export function planRoadmap({
  role,
  graph,
  mastery,
  masteryThreshold = DEFAULT_MASTERY_THRESHOLD
}: PlanRoadmapInput): RoadmapPlan {
  const skillById = new Map(graph.skills.map((skill) => [skill.id, skill]));
  const requiredSkillIds = new Set(role.requiredSkills.map((item) => item.skillId));
  const requiredSkills = role.requiredSkills
    .map((required) => {
      const skill = skillById.get(required.skillId);
      if (!skill) {
        throw new Error(`Role ${role.id} references missing skill ${required.skillId}`);
      }
      return {
        skill,
        importance: required.importance,
        currentMastery: clampMastery(mastery[required.skillId] ?? 0)
      };
    })
    .filter((gap) => requiredSkillIds.has(gap.skill.id));

  const readiness =
    requiredSkills.reduce((sum, item) => sum + item.currentMastery * item.importance, 0) /
    requiredSkills.reduce((sum, item) => sum + item.importance, 0);

  const gapCandidates: Gap[] = requiredSkills
    .filter((item) => item.currentMastery < masteryThreshold)
    .map((item) => ({
      ...item,
      reason: buildGapReason(item.skill, mastery)
    }));

  const gaps = topologicalGapOrder(gapCandidates, skillById);
  const mastered = requiredSkills
    .filter((item) => item.currentMastery >= masteryThreshold)
    .map((item) => ({
      ...item,
      reason: `${item.skill.name} has enough evidence for this role right now.`
    }));

  return {
    role,
    readiness,
    gaps,
    mastered
  };
}

export function prerequisitesSatisfied(
  skillOrResource: { prerequisites: string[] },
  mastery: MasteryMap,
  threshold = PREREQUISITE_THRESHOLD
) {
  return skillOrResource.prerequisites.every((skillId) => clampMastery(mastery[skillId] ?? 0) >= threshold);
}

function topologicalGapOrder(gaps: Gap[], skillById: Map<string, Skill>) {
  const pending = new Map(gaps.map((gap) => [gap.skill.id, gap]));
  const ordered: Gap[] = [];

  while (pending.size > 0) {
    const ready = [...pending.values()]
      .filter((gap) =>
        gap.skill.prerequisites.every((prereqId) => !pending.has(prereqId) || !skillById.has(prereqId))
      )
      .sort((a, b) => b.importance - a.importance || a.skill.name.localeCompare(b.skill.name));

    if (ready.length === 0) {
      throw new Error("Skill graph contains a cycle in prerequisite relationships.");
    }

    for (const gap of ready) {
      ordered.push(gap);
      pending.delete(gap.skill.id);
    }
  }

  return ordered;
}

function buildGapReason(skill: Skill, mastery: MasteryMap) {
  const missingPrereqs = skill.prerequisites.filter((skillId) => clampMastery(mastery[skillId] ?? 0) < PREREQUISITE_THRESHOLD);

  if (missingPrereqs.length > 0) {
    return `Build prerequisite evidence first: ${missingPrereqs.join(", ")}.`;
  }

  return `${skill.name} is unlocked and below the target mastery threshold.`;
}

function clampMastery(value: number) {
  return Math.max(0, Math.min(1, value));
}
