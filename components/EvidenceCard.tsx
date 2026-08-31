"use client";

import { useState } from "react";
import { Award, Check, Copy, FileText } from "lucide-react";
import type { Evidence, Skill } from "@/lib/types";

export function EvidenceCard({
  evidence,
  resourceTitle,
  skill
}: {
  evidence: Evidence;
  resourceTitle?: string;
  skill?: Skill;
}) {
  const [copied, setCopied] = useState(false);

  function getShareUrl() {
    if (typeof window === "undefined") return "";
    return `${window.location.origin}/verify/${evidence.id}?sig=${evidence.signature}`;
  }

  async function copyShareLink() {
    await navigator.clipboard.writeText(getShareUrl());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <article className="rounded-lg border border-border bg-surface p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Award aria-hidden="true" className="text-teal" size={18} />
            <h3 className="text-lg font-semibold text-ink">{skill?.name ?? evidence.skillId}</h3>
          </div>
          <p className="mt-2 text-sm leading-6 text-muted">{evidence.summary}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-semibold text-ink">{Math.round(evidence.rubricScore * 100)}%</div>
          <div className="text-xs uppercase tracking-wide text-muted">rubric score</div>
        </div>
      </div>

      <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-muted">Artifact</dt>
          <dd className="mt-1">
            {evidence.artifactUrl ? (
              <a
                className="inline-flex items-center gap-1 font-medium text-teal hover:underline"
                href={evidence.artifactUrl}
                rel="noreferrer"
                target="_blank"
              >
                <FileText aria-hidden="true" size={14} />
                {evidence.evidenceType}
              </a>
            ) : (
              <span className="text-muted">{evidence.evidenceType} · not uploaded in this demo</span>
            )}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-muted">Produced from</dt>
          <dd className="mt-1 text-ink">{resourceTitle ?? evidence.resourceId}</dd>
        </div>
      </dl>

      <div className="mt-4 border-t border-border pt-4">
        <h4 className="text-xs font-medium uppercase tracking-wide text-muted">Validated capabilities</h4>
        <ul className="mt-2 space-y-2">
          {evidence.validatedCapabilities.map((capability) => (
            <li className="flex gap-2 text-sm text-ink" key={capability}>
              <Check aria-hidden="true" className="mt-0.5 shrink-0 text-teal" size={15} />
              {capability}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
        <p className="text-xs text-muted">Recorded {evidence.createdAt}</p>
        <button
          onClick={copyShareLink}
          type="button"
          className="inline-flex items-center gap-1.5 rounded-md border border-border bg-canvas px-3 py-1.5 text-xs font-medium text-ink transition hover:bg-surface-sunken"
        >
          {copied ? (
            <>
              <Check size={12} className="text-teal" />
              Copied
            </>
          ) : (
            <>
              <Copy size={12} />
              Copy Share Link
            </>
          )}
        </button>
      </div>
    </article>
  );
}
