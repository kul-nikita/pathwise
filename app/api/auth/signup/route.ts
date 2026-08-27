import { NextResponse } from "next/server";
import { z } from "zod";
import { createUser, findUserByEmail, normalizeEmail } from "@/lib/db/users";
import { hashPassword } from "@/lib/auth/password";
import { createSession } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

const bodySchema = z.object({
  email: z.string().email().max(200),
  // Length is the property that actually matters; no composition theatre.
  password: z.string().min(10).max(200)
});

export async function POST(request: Request) {
  const parsed = bodySchema.safeParse(await request.json().catch(() => null));

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Enter a valid email and a password of at least 10 characters." },
      { status: 400 }
    );
  }

  const email = normalizeEmail(parsed.data.email);

  if (await findUserByEmail(email)) {
    return NextResponse.json({ error: "An account with that email already exists." }, { status: 409 });
  }

  try {
    const user = await createUser(email, await hashPassword(parsed.data.password));
    await createSession(user.id);
    return NextResponse.json({ id: user.id, email: user.email, consentGiven: user.consentGiven });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not create the account." },
      { status: 400 }
    );
  }
}
