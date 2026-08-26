import { NextResponse } from "next/server";
import { z } from "zod";
import { buildRoadmap, candidatesForGap } from "@/lib/services/recommendations";
import { preferencesSchema } from "@/lib/db/schemas";
import { requireUser } from "@/lib/auth/session";
import { getMastery } from "@/lib/db/learners";

export const dynamic = "force-dynamic";

const requestSchema = z.object({
  targetRoleId: z.string().min(1),
  preferences: preferencesSchema,
  weeklyHours: z.number().min(1).max(60).default(10),
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

  const { targetRoleId, preferences, weeklyHours } = parsed.data;

  try {
    const mastery = parsed.data.mastery ?? (await getMastery(user.id));
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
