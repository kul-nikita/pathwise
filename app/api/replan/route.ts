import { NextResponse } from "next/server";
import { z } from "zod";
import { findDownstreamSkills, getRole } from "@/lib/graph/queries";
import { findResourcesBySkill } from "@/lib/db/resources";
import { applyAssessmentOutcome, planWeek } from "@/lib/adaptation/replan";
import { buildRoadmap, candidatesBySkill } from "@/lib/services/recommendations";
import { preferencesSchema } from "@/lib/db/schemas";

export const dynamic = "force-dynamic";

const requestSchema = z.object({
  targetRoleId: z.string().min(1),
  preferences: preferencesSchema,
  weeklyHours: z.number().min(1).max(60),
  mastery: z.record(z.number().min(0).max(1)).default({}),
  excludeResourceIds: z.array(z.string()).default([]),
  /** Optional quiz result that triggers remediation before the week is planned. */
  assessment: z
    .object({
      skillId: z.string(),
      score: z.number().min(0).max(1),
      finishedEarly: z.boolean().default(false)
    })
    .optional()
});

export async function POST(request: Request) {
  const parsed = requestSchema.safeParse(await request.json().catch(() => null));

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { targetRoleId, preferences, weeklyHours, mastery, excludeResourceIds, assessment } = parsed.data;
  const role = await getRole(targetRoleId);

  if (!role) {
    return NextResponse.json({ error: `Unknown role: ${targetRoleId}` }, { status: 404 });
  }

  const roleSkillIds = new Set(role.requiredSkills.map((required) => required.skillId));
  let outcome = null;

  if (assessment) {
    // Transitive dependents come from the graph, not a BFS in app code.
    const downstream = await findDownstreamSkills(assessment.skillId);
    const raw = applyAssessmentOutcome({
      skillId: assessment.skillId,
      skillName: role.requiredSkills.some((r) => r.skillId === assessment.skillId)
        ? assessment.skillId
        : assessment.skillId,
      assessmentScore: assessment.score,
      finishedEarly: assessment.finishedEarly,
      downstreamSkillIds: downstream,
      candidateResources: await findResourcesBySkill(assessment.skillId),
      mastery
    });

    // The graph spans every domain; only report delays this learner cares about.
    outcome = { ...raw, delayedSkillIds: raw.delayedSkillIds.filter((id) => roleSkillIds.has(id)) };
  }

  const { gaps } = await buildRoadmap(targetRoleId, mastery);
  const delayed = new Set(outcome?.delayedSkillIds ?? []);
  const plannableGaps = gaps.filter((gap) => !delayed.has(gap.skill.id));

  return NextResponse.json({
    outcome,
    plan: planWeek({
      gaps: plannableGaps,
      candidatesBySkill: await candidatesBySkill(plannableGaps, mastery, preferences, weeklyHours),
      weeklyHours,
      excludeResourceIds,
      // The remediation the outcome promises must actually appear in the week.
      pinnedBySkill: outcome?.remediation ? { [assessment!.skillId]: outcome.remediation.id } : {}
    })
  });
}
