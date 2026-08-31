"use client";

import { useState } from "react";
import { Check, Copy, Shield, ShieldAlert } from "lucide-react";
import type { Evidence, Skill } from "@/lib/types";

export function VerifyEvidence({
  evidence,
  resourceTitle,
  skill,
  isValid
}: {
  evidence: Evidence;
  resourceTitle?: string;
  skill?: Skill;
  isValid: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/verify/${evidence.id}?sig=${evidence.signature}`
      : "";

  async function copyLink() {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 px-6 py-12">
      {/* Verification Status Banner */}
      <div
        className={`rounded-xl border p-6 ${
          isValid
            ? "border-emerald-500/30 bg-emerald-500/10"
            : "border-red-500/30 bg-red-500/10"
        }`}
      >
        <div className="flex items-center gap-3">
          {isValid ? (
            <Shield className="text-emerald-400" size={28} />
          ) : (
            <ShieldAlert className="text-red-400" size={28} />
          )}
          <div>
            <h2
              className={`text-lg font-semibold ${
                isValid ? "text-emerald-300" : "text-red-300"
              }`}
            >
              {isValid ? "Verified Credential" : "Tamper Detected"}
            </h2>
            <p className="text-sm text-slate-400">
              {isValid
                ? "This evidence record has not been altered since it was issued."
                : "This evidence record does not match its signature. It may have been modified."}
            </p>
          </div>
        </div>
      </div>

      {/* Evidence Card */}
      <article className="rounded-xl border border-white/10 bg-white/5 p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Shield className="text-cyan-400" size={20} />
              <h1 className="text-xl font-semibold text-white">
                {skill?.name ?? evidence.skillId}
              </h1>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              {evidence.summary}
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-white">
              {Math.round(evidence.rubricScore * 100)}%
            </div>
            <div className="text-xs uppercase tracking-wide text-slate-400">
              rubric score
            </div>
          </div>
        </div>

        <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Skill
            </dt>
            <dd className="mt-1 text-white">{skill?.name ?? evidence.skillId}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Resource
            </dt>
            <dd className="mt-1 text-white">{resourceTitle ?? evidence.resourceId}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Evidence Type
            </dt>
            <dd className="mt-1 text-white">{evidence.evidenceType}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Issued
            </dt>
            <dd className="mt-1 text-white">
              {new Date(evidence.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric"
              })}
            </dd>
          </div>
        </dl>

        <div className="mt-6 border-t border-white/10 pt-6">
          <h3 className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Validated Capabilities
          </h3>
          <ul className="mt-3 space-y-2">
            {evidence.validatedCapabilities.map((capability) => (
              <li className="flex gap-2 text-sm text-white" key={capability}>
                <Check
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-emerald-400"
                  size={16}
                />
                {capability}
              </li>
            ))}
          </ul>
        </div>

        {/* Tamper-Proof Hash */}
        <div className="mt-6 border-t border-white/10 pt-6">
          <h3 className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Signature Hash
          </h3>
          <p className="mt-2 break-all font-mono text-xs text-slate-500">
            {evidence.signature}
          </p>
        </div>
      </article>

      {/* Share Button */}
      <button
        onClick={copyLink}
        type="button"
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/10"
      >
        {copied ? (
          <>
            <Check size={16} className="text-emerald-400" />
            Copied to clipboard
          </>
        ) : (
          <>
            <Copy size={16} />
            Copy shareable link
          </>
        )}
      </button>

      <p className="text-center text-xs text-slate-500">
        Powered by SkillForge AI — Verifiable Credentials
      </p>
    </div>
  );
}
