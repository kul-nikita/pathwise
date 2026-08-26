"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function AuthForm({
  mode,
  next
}: {
  mode: "login" | "signup";
  next: string;
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const isSignup = mode === "signup";

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(null);

    try {
      const res = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        return;
      }

      router.push(next);
      router.refresh();
    } catch {
      setError("Could not reach the server.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="space-y-4" onSubmit={submit}>
      <div>
        <label className="block text-sm font-medium text-ink" htmlFor="email">
          Email
        </label>
        <input
          autoComplete="email"
          className="mt-1 h-10 w-full rounded-md border border-border px-3 text-sm focus:border-teal focus:outline-none"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
          value={email}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-ink" htmlFor="password">
          Password
        </label>
        <input
          autoComplete={isSignup ? "new-password" : "current-password"}
          className="mt-1 h-10 w-full rounded-md border border-border px-3 text-sm focus:border-teal focus:outline-none"
          id="password"
          minLength={isSignup ? 10 : undefined}
          onChange={(e) => setPassword(e.target.value)}
          required
          type="password"
          value={password}
        />
        {isSignup && <p className="mt-1 text-xs text-muted">At least 10 characters.</p>}
      </div>

      {error && (
        <p className="rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-800" role="alert">
          {error}
        </p>
      )}

      <button
        className="inline-flex h-10 w-full items-center justify-center rounded-md bg-teal px-4 text-sm font-semibold text-white hover:bg-teal-strong disabled:opacity-50"
        disabled={busy}
        type="submit"
      >
        {busy ? "Working…" : isSignup ? "Create account" : "Sign in"}
      </button>

      <p className="text-center text-sm text-muted">
        {isSignup ? "Already have an account? " : "No account yet? "}
        <Link className="font-semibold text-teal hover:underline" href={isSignup ? "/login" : "/signup"}>
          {isSignup ? "Sign in" : "Create one"}
        </Link>
      </p>
    </form>
  );
}
