import Link from "next/link";
import { AuthForm } from "@/components/AuthForm";

export const metadata = { title: "Create account · SkillForge" };

export default async function SignupPage({
  searchParams
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  const target = next?.startsWith("/") && !next.startsWith("//") ? next : "/onboarding";

  return (
    <main className="flex min-h-screen items-center justify-center bg-canvas px-6 py-16">
      <div className="w-full max-w-sm">
        <Link className="text-lg font-semibold tracking-tight text-ink" href="/">
          SkillForge
        </Link>
        <h1 className="mt-6 text-2xl font-semibold text-ink">Create your account</h1>
        <p className="mt-2 text-sm text-muted">
          Your diagnostic results and evidence stay private to you, and you can export or delete them at
          any time.
        </p>
        <div className="mt-6 rounded-lg border border-border bg-white p-6">
          <AuthForm mode="signup" next={target} />
        </div>
      </div>
    </main>
  );
}
