import { gradeAnswers, type SubmittedAnswer } from "@/lib/diagnostic/engine";
import { questionBank } from "@/lib/diagnostic/questions";
import type { DiagnosticQuestion } from "@/lib/diagnostic/types";
import type { LearningEvent } from "@/lib/adaptation/mastery";
import type { Evidence, LearningResource, ResourceType, Skill } from "@/lib/types";
import { signEvidence } from "@/lib/crypto/signing";

/** Two questions per taught skill — the same ladder depth the diagnostic uses. */
export const CHECK_QUESTIONS_PER_SKILL = 2;

/**
 * What kind of work the resource represents. The verb matters because
 * `EVENT_WEIGHTS` in lib/adaptation/mastery weighs a reviewed project more
 * heavily than a quiz, so a lab has to be recorded as a lab.
 */
const VERB_BY_TYPE: Record<ResourceType, LearningEvent["verb"]> = {
  lab: "lab_completed",
  project: "project_reviewed",
  course: "quiz_completed",
  doc: "quiz_completed",
  video: "quiz_completed"
};

/** Hardest first, so a pass means something. */
const TIER_ORDER = ["advanced", "intermediate", "beginner"] as const;

/**
 * Post-check questions for a completion.
 *
 * Product rule 4: mastery is a score, not a checkbox — so finishing a resource
 * cannot be self-reported. The learner answers questions drawn from the same
 * server-side bank the diagnostic uses, and only the graded result moves
 * mastery. Questions already answered during the diagnostic are excluded, so
 * this is a fresh check rather than a replay of the answer the learner has
 * already seen.
 */
export function checkQuestionsForResource(
  resource: LearningResource,
  excludeQuestionIds: string[] = []
): DiagnosticQuestion[] {
  const excluded = new Set(excludeQuestionIds);

  return resource.skillTags.flatMap((skillId) => {
    const pool = questionBank.filter(
      (question) => question.skillId === skillId && !excluded.has(question.id)
    );

    return TIER_ORDER.flatMap((tier) => pool.filter((question) => question.difficulty === tier)).slice(
      0,
      CHECK_QUESTIONS_PER_SKILL
    );
  });
}

export type SkillResult = {
  skillId: string;
  correct: number;
  total: number;
  score: number;
  /** Recorded on the event so a later post-check does not reuse them. */
  questionIds: string[];
};

/**
 * Grades server-side against the bank. The client posts only the selected
 * index, exactly as the diagnostic does, so the answer key never reaches the
 * browser and a learner cannot award themselves mastery.
 */
export function gradeCompletion(
  resource: LearningResource,
  submitted: SubmittedAnswer[]
): { bySkill: SkillResult[]; overall: number } {
  const graded = new Map(
    gradeAnswers(submitted).map((answer) => [answer.questionId, answer.correct])
  );
  const skillOf = new Map(questionBank.map((question) => [question.id, question.skillId]));

  const bySkill = resource.skillTags.map((skillId) => {
    const answers = submitted.filter((answer) => skillOf.get(answer.questionId) === skillId);
    const correct = answers.filter((answer) => graded.get(answer.questionId)).length;

    return {
      skillId,
      correct,
      total: answers.length,
      score: answers.length === 0 ? 0 : correct / answers.length,
      questionIds: answers.map((answer) => answer.questionId)
    };
  });

  const answered = bySkill.filter((result) => result.total > 0);
  const overall =
    answered.length === 0
      ? 0
      : answered.reduce((sum, result) => sum + result.score, 0) / answered.length;

  return { bySkill, overall };
}

/**
 * One event per taught skill. Events are append-only and mastery is derived
 * from them on read, so a completion is replayable and a replan can always
 * explain itself from the log.
 */
export function completionEvents(
  learnerId: string,
  resource: LearningResource,
  bySkill: SkillResult[],
  timestamp: string
): LearningEvent[] {
  return bySkill
    .filter((result) => result.total > 0)
    .map((result) => ({
      learnerId,
      verb: VERB_BY_TYPE[resource.resourceType],
      objectType: "resource" as const,
      objectId: resource.id,
      skillId: result.skillId,
      score: result.score,
      durationMinutes: resource.durationMinutes,
      timestamp,
      metadata: { correct: result.correct, total: result.total, questionIds: result.questionIds }
    }));
}

/** A completion only clears the bar if the learner actually demonstrated it. */
export const EVIDENCE_THRESHOLD = 0.5;

/**
 * Evidence is generated only from things that actually happened: the rubric
 * score is the graded post-check, the capabilities are the skills the learner
 * passed (named from the graph, not invented), and `artifactUrl` stays null
 * unless the learner supplied one. Nothing here is written by the LLM.
 */
export function completionEvidence({
  learnerId,
  resource,
  bySkill,
  overall,
  summary,
  artifactUrl,
  skills,
  timestamp
}: {
  learnerId: string;
  resource: LearningResource;
  bySkill: SkillResult[];
  overall: number;
  summary: string;
  artifactUrl: string | null;
  skills: Skill[];
  timestamp: string;
}): Omit<Evidence, "id" | "signature"> | null {
  if (!resource.evidenceType || overall < EVIDENCE_THRESHOLD) {
    return null;
  }

  const name = new Map(skills.map((skill) => [skill.id, skill.name]));
  const passed = bySkill.filter((result) => result.total > 0 && result.score >= EVIDENCE_THRESHOLD);

  return {
    learnerId,
    skillId: bySkill[0]?.skillId ?? resource.skillTags[0],
    resourceId: resource.id,
    summary,
    evidenceType: resource.evidenceType,
    artifactUrl,
    rubricScore: overall,
    validatedCapabilities: passed.map(
      (result) =>
        `${name.get(result.skillId) ?? result.skillId} — ${result.correct}/${result.total} on the post-check`
    ),
    createdAt: timestamp
  };
}
