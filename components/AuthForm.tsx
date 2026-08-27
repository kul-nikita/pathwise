"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { button, input } from "@/lib/ui";

// Sentence case here rather than the dense uppercase used on the admin grid:
// a two-field sign-in form does not need shouting.
const fieldLabel = "mb-1.5 block text-sm font-medium text-ink";

export function AuthForm({ mode, next }: { mode: "login" | "signup"; next: string }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reveal, setReveal] = useState(false);
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
        <label className={fieldLabel} htmlFor="email">
          Email
        </label>
        <input
          autoComplete="email"
          className={input}
          id="email"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          required
          type="email"
          value={email}
        />
      </div>

      <div>
        <label className={fieldLabel} htmlFor="password">
          Password
        </label>
        <div className="relative">
          <input
            autoComplete={isSignup ? "new-password" : "current-password"}
            className={`${input} pr-11`}
            id="password"
            minLength={isSignup ? 10 : undefined}
            onChange={(event) => setPassword(event.target.value)}
            required
            type={reveal ? "text" : "password"}
            value={password}
          />
          <button
            aria-label={reveal ? "Hide password" : "Show password"}
            className="absolute right-1 top-1/2 -translate-y-1/2 rounded-md p-2 text-muted hover:text-ink"
            onClick={() => setReveal((current) => !current)}
            type="button"
          >
            {reveal ? <EyeOff aria-hidden="true" size={16} /> : <Eye aria-hidden="true" size={16} />}
          </button>
        </div>
        {isSignup ? <p className="mt-1.5 text-xs text-muted">At least 10 characters.</p> : null}
      </div>

      {error ? (
        <p
          className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-800"
          role="alert"
        >
          {error}
        </p>
      ) : null}

      <button className={`${button.primary} w-full`} disabled={busy} type="submit">
        {busy ? <Loader2 aria-hidden="true" className="animate-spin" size={16} /> : null}
        {busy ? "Working…" : isSignup ? "Create account" : "Sign in"}
      </button>

      <p className="text-center text-sm text-muted">
        {isSignup ? "Already have an account? " : "No account yet? "}
        <Link
          className="font-semibold text-teal hover:underline"
          href={isSignup ? "/login" : "/signup"}
        >
          {isSignup ? "Sign in" : "Create one"}
        </Link>
      </p>
    </form>
  );
}
