import { z } from "zod";
import type { Role } from "@/lib/types";

export const preferencesShape = z.object({
  maxHoursPerStep: z.number().min(0.5).max(20),
  cost: z.enum(["free", "paid", "freemium", "any"]),
  format: z.enum(["course", "lab", "doc", "project", "video", "any"])
});

/**
 * The role list is supplied by the caller (from Neo4j), never hardcoded — a
 * new domain must not require a code change here. The enum is built per call
 * so the model physically cannot return a role that doesn't exist.
 */
export function buildIntentSchema(roles: Role[]) {
  const ids = roles.map((role) => role.id);

  return z.object({
    targetRoleId: z.string().refine((id) => ids.includes(id), {
      message: "targetRoleId must be one of the seeded roles"
    }),
    timelineWeeks: z.number().int().min(1).max(52),
    weeklyHours: z.number().min(1).max(60),
    preferences: preferencesShape
  });
}

export type LearnerIntent = z.infer<ReturnType<typeof buildIntentSchema>>;

const GEMINI_MODEL = "gemini-2.5-flash";

function responseSchema(roleIds: string[]) {
  return {
    type: "OBJECT",
    properties: {
      targetRoleId: { type: "STRING", enum: roleIds },
      timelineWeeks: { type: "INTEGER" },
      weeklyHours: { type: "NUMBER" },
      preferences: {
        type: "OBJECT",
        properties: {
          maxHoursPerStep: { type: "NUMBER" },
          cost: { type: "STRING", enum: ["free", "paid", "freemium", "any"] },
          format: { type: "STRING", enum: ["course", "lab", "doc", "project", "video", "any"] }
        },
        required: ["maxHoursPerStep", "cost", "format"]
      }
    },
    required: ["targetRoleId", "timelineWeeks", "weeklyHours", "preferences"]
  };
}

export async function extractLearnerIntent(goalText: string, roles: Role[]): Promise<LearnerIntent> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is required for intent extraction.");
  }

  if (roles.length === 0) {
    throw new Error("No roles are seeded, so intent cannot be mapped to a target role.");
  }

  const roleSummary = roles
    .map((role) => `${role.id} — ${role.title} (${role.domainId}): ${role.description}`)
    .join("\n");

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: {
          parts: [
            {
              text:
                "Extract a structured learning goal from the learner's free text. " +
                `Choose targetRoleId only from this list:\n${roleSummary}\n` +
                "Pick the closest match even if the learner's wording differs. " +
                "If a field isn't stated, estimate reasonably. Never invent a role id."
            }
          ]
        },
        contents: [{ role: "user", parts: [{ text: goalText }] }],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: responseSchema(roles.map((role) => role.id))
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
    throw new Error("Model did not return structured intent.");
  }

  // Validated against the real role list — the model never gets write authority.
  return buildIntentSchema(roles).parse(JSON.parse(text));
}
