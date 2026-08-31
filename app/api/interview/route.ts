import { NextResponse } from "next/server";
import { z } from "zod";
import { requireUser } from "@/lib/auth/session";
import { generateInterviewQuestions, gradeInterviewAnswers, type InterviewQuestion } from "@/lib/llm/interview";
import { findResourcesByIds } from "@/lib/db/resources";
import { getSkillsByIds } from "@/lib/graph/queries";
import { addEvidence } from "@/lib/db/learners";
import { signEvidence } from "@/lib/crypto/signing";

export const dynamic = "force-dynamic";

const generateSchema = z.object({
  resourceId: z.string().min(1),
  skillId: z.string().min(1)
});

const gradeSchema = z.object({
  questions: z.array(z.object({
    id: z.string(),
    question: z.string(),
    context: z.string()
  })),
  answers: z.array(z.object({
    questionId: z.string(),
    answer: z.string().min(10)
  })),
  resourceId: z.string().min(1),
  skillId: z.string().min(1),
  summary: z.string().min(10).max(1000)
});

const EVIDENCE_THRESHOLD = 0.5;

/**
 * POST /api/interview - Generate questions or grade answers
 */
export async function POST(request: Request) {
  let user;
  try {
    user = await requireUser();
  } catch {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);

  // Determine if this is a generate or grade request
  const isGradeRequest = body && "answers" in body && "questions" in body;

  if (isGradeRequest) {
    // Grade the interview
    const parsed = gradeSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const { questions, answers, resourceId, skillId, summary } = parsed.data;

    const [resource] = await findResourcesByIds([resourceId]);
    if (!resource) {
      return NextResponse.json({ error: `Unknown resource: ${resourceId}` }, { status: 404 });
    }

    const [skill] = await getSkillsByIds([skillId]);
    if (!skill) {
      return NextResponse.json({ error: `Unknown skill: ${skillId}` }, { status: 404 });
    }

    // Grade with Gemini
    const grading = await gradeInterviewAnswers(
      questions as InterviewQuestion[],
      answers,
      skill
    );

    // Mint evidence if above threshold
    let evidenceId: string | null = null;
    if (grading.overall >= EVIDENCE_THRESHOLD && user.consentGiven) {
      const timestamp = new Date().toISOString();
      const validatedCapabilities = questions
        .filter((q, i) => grading.scores[i] >= EVIDENCE_THRESHOLD)
        .map((q, i) => {
          const scoreIndex = questions.indexOf(q);
          return `${skill.name} — ${Math.round(grading.scores[scoreIndex] * 100)}% on: ${q.question.slice(0, 60)}...`;
        });

      if (validatedCapabilities.length > 0) {
        const evidence = await addEvidence({
          learnerId: user.id,
          skillId,
          resourceId,
          summary,
          evidenceType: "verification-interview",
          artifactUrl: null,
          rubricScore: grading.overall,
          validatedCapabilities,
          createdAt: timestamp
        });
        evidenceId = evidence.id;
      }
    }

    return NextResponse.json({
      grading,
      evidenceId,
      passed: grading.overall >= EVIDENCE_THRESHOLD
    });
  }

  // Generate questions
  const parsed = generateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { resourceId, skillId } = parsed.data;

  const [resource] = await findResourcesByIds([resourceId]);
  if (!resource) {
    return NextResponse.json({ error: `Unknown resource: ${resourceId}` }, { status: 404 });
  }

  const [skill] = await getSkillsByIds([skillId]);
  if (!skill) {
    return NextResponse.json({ error: `Unknown skill: ${skillId}` }, { status: 404 });
  }

  const questions = await generateInterviewQuestions(resource, skill);

  return NextResponse.json({
    resource: { id: resource.id, title: resource.title },
    skill: { id: skill.id, name: skill.name },
    questions
  });
}
