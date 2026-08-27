import { z } from "zod";
import type { Role } from "@/lib/types";

export const preferencesShape = z.object({
  maxHoursPerStep: z.number().min(0.5).max(20),
  cost: z.enum(["free", "paid", "freemium", "any"]),
  format: z.enum(["course", "lab", "doc", "project", "video", "any"])
});

const learnerProfileShape = z.object({
  careerObjective: z.string().min(1),

  experienceLevel: z.enum([
    "beginner",
    "intermediate",
    "advanced"
  ]),

  currentSkills: z.array(z.string()),

  interests: z.array(z.string()),

  learningHistory: z.array(z.string()),

  preferredTechnologies: z.array(z.string()),

  learningStyle: z.enum([
    "hands-on",
    "visual",
    "reading",
    "mixed",
    "unknown"
  ])
});

/**
 * The role list is supplied by the caller from Neo4j.
 * The model can only select a role that actually exists in the graph.
 */
export function buildIntentSchema(roles: Role[]) {
  const ids = roles.map((role) => role.id);

  return z.object({
    targetRoleId: z.string().refine((id) => ids.includes(id), {
      message: "targetRoleId must be one of the seeded roles"
    }),

    ...learnerProfileShape.shape,

    timelineWeeks: z.number().int().min(1).max(52),

    weeklyHours: z.number().min(1).max(60),

    preferences: preferencesShape
  });
}

export type LearnerIntent = z.infer<
  ReturnType<typeof buildIntentSchema>
>;

const GEMINI_MODEL = "gemini-2.5-flash";

/**
 * Gemini structured-output schema.
 *
 * This keeps the AI response predictable and prevents
 * the model from returning an invalid role id or invalid
 * preference values.
 */
function responseSchema(roleIds: string[]) {
  return {
    type: "OBJECT",

    properties: {
      targetRoleId: {
        type: "STRING",
        enum: roleIds
      },

      careerObjective: {
        type: "STRING"
      },

      experienceLevel: {
        type: "STRING",
        enum: [
          "beginner",
          "intermediate",
          "advanced"
        ]
      },

      currentSkills: {
        type: "ARRAY",
        items: {
          type: "STRING"
        }
      },

      interests: {
        type: "ARRAY",
        items: {
          type: "STRING"
        }
      },

      learningHistory: {
        type: "ARRAY",
        items: {
          type: "STRING"
        }
      },

      preferredTechnologies: {
        type: "ARRAY",
        items: {
          type: "STRING"
        }
      },

      learningStyle: {
        type: "STRING",
        enum: [
          "hands-on",
          "visual",
          "reading",
          "mixed",
          "unknown"
        ]
      },

      timelineWeeks: {
        type: "INTEGER"
      },

      weeklyHours: {
        type: "NUMBER"
      },

      preferences: {
        type: "OBJECT",

        properties: {
          maxHoursPerStep: {
            type: "NUMBER"
          },

          cost: {
            type: "STRING",
            enum: [
              "free",
              "paid",
              "freemium",
              "any"
            ]
          },

          format: {
            type: "STRING",
            enum: [
              "course",
              "lab",
              "doc",
              "project",
              "video",
              "any"
            ]
          }
        },

        required: [
          "maxHoursPerStep",
          "cost",
          "format"
        ]
      }
    },

    required: [
      "targetRoleId",
      "careerObjective",
      "experienceLevel",
      "currentSkills",
      "interests",
      "learningHistory",
      "preferredTechnologies",
      "learningStyle",
      "timelineWeeks",
      "weeklyHours",
      "preferences"
    ]
  };
}

/**
 * Converts a learner's natural-language goal into
 * a structured personalized learner profile.
 */
export async function extractLearnerIntent(
  goalText: string,
  roles: Role[]
): Promise<LearnerIntent> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "GEMINI_API_KEY is required for intent extraction."
    );
  }

  if (roles.length === 0) {
    throw new Error(
      "No roles are seeded, so intent cannot be mapped to a target role."
    );
  }

  const roleSummary = roles
    .map(
      (role) =>
        `${role.id} — ${role.title} (${role.domainId}): ${role.description}`
    )
    .join("\n");

  /**
   * System instruction:
   * This is where we tell Gemini exactly how the
   * learner profiling engine should behave.
   */
  const systemInstruction = `
You are the AI Learner Profiling Engine for an intelligent
personalized learning platform.

Your job is to analyze a learner's natural-language message
and convert it into a structured learner profile.

AVAILABLE CAREER ROLES:
${roleSummary}

IMPORTANT RULES:

1. Choose targetRoleId ONLY from the available career roles above.

2. Select the closest matching role even if the learner uses
different wording.

3. Extract the learner's career objective from their message.

4. Identify skills the learner says they already know.
Put them in currentSkills.

5. Do NOT treat a mentioned skill as proven mastery.
Actual skill mastery will be determined later through
diagnostic assessments and learning events.

6. Extract previous courses, certifications, projects,
bootcamps, tutorials or other learning experiences into
learningHistory.

7. Extract genuine areas of interest into interests.

8. Extract technologies, programming languages, tools,
frameworks or platforms the learner prefers or already uses
into preferredTechnologies.

9. Estimate experience level as beginner, intermediate or
advanced based on the learner's described experience.

10. If the experience level is unclear, use beginner.

11. Determine learningStyle from the learner's wording:
- hands-on: labs, coding, projects, practice
- visual: diagrams, videos, visual explanations
- reading: books, documentation, articles
- mixed: multiple learning styles
- unknown: insufficient information

12. If learning style is not clear, use unknown.

13. If the learner does not mention previous learning,
return an empty learningHistory array.

14. If the learner does not explicitly mention current skills,
return an empty currentSkills array.

15. If interests cannot reasonably be inferred, return an empty
interests array.

16. If technologies cannot reasonably be inferred, return an
empty preferredTechnologies array.

17. If timeline is missing, estimate a realistic timeline
between 1 and 52 weeks.

18. If weekly study time is missing, estimate a reasonable
weekly commitment.

19. Infer a reasonable maximum session length.

20. Never invent a career role.

21. Never invent a certification, course or project that the
learner claims to have completed.

22. Keep arrays concise and useful for later skill-gap analysis.

23. The diagnostic system will determine actual mastery.
Do not assign mastery scores here.

Return ONLY the structured JSON response matching the provided
schema.
`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        systemInstruction: {
          parts: [
            {
              text: systemInstruction
            }
          ]
        },

        contents: [
          {
            role: "user",
            parts: [
              {
                text: goalText
              }
            ]
          }
        ],

        generationConfig: {
          responseMimeType: "application/json",

          responseSchema: responseSchema(
            roles.map((role) => role.id)
          )
        }
      })
    }
  );

  if (!response.ok) {
    throw new Error(
      `Gemini request failed: ${response.status} ${await response.text()}`
    );
  }

  const payload = await response.json();

  const text =
    payload?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (typeof text !== "string") {
    throw new Error(
      "Model did not return structured intent."
    );
  }

  let parsedJson: unknown;

  try {
    parsedJson = JSON.parse(text);
  } catch {
    throw new Error(
      "Gemini returned invalid JSON."
    );
  }

  // Final validation against the actual Neo4j role list
  // and our application schema.
  return buildIntentSchema(roles).parse(parsedJson);
}