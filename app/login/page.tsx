import Link from "next/link";
import { AuthForm } from "@/components/AuthForm";

export const metadata = { title: "Sign in · SkillForge" };

export default async function LoginPage({
  searchParams
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  // Only allow same-site paths, so ?next= can't be used as an open redirect.
  const target = next?.startsWith("/") && !next.startsWith("//") ? next : "/dashboard";

  return (
    <main className="flex min-h-screen items-center justify-center bg-canvas px-6 py-16">
      <div className="w-full max-w-sm">
        <Link className="text-lg font-semibold tracking-tight text-ink" href="/">
          SkillForge
        </Link>
        <h1 className="mt-6 text-2xl font-semibold text-ink">Sign in</h1>
        <p className="mt-2 text-sm text-muted">Pick up your learning path where you left off.</p>
        <div className="mt-6 rounded-lg border border-border bg-white p-6">
          <AuthForm mode="login" next={target} />
        </div>
      </div>
    </main>
  );
}
