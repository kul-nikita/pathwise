import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser } from "@/lib/auth/session";
import { destroyAllSessions } from "@/lib/auth/session";
import { deleteUser, setConsent } from "@/lib/db/users";
import { deleteLearnerData, exportLearnerData } from "@/lib/db/learners";

export const dynamic = "force-dynamic";

/** Product rule 5: learners can view, export, and delete everything we hold. */
export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  return NextResponse.json({
    account: { id: user.id, email: user.email, consentGiven: user.consentGiven },
    ...(await exportLearnerData(user.id))
  });
}

const patchSchema = z.object({ consentGiven: z.boolean() });

export async function PATCH(request: Request) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  const parsed = patchSchema.safeParse(await request.json().catch(() => null));

  if (!parsed.success) {
    return NextResponse.json({ error: "consentGiven must be a boolean." }, { status: 400 });
  }

  await setConsent(user.id, parsed.data.consentGiven);
  return NextResponse.json({ consentGiven: parsed.data.consentGiven });
}

export async function DELETE() {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  const deleted = await deleteLearnerData(user.id);
  await destroyAllSessions(user.id);
  await deleteUser(user.id);

  return NextResponse.json({ deleted });
}
