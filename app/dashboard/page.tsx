import Link from "next/link";
import { Award, CheckCircle2, Route, ShieldCheck } from "lucide-react";
import { ScoreBreakdown } from "@/components/ScoreBreakdown";
import { ExplainButton } from "@/components/ExplainButton";
import { ResourceSearch } from "@/components/ResourceSearch";
import { SkillHeatmap } from "@/components/SkillHeatmap";
import { ReadinessTimeline } from "@/components/ReadinessTimeline";
import { buildRoadmap, candidatesForGap } from "@/lib/services/recommendations";
import { getMastery, getProfile, listEvidence, listEvents } from "@/lib/db/learners";
import { listDomains, listRoles, getSkillGraph } from "@/lib/graph/queries";
import { DEFAULT_PREFERENCES, DEFAULT_WEEKLY_HOURS } from "@/lib/constants";
import { requireUserOrRedirect } from "@/lib/auth/session";
import { isAdmin } from "@/lib/auth/admin";
import { SiteHeader } from "@/components/SiteHeader";
import { predictTimeline } from "@/lib/prediction/timeline";

export const dynamic = "force-dynamic";

export const metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const user = await requireUserOrRedirect("/dashboard");
  const [profile, mastery, evidence, roles, domains, events, graph] = await Promise.all([
    getProfile(user.id),
    getMastery(user.id),
    listEvidence(user.id),
    listRoles(),
    listDomains(),
    listEvents(user.id),
    getSkillGraph()
  ]);

  const targetRoleId = profile?.targetRoleId ?? roles[0]?.id;

  if (!targetRoleId) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-2xl font-semibold">No roles are seeded yet</h1>
        <p className="mt-3 text-muted">
          Run <code className="rounded bg-canvas px-1.5 py-0.5">npm run db:seed:all</code> to load the
          skill graph and catalog.
        </p>
      </main>
    );
  }

  const preferences = profile?.preferences ?? DEFAULT_PREFERENCES;
  const weeklyHours = profile?.weeklyHours ?? DEFAULT_WEEKLY_HOURS;
  const roadmap = await buildRoadmap(targetRoleId, mastery);

  // Compute timeline prediction
  const role = roles.find((r) => r.id === targetRoleId);
  const timelineData = role
    ? predictTimeline({ profile, mastery, role, graph, events })
    : null;
  const firstUnlockedGap =
    roadmap.gaps.find((gap) => gap.skill.prerequisites.every((id) => (mastery[id] ?? 0) >= 0.6)) ??
    roadmap.gaps[0];
  const recommendations = firstUnlockedGap
    ? (await candidatesForGap(firstUnlockedGap, mastery, preferences, weeklyHours)).slice(0, 2)
    : [];

  return (
    <>
      <SiteHeader current="/dashboard" showAdmin={isAdmin(user)} user={user} />
      <main className="min-h-screen bg-canvas" id="main">
      <section className="border-b border-border bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-teal">
              {domains.find((domain) => domain.id === roadmap.role.domainId)?.name ??
                roadmap.role.domainId}
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-normal text-ink md:text-5xl">
              {roadmap.role.title} readiness plan
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
              A prerequisite-aware roadmap backed by verified resources, numeric scoring, and portfolio
              evidence.
            </p>
            {Object.keys(mastery).length === 0 && (
              <p className="mt-4 rounded-md border border-border bg-canvas p-3 text-sm text-muted">
                No diagnostic on record yet — everything below assumes zero mastery. Run the diagnostic
                for a real estimate.
              </p>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex min-w-48 items-center gap-3 rounded-lg border border-border bg-canvas p-4">
              <ShieldCheck aria-hidden="true" className="text-teal" size={30} />
              <div>
                <div className="text-3xl font-semibold">{Math.round(roadmap.readiness * 100)}%</div>
                <div className="text-sm text-muted">role readiness</div>
              </div>
            </div>
            <Link
              className="inline-flex h-10 items-center justify-center rounded-md bg-teal px-4 text-sm font-semibold text-white hover:bg-teal-strong"
              href="/diagnostic"
            >
              Run the adaptive diagnostic
            </Link>
            <Link
              className="inline-flex h-10 items-center justify-center rounded-md border border-border bg-white px-4 text-sm font-semibold hover:border-teal"
              href="/evidence"
            >
              View evidence wallet
            </Link>
            {isAdmin(user) ? (
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md border border-border bg-white px-4 text-sm font-semibold hover:border-teal"
                href="/admin"
              >
                Catalog admin
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-5 px-6 py-6 lg:grid-cols-[1fr_1.3fr]">
        <article className="rounded-lg border border-border bg-white p-5">
          <div className="flex items-center gap-2">
            <Route aria-hidden="true" className="text-teal" size={20} />
            <h2 className="text-lg font-semibold">Prerequisite-valid gaps</h2>
          </div>
          <ol className="mt-5 space-y-4">
            {roadmap.gaps.slice(0, 6).map((gap) => (
              <li className="rounded-md border border-border p-4" key={gap.skill.id}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold">{gap.skill.name}</h3>
                    <p className="mt-1 text-sm text-muted">{gap.reason}</p>
                  </div>
                  <span className="rounded-md bg-canvas px-2 py-1 text-sm font-medium">
                    {Math.round(gap.currentMastery * 100)}%
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </article>

        <div className="space-y-5">
          <article className="rounded-lg border border-border bg-white p-5">
            <div className="flex items-center gap-2">
              <CheckCircle2 aria-hidden="true" className="text-teal" size={20} />
              <h2 className="text-lg font-semibold">Why recommended</h2>
            </div>
            {recommendations.length === 0 && (
              <p className="mt-4 text-sm text-muted">
                No resource clears the prerequisite gate for your top gap yet.
              </p>
            )}
            {recommendations.map((item) => (
              <div className="mt-5 border-t border-border pt-5 first:border-t-0 first:pt-0" key={item.resource.id}>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">{item.resource.title}</h3>
                    <p className="mt-1 text-sm text-muted">
                      {item.resource.provider} · {item.explanation.estimatedTime} · {item.resource.costType}
                    </p>
                  </div>
                  <a
                    className="inline-flex h-10 items-center justify-center rounded-md bg-teal px-4 text-sm font-semibold text-white hover:bg-teal-strong"
                    href={item.resource.url}
                    rel="noreferrer"
                    target="_blank"
                  >
                    Open
                  </a>
                </div>
                <p className="mt-4 text-sm leading-6 text-muted">{item.explanation.whatGapItCloses}</p>
                {firstUnlockedGap && (
                  <ExplainButton resourceId={item.resource.id} skillId={firstUnlockedGap.skill.id} />
                )}
                <div className="mt-4">
                  <ScoreBreakdown score={item.score} />
                </div>
              </div>
            ))}
          </article>

          <article className="rounded-lg border border-border bg-white p-5">
            <div className="flex items-center gap-2">
              <Award aria-hidden="true" className="text-teal" size={20} />
              <h2 className="text-lg font-semibold">Evidence wallet</h2>
            </div>
            <p className="mt-3 text-sm leading-6 text-muted">
              {evidence.length} completed milestone{evidence.length === 1 ? "" : "s"} producing
              recruiter-readable proof of skill.
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {evidence.map((item) => (
                <li className="flex items-center justify-between gap-3" key={item.id}>
                  <span className="text-ink">{item.summary}</span>
                  <span className="shrink-0 rounded-md bg-canvas px-2 py-1 font-medium">
                    {Math.round(item.rubricScore * 100)}%
                  </span>
                </li>
              ))}
            </ul>
            <Link className="mt-4 inline-block text-sm font-semibold text-teal hover:underline" href="/evidence">
              Open the full wallet →
            </Link>
          </article>

          <SkillHeatmap gaps={roadmap.gaps} mastered={roadmap.mastered} mastery={mastery} />

          {timelineData && role && (
            <ReadinessTimeline
              data={{
                role: { id: role.id, title: role.title },
                prediction: timelineData,
                currentReadiness: roadmap.readiness
              }}
            />
          )}

          <ResourceSearch />
        </div>
      </section>
    </main>
    </>
  );
}
