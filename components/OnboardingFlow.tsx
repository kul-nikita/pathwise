"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";
import type { Role } from "@/lib/types";

type Intent = {
  targetRoleId: string;
  timelineWeeks: number;
  weeklyHours: number;
  preferences: { maxHoursPerStep: number; cost: string; format: string };
};

const EXAMPLES = [
  "I'm a second-year student who knows some Python and networking. I want to be internship-ready as a junior SOC analyst in 12 weeks.",
  "I can give about 5 hours a week and prefer hands-on labs. I want to move into penetration testing over the next 6 months.",
  "I use spreadsheets daily and want to become a data analyst in about 4 months. Free resources, roughly 6 hours a week.",
  "I already work in IT support and want to move into cloud security. Free resources only, a couple of hours a week."
];

export function OnboardingFlow({ roles }: { roles: Role[] }) {
  const router = useRouter();
  const [goal, setGoal] = useState("");
  const [intent, setIntent] = useState<Intent | null>(null);
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function parseGoal(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(null);

    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goal })
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Could not read that goal.");
        return;
      }

      setIntent(data.intent);
    } catch {
      setError("Could not reach the server.");
    } finally {
      setBusy(false);
    }
  }

  async function confirm() {
    if (!intent) return;
    setBusy(true);
    setError(null);

    try {
      const res = await fetch("/api/onboarding", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...intent, consentGiven: consent })
      });
      const data = await res.json();

      if (!res.ok) {
        setError(typeof data.error === "string" ? data.error : "Could not save your plan.");
        return;
      }

      router.push("/diagnostic");
      router.refresh();
    } catch {
      setError("Could not reach the server.");
    } finally {
      setBusy(false);
    }
  }

  if (!intent) {
    return (
      <form className="mt-8 space-y-4" onSubmit={parseGoal}>
        <textarea
          className="h-36 w-full rounded-md border border-border p-3 text-sm focus:border-teal focus:outline-none"
          onChange={(e) => setGoal(e.target.value)}
          placeholder="e.g. I want to become a junior SOC analyst in 12 weeks, about 8 hours a week, free hands-on labs."
          required
          value={goal}
        />

        <div className="flex flex-wrap gap-2">
          {EXAMPLES.map((example, index) => (
            <button
              className="rounded-md border border-border bg-white px-3 py-1.5 text-xs text-muted hover:border-teal hover:text-ink"
              key={example}
              onClick={() => setGoal(example)}
              type="button"
            >
              Example {index + 1}
            </button>
          ))}
        </div>

        {error && (
          <p className="rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-800" role="alert">
            {error}
          </p>
        )}

        <button
          className="inline-flex h-10 items-center gap-2 rounded-md bg-teal px-4 text-sm font-semibold text-white hover:bg-teal-strong disabled:opacity-50"
          disabled={busy || goal.trim().length < 3}
          type="submit"
        >
          <Sparkles aria-hidden="true" size={16} />
          {busy ? "Reading your goal…" : "Continue"}
        </button>
      </form>
    );
  }

  const role = roles.find((candidate) => candidate.id === intent.targetRoleId);

  return (
    <section className="mt-8 space-y-5">
      <div className="rounded-lg border border-border bg-white p-6">
        <h2 className="text-lg font-semibold text-ink">Here&apos;s what we understood</h2>
        <p className="mt-1 text-sm text-muted">
          Change anything that&apos;s wrong. Nothing is saved until you confirm.
        </p>

        <div className="mt-5 space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-ink">Target role</span>
            <select
              className="mt-1 h-10 w-full rounded-md border border-border px-3 text-sm focus:border-teal focus:outline-none"
              onChange={(e) => setIntent({ ...intent, targetRoleId: e.target.value })}
              value={intent.targetRoleId}
            >
              {roles.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.title} ({option.domainId})
                </option>
              ))}
            </select>
            {role && <span className="mt-1 block text-xs text-muted">{role.description}</span>}
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-ink">Timeline (weeks)</span>
              <input
                className="mt-1 h-10 w-full rounded-md border border-border px-3 text-sm focus:border-teal focus:outline-none"
                max={52}
                min={1}
                onChange={(e) => setIntent({ ...intent, timelineWeeks: Number(e.target.value) })}
                type="number"
                value={intent.timelineWeeks}
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-ink">Hours per week</span>
              <input
                className="mt-1 h-10 w-full rounded-md border border-border px-3 text-sm focus:border-teal focus:outline-none"
                max={60}
                min={1}
                onChange={(e) => setIntent({ ...intent, weeklyHours: Number(e.target.value) })}
                type="number"
                value={intent.weeklyHours}
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-ink">Preferred format</span>
              <select
                className="mt-1 h-10 w-full rounded-md border border-border px-3 text-sm focus:border-teal focus:outline-none"
                onChange={(e) =>
                  setIntent({ ...intent, preferences: { ...intent.preferences, format: e.target.value } })
                }
                value={intent.preferences.format}
              >
                {["any", "lab", "course", "doc", "project", "video"].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-sm font-medium text-ink">Budget</span>
              <select
                className="mt-1 h-10 w-full rounded-md border border-border px-3 text-sm focus:border-teal focus:outline-none"
                onChange={(e) =>
                  setIntent({ ...intent, preferences: { ...intent.preferences, cost: e.target.value } })
                }
                value={intent.preferences.cost}
              >
                {["free", "freemium", "paid", "any"].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-white p-6">
        <label className="flex gap-3">
          <input
            checked={consent}
            className="mt-1 h-4 w-4 shrink-0"
            onChange={(e) => setConsent(e.target.checked)}
            type="checkbox"
          />
          <span className="text-sm leading-6 text-muted">
            <span className="font-medium text-ink">Store and analyze my progress.</span> Your diagnostic
            answers and completed work are used to estimate your skills and adapt your plan. Without
            this, results are shown but never saved. You can export or delete everything at any time.
          </span>
        </label>
      </div>

      {error && (
        <p className="rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-800" role="alert">
          {error}
        </p>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          className="inline-flex h-10 items-center rounded-md bg-teal px-4 text-sm font-semibold text-white hover:bg-teal-strong disabled:opacity-50"
          disabled={busy}
          onClick={confirm}
          type="button"
        >
          {busy ? "Saving…" : "Confirm and start diagnostic"}
        </button>
        <button
          className="inline-flex h-10 items-center rounded-md border border-border bg-white px-4 text-sm font-semibold hover:border-teal"
          disabled={busy}
          onClick={() => setIntent(null)}
          type="button"
        >
          Rewrite my goal
        </button>
      </div>
    </section>
  );
}
