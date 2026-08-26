import { Award, Check, FileText } from "lucide-react";
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
  return (
    <article className="rounded-lg border border-border bg-white p-5">
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

      <p className="mt-4 text-xs text-muted">Recorded {evidence.createdAt}</p>
    </article>
  );
}
