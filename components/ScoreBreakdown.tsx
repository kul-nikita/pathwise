import type { ScoreBreakdown as ScoreBreakdownType } from "@/lib/types";

const LABELS: Array<[keyof Omit<ScoreBreakdownType, "total">, string]> = [
  ["gapMatch", "Gap match"],
  ["prereqReadiness", "Prerequisite readiness"],
  ["quality", "Quality"],
  ["preferenceFit", "Preference fit"],
  ["timeFit", "Time fit"],
  ["costFit", "Cost fit"]
];

export function ScoreBreakdown({ score }: { score: ScoreBreakdownType }) {
  return (
    <dl className="grid gap-3 sm:grid-cols-2">
      {LABELS.map(([key, label]) => (
        <div className="rounded-md border border-border bg-white p-3" key={key}>
          <dt className="text-xs font-medium uppercase tracking-wide text-muted">{label}</dt>
          <dd className="mt-1 text-lg font-semibold text-ink">{Math.round(score[key] * 100)}%</dd>
        </div>
      ))}
    </dl>
  );
}
