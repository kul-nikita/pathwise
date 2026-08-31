import { NextResponse } from "next/server";
import { z } from "zod";
import { requireUser } from "@/lib/auth/session";
import { parseJobDescription, matchJDSkillsToGraph } from "@/lib/llm/jd-parsing";
import { getSkillGraph, getRole } from "@/lib/graph/queries";
import { getMastery } from "@/lib/db/learners";

export const dynamic = "force-dynamic";

const requestSchema = z.object({
  jdText: z.string().min(50).max(10000),
  roleId: z.string().optional()
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

  const { jdText, roleId } = parsed.data;

  // Parse the JD with Gemini
  const jdResult = await parseJobDescription(jdText);

  // If roleId provided, also do the gap analysis
  if (roleId) {
    const [role, graph, mastery] = await Promise.all([
      getRole(roleId),
      getSkillGraph(),
      getMastery(user.id)
    ]);

    if (!role) {
      return NextResponse.json({ error: `Unknown role: ${roleId}` }, { status: 404 });
    }

    const gapAnalysis = matchJDSkillsToGraph(jdResult.skills, graph, mastery, role);

    return NextResponse.json({
      ...jdResult,
      gapAnalysis,
      role: { id: role.id, title: role.title }
    });
  }

  return NextResponse.json(jdResult);
}
