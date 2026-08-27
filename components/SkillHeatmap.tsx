import { Lock } from "lucide-react";
import type { Gap, MasteryMap } from "@/lib/types";

const PREREQUISITE_THRESHOLD = 0.6;
const MASTERY_THRESHOLD = 0.8;

/**
 * Deliberately CSS rather than a chart library: this is a grid of coloured
 * cells, and Recharts would ship a renderer to do what `grid` already does.
 *
 * Mastery drives the fill, but never carries meaning on its own — every tile
 * also states the percentage in text, so the heatmap is readable without
 * colour vision.
 */
export function SkillHeatmap({
  gaps,
  mastered,
  mastery
}: {
  gaps: Gap[];
  mastered: Gap[];
  mastery: MasteryMap;
}) {
  // `gaps` is in prerequisite order and `mastered` is everything already
  // cleared, so together they are exactly the role's required skills.
  const tiles = [...mastered, ...gaps].map((item) => {
    const unmet = item.skill.prerequisites.filter(
      (id) => (mastery[id] ?? 0) < PREREQUISITE_THRESHOLD
    );
    return { ...item, locked: unmet.length > 0 && item.currentMastery < MASTERY_THRESHOLD, unmet };
  });

  if (tiles.length === 0) {
    return null;
  }

  return (
    <article className="rounded-lg border border-border bg-white p-5">
      <h2 className="text-lg font-semibold">Skill heatmap</h2>
      <p className="mt-2 text-sm text-muted">
        Every skill this role requires, shaded by current mastery. Locked skills are waiting on a
        prerequisite, not on you.
      </p>

      <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {tiles.map((tile) => {
          const percent = Math.round(tile.currentMastery * 100);
          return (
            <li
              className="rounded-md border border-border p-3"
              // Alpha carries the intensity so the teal stays on-brand at every
              // level; the floor keeps a 0% tile visible rather than blank.
              style={{ backgroundColor: `rgba(15, 118, 110, ${0.06 + tile.currentMastery * 0.54})` }}
              key={tile.skill.id}
            >
              <div className="flex items-start justify-between gap-2">
                <span
                  className={`text-sm font-semibold ${tile.currentMastery > 0.55 ? "text-white" : "text-ink"}`}
                >
                  {tile.skill.name}
                </span>
                {tile.locked && (
                  <Lock
                    aria-label="Prerequisites not met"
                    className={tile.currentMastery > 0.55 ? "text-white" : "text-muted"}
                    size={14}
                  />
                )}
              </div>
              <div
                className={`mt-2 text-xs ${tile.currentMastery > 0.55 ? "text-white/80" : "text-muted"}`}
              >
                {percent}% mastery · importance {Math.round(tile.importance * 100)}%
              </div>
              {tile.locked && (
                <div
                  className={`mt-1 text-xs ${tile.currentMastery > 0.55 ? "text-white/80" : "text-muted"}`}
                >
                  needs {tile.unmet.length} prerequisite{tile.unmet.length === 1 ? "" : "s"}
                </div>
              )}
            </li>
          );
        })}
      </ul>

      <div className="mt-4 flex items-center gap-3 text-xs text-muted">
        <span>0%</span>
        <span
          aria-hidden="true"
          className="h-2 flex-1 rounded-full"
          style={{
            backgroundImage: "linear-gradient(to right, rgba(15,118,110,0.06), rgba(15,118,110,0.6))"
          }}
        />
        <span>100%</span>
      </div>
    </article>
  );
}
