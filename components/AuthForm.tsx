"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  Loader2,
  ArrowRight,
  Mail,
  Lock
} from "lucide-react";

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
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
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
    <form className="auth-form" onSubmit={submit}>

      <div className="form-field">
        <label htmlFor="email">
          Email address
        </label>

        <div className="input-shell">

          <Mail size={17} className="input-icon" />

          <input
            autoComplete="email"
            id="email"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            required
            type="email"
            value={email}
          />

        </div>
      </div>

      <div className="form-field">

        <div className="label-row">
          <label htmlFor="password">
            Password
          </label>

          {!isSignup && (
            <span className="forgot">
              Secure access
            </span>
          )}
        </div>

        <div className="input-shell">

          <Lock size={17} className="input-icon" />

          <input
            autoComplete={
              isSignup ? "new-password" : "current-password"
            }
            id="password"
            minLength={isSignup ? 10 : undefined}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
            required
            type={reveal ? "text" : "password"}
            value={password}
          />

          <button
            aria-label={
              reveal ? "Hide password" : "Show password"
            }
            className="password-toggle"
            onClick={() => setReveal((current) => !current)}
            type="button"
          >
            {reveal ? (
              <EyeOff size={17} />
            ) : (
              <Eye size={17} />
            )}
          </button>

        </div>

        {isSignup && (
          <p className="password-hint">
            Use at least 10 characters.
          </p>
        )}
      </div>

      {error && (
        <div className="auth-error" role="alert">
          {error}
        </div>
      )}

      <button
        className="auth-submit"
        disabled={busy}
        type="submit"
      >
        {busy ? (
          <>
            <Loader2
              size={17}
              className="spin"
            />
            Processing...
          </>
        ) : (
          <>
            {isSignup ? "Create my learning profile" : "Sign in"}
            <ArrowRight size={17} />
          </>
        )}
      </button>

      <div className="auth-divider">
        <span />
        <small>
          {isSignup
            ? "Already have an account?"
            : "New to SkillForge?"}
        </small>
        <span />
      </div>

      <Link
        className="auth-switch"
        href={isSignup ? "/login" : "/signup"}
      >
        {isSignup ? "Sign in to your account" : "Create your account"}
      </Link>

    </form>
  );
}