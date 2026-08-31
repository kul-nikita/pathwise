import type { LearnerProfile, MasteryMap, Role, SkillGraph } from "@/lib/types";
import type { LearningEvent } from "@/lib/adaptation/mastery";

export type TimelinePrediction = {
  expected: number;
  low: number;
  high: number;
  remainingHours: number;
  gapCount: number;
  dataPoints: Array<{
    week: number;
    readiness: number;
    lower: number;
    upper: number;
  }>;
};

/**
 * Compute average quiz/completion score from the event log.
 * This represents the learner's demonstrated competency level.
 */
export function computeAverageQuizScore(events: LearningEvent[]): number {
  const scoredEvents = events.filter(
    (e) =>
      (e.verb === "quiz_completed" || e.verb === "lab_completed" || e.verb === "project_reviewed") &&
      typeof e.score === "number"
  );

  if (scoredEvents.length === 0) {
    return 0.5; // Default assumption: 50% if no data
  }

  const sum = scoredEvents.reduce((acc, e) => acc + (e.score ?? 0), 0);
  return sum / scoredEvents.length;
}

/**
 * Estimate hours invested from the event log.
 */
export function computeHoursInvested(events: LearningEvent[]): number {
  return events.reduce((sum, e) => sum + (e.durationMinutes ?? 0), 0) / 60;
}

/**
 * Predict the timeline to job-readiness for a role.
 *
 * Uses a simple model:
 * 1. Sum the remaining learning hours for all gaps
 * 2. Divide by weekly hours to get weeks
 * 3. Apply an efficiency factor based on quiz scores
 * 4. Add confidence intervals based on variability
 */
export function predictTimeline({
  profile,
  mastery,
  role,
  graph,
  events
}: {
  profile: LearnerProfile | null;
  mastery: MasteryMap;
  role: Role;
  graph: SkillGraph;
  events: LearningEvent[];
}): TimelinePrediction {
  const hoursPerWeek = profile?.weeklyHours ?? 8;
  const masteryThreshold = 0.8;

  // Get required skills that are still gaps
  const skillById = new Map(graph.skills.map((s) => [s.id, s]));
  const gaps = role.requiredSkills.filter(
    (rs) => (mastery[rs.skillId] ?? 0) < masteryThreshold
  );

  // Estimate remaining hours for each gap
  // Use average resource duration per skill as a rough estimate
  const AVG_HOURS_PER_SKILL = 8; // Conservative estimate

  const remainingHours = gaps.reduce((sum, gap) => {
    const skill = skillById.get(gap.skillId);
    if (!skill) return sum + AVG_HOURS_PER_SKILL;

    // Weight by importance and inverse of current mastery
    const currentMastery = mastery[gap.skillId] ?? 0;
    const remainingMastery = 1 - currentMastery;
    return sum + AVG_HOURS_PER_SKILL * remainingMastery * gap.importance;
  }, 0);

  // Efficiency factor: higher quiz scores → faster learning
  const avgQuizScore = computeAverageQuizScore(events);
  const efficiencyFactor = 0.7 + avgQuizScore * 0.3; // Range: 0.7 - 1.0

  // Adjusted hours (efficiency affects how quickly they learn)
  const adjustedHours = remainingHours / efficiencyFactor;

  // Weeks to complete
  const weeksToComplete = Math.max(1, adjustedHours / hoursPerWeek);

  // Confidence interval: ±20% base, wider if fewer events
  const eventCount = events.length;
  const variabilityFactor = eventCount < 5 ? 0.35 : eventCount < 10 ? 0.25 : 0.2;
  const low = Math.ceil(weeksToComplete * (1 - variabilityFactor));
  const high = Math.ceil(weeksToComplete * (1 + variabilityFactor));
  const expected = Math.ceil(weeksToComplete);

  // Current readiness
  const currentReadiness =
    role.requiredSkills.reduce((sum, rs) => {
      return sum + (mastery[rs.skillId] ?? 0) * rs.importance;
    }, 0) /
    role.requiredSkills.reduce((sum, rs) => sum + rs.importance, 0);

  // Generate data points for the chart
  const bufferWeeks = 4; // Show some weeks beyond expected
  const totalWeeks = high + bufferWeeks;
  const dataPoints = [];

  for (let week = 0; week <= totalWeeks; week++) {
    // Linear interpolation from current readiness to 1.0
    const progress = week / weeksToComplete;
    const readiness = Math.min(1, currentReadiness + (1 - currentReadiness) * progress);

    // Confidence band widens slightly over time
    const bandWidth = variabilityFactor * (1 + week * 0.01);
    const lower = Math.max(0, readiness - bandWidth);
    const upper = Math.min(1, readiness + bandWidth);

    dataPoints.push({
      week,
      readiness: Math.round(readiness * 100) / 100,
      lower: Math.round(lower * 100) / 100,
      upper: Math.round(upper * 100) / 100
    });
  }

  return {
    expected,
    low,
    high,
    remainingHours: Math.round(remainingHours),
    gapCount: gaps.length,
    dataPoints
  };
}
