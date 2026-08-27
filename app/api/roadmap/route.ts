import { NextResponse } from "next/server";
import { z } from "zod";
import { buildRoadmap, candidatesForGap } from "@/lib/services/recommendations";
import { preferencesSchema } from "@/lib/db/schemas";
import { requireUser } from "@/lib/auth/session";
import { getMastery, getProfile } from "@/lib/db/learners";

export const dynamic = "force-dynamic";

const requestSchema = z.object({
  targetRoleId: z.string().min(1),
  // Preferences and weekly hours are optional for the same reason mastery is:
  // the learner already stated them during onboarding, so requiring them in the
  // body meant a caller who omitted them got a 400 instead of their own plan.
  preferences: preferencesSchema.optional(),
  weeklyHours: z.number().min(1).max(60).optional(),
  // Optional: the diagnostic passes the mastery it just derived, which may not
  // be persisted yet when the learner has not consented. Omitting it falls back
  // to the signed-in learner's stored mastery rather than silently assuming
  // zero, which used to report 0% readiness for a learner who had one.
  mastery: z.record(z.number().min(0).max(1)).optional()
});

export async function POST(request: Request) {
  let user;
  try {
    user = await requireUser();
  } catch {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  const parsed = requestSchema.safeParse(await request.json().catch(() => null));

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { targetRoleId } = parsed.data;

  try {
    const profile = await getProfile(user.id);
    const mastery = parsed.data.mastery ?? (await getMastery(user.id));
    const preferences = parsed.data.preferences ??
      profile?.preferences ?? { maxHoursPerStep: 3, cost: "any" as const, format: "any" as const };
    const weeklyHours = parsed.data.weeklyHours ?? profile?.weeklyHours ?? 10;
    const roadmap = await buildRoadmap(targetRoleId, mastery);
    // The first gap whose own prerequisites are already met.
    const firstUnlockedGap =
      roadmap.gaps.find((gap) => gap.skill.prerequisites.every((id) => (mastery[id] ?? 0) >= 0.6)) ??
      roadmap.gaps[0];

    return NextResponse.json({
      roadmap,
      recommendations: firstUnlockedGap
        ? await candidatesForGap(firstUnlockedGap, mastery, preferences, weeklyHours)
        : []
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not build roadmap." },
      { status: 500 }
    );
  }
}
