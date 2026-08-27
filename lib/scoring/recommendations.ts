import { prerequisitesSatisfied } from "@/lib/planner/roadmap";
import type {
  Gap,
  LearnerPreferences,
  LearningResource,
  MasteryMap,
  ScoreBreakdown
} from "@/lib/types";

export type ScoredRecommendation = {
  resource: LearningResource;
  score: ScoreBreakdown;
  explanation: {
    whatGapItCloses: string;
    whatItUnlocksNext: string;
    estimatedTime: string;
    evidenceArtifact: string;
  };
};

type ScoreInput = {
  gap: Gap;
  resources: LearningResource[];
  mastery: MasteryMap;
  preferences: LearnerPreferences;
  /** Hard time budget for the week. Session-length preference is scored, not filtered. */
  weeklyHours?: number;
};

const DEFAULT_WEEKLY_HOURS = 10;

export function scoreResourcesForGap({
  gap,
  resources,
  mastery,
  preferences,
  weeklyHours = DEFAULT_WEEKLY_HOURS
}: ScoreInput): ScoredRecommendation[] {
  return resources
    .filter((resource) => resource.skillTags.includes(gap.skill.id))
    .filter((resource) => prerequisitesSatisfied(resource, mastery))
    .filter((resource) => resource.durationMinutes <= weeklyHours * 60)
    .filter((resource) => Boolean(resource.evidenceType))
    .map((resource) => {
      const score = buildScore(gap, resource, mastery, preferences);

      return {
        resource,
        score,
        explanation: {
          whatGapItCloses: `${resource.title} targets ${gap.skill.name}, where current mastery is ${Math.round(
            gap.currentMastery * 100
          )}%.`,
          whatItUnlocksNext: `${gap.skill.name} contributes to ${gap.reason}`,
          estimatedTime: formatDuration(resource.durationMinutes),
          evidenceArtifact: resource.evidenceType ?? "evidence artifact"
        }
      };
    })
    .sort((a, b) => b.score.total - a.score.total);
}

function buildScore(
  gap: Gap,
  resource: LearningResource,
  mastery: MasteryMap,
  preferences: LearnerPreferences
): ScoreBreakdown {
  const gapMatch = resource.skillTags.includes(gap.skill.id) ? gap.importance : 0;
  const prereqReadiness =
    resource.prerequisites.length === 0
      ? 1
      : average(resource.prerequisites.map((skillId) => clamp(mastery[skillId] ?? 0)));
  const quality = clamp(resource.qualityScore);
  const preferenceFit = preferences.format === "any" || preferences.format === resource.resourceType ? 1 : 0.55;
  const timeFit = 1 - Math.min(resource.durationMinutes / (preferences.maxHoursPerStep * 60), 1) * 0.35;
  const costFit = preferences.cost === "any" || preferences.cost === resource.costType ? 1 : 0.25;

  const total =
    0.3 * gapMatch +
    0.2 * prereqReadiness +
    0.15 * quality +
    0.15 * preferenceFit +
    0.1 * timeFit +
    0.1 * costFit;

  return {
    gapMatch,
    prereqReadiness,
    quality,
    preferenceFit,
    timeFit,
    costFit,
    total: clamp(total)
  };
}

export function formatDuration(durationMinutes: number) {
  if (durationMinutes < 60) {
    return `${durationMinutes} min`;
  }

  const hours = Math.round(durationMinutes / 30) / 2;
  return `${hours} ${hours === 1 ? "hour" : "hours"}`;
}

function average(values: number[]) {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function clamp(value: number) {
  return Math.max(0, Math.min(1, value));
}
