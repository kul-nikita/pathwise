import { z } from "zod";
import type { LearningResource, Skill } from "@/lib/types";

export const interviewQuestionSchema = z.object({
  id: z.string(),
  question: z.string(),
  context: z.string()
});

export type InterviewQuestion = z.infer<typeof interviewQuestionSchema>;

export const interviewAnswerSchema = z.object({
  questionId: z.string(),
  answer: z.string().min(10)
});

export type InterviewAnswer = z.infer<typeof interviewAnswerSchema>;

export const interviewGradingSchema = z.object({
  scores: z.array(z.number().min(0).max(1)),
  feedback: z.array(z.string()),
  overall: z.number().min(0).max(1)
});

export type InterviewGrading = z.infer<typeof interviewGradingSchema>;

const GEMINI_MODEL = "gemini-2.5-flash";

function questionResponseSchema() {
  return {
    type: "OBJECT",
    properties: {
      questions: {
        type: "ARRAY",
        items: {
          type: "OBJECT",
          properties: {
            id: { type: "STRING" },
            question: { type: "STRING" },
            context: { type: "STRING" }
          },
          required: ["id", "question", "context"]
        }
      }
    },
    required: ["questions"]
  };
}

function gradingResponseSchema() {
  return {
    type: "OBJECT",
    properties: {
      scores: {
        type: "ARRAY",
        items: { type: "NUMBER" }
      },
      feedback: {
        type: "ARRAY",
        items: { type: "STRING" }
      },
      overall: { type: "NUMBER" }
    },
    required: ["scores", "feedback", "overall"]
  };
}

/**
 * Generate scenario-based interview questions for a skill.
 * Questions are tailored to the specific resource the learner just completed.
 */
export async function generateInterviewQuestions(
  resource: LearningResource,
  skill: Skill
): Promise<InterviewQuestion[]> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is required for interview generation.");
  }

  const systemInstruction = `
You are a senior technical interviewer conducting a verification interview.
The candidate just completed a learning resource and you need to verify their understanding.

RESOURCE COMPLETED:
- Title: ${resource.title}
- Type: ${resource.resourceType}
- Skill: ${skill.name}
- Description: ${skill.description}

RULES:
1. Generate exactly 5 scenario-based questions.
2. Questions should test PRACTICAL understanding, not just recall.
3. Present realistic scenarios the learner might encounter on the job.
4. Questions should progress from foundational to advanced.
5. Each question should require a detailed explanation, not a yes/no answer.
6. Include the scenario context in each question.
7. Do NOT provide multiple choice — these are open-ended questions.
8. Questions should be specific to ${skill.name} in the context of ${resource.title}.

Return ONLY the structured JSON response matching the provided schema.
`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemInstruction }] },
        contents: [
          {
            role: "user",
            parts: [{ text: "Generate the 5 interview questions for this skill verification." }]
          }
        ],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: questionResponseSchema()
        }
      })
    }
  );

  if (!response.ok) {
    throw new Error(`Gemini request failed: ${response.status} ${await response.text()}`);
  }

  const payload = await response.json();
  const text = payload?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (typeof text !== "string") {
    throw new Error("Model did not return interview questions.");
  }

  let parsedJson: unknown;
  try {
    parsedJson = JSON.parse(text);
  } catch {
    throw new Error("Gemini returned invalid JSON.");
  }

  const result = z.object({ questions: z.array(interviewQuestionSchema) }).parse(parsedJson);
  return result.questions;
}

/**
 * Grade interview answers using Gemini.
 * Returns per-question scores, feedback, and an overall score.
 */
export async function gradeInterviewAnswers(
  questions: InterviewQuestion[],
  answers: InterviewAnswer[],
  skill: Skill
): Promise<InterviewGrading> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is required for interview grading.");
  }

  const qaPairs = questions.map((q) => {
    const answer = answers.find((a) => a.questionId === q.id);
    return `Q: ${q.question}\nA: ${answer?.answer ?? "(no answer)"}`;
  }).join("\n\n");

  const systemInstruction = `
You are grading a technical verification interview for the skill: ${skill.name}

GRADING CRITERIA (0-1 scale for each question):
- Accuracy: Is the answer technically correct?
- Depth: Does it show understanding beyond surface level?
- Practical Application: Can they apply this in a real scenario?
- Communication: Is the explanation clear and structured?

For each question, provide:
1. A score from 0 to 1
2. Brief feedback explaining the score

The overall score should be the weighted average, emphasizing accuracy and practical application.

Return ONLY the structured JSON response matching the provided schema.
`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemInstruction }] },
        contents: [
          {
            role: "user",
            parts: [{ text: `Interview answers to grade:\n\n${qaPairs}` }]
          }
        ],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: gradingResponseSchema()
        }
      })
    }
  );

  if (!response.ok) {
    throw new Error(`Gemini request failed: ${response.status} ${await response.text()}`);
  }

  const payload = await response.json();
  const text = payload?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (typeof text !== "string") {
    throw new Error("Model did not return grading results.");
  }

  let parsedJson: unknown;
  try {
    parsedJson = JSON.parse(text);
  } catch {
    throw new Error("Gemini returned invalid JSON.");
  }

  return interviewGradingSchema.parse(parsedJson);
}
