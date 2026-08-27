import { NextResponse } from "next/server";
import { z } from "zod";
import { findUserByEmail, normalizeEmail } from "@/lib/db/users";
import { verifyPassword } from "@/lib/auth/password";
import { createSession } from "@/lib/auth/session";
import { clearAttempts, isThrottled, registerFailedAttempt } from "@/lib/auth/throttle";

export const dynamic = "force-dynamic";

const bodySchema = z.object({
  email: z.string().email().max(200),
  password: z.string().min(1).max(200)
});

// One message for every failure: never reveal whether the email exists.
const GENERIC_FAILURE = "Email or password is incorrect.";

export async function POST(request: Request) {
  const parsed = bodySchema.safeParse(await request.json().catch(() => null));

  if (!parsed.success) {
    return NextResponse.json({ error: GENERIC_FAILURE }, { status: 400 });
  }

  const email = normalizeEmail(parsed.data.email);

  if (await isThrottled(email)) {
    return NextResponse.json(
      { error: "Too many attempts. Try again in a few minutes." },
      { status: 429 }
    );
  }

  const user = await findUserByEmail(email);
  const valid = user ? await verifyPassword(parsed.data.password, user.passwordHash) : false;

  if (!user || !valid) {
    await registerFailedAttempt(email);
    return NextResponse.json({ error: GENERIC_FAILURE }, { status: 401 });
  }

  await clearAttempts(email);
  await createSession(user.id);

  return NextResponse.json({ id: user.id, email: user.email, consentGiven: user.consentGiven });
}
