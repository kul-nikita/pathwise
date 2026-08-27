import Link from "next/link";
import { Award, GitBranch, Gauge, Search } from "lucide-react";
import { listDomains, listRoles, getSkillGraph } from "@/lib/graph/queries";
import { PrerequisiteChain, pickChain } from "@/components/PrerequisiteChain";
import { getCurrentUser } from "@/lib/auth/session";
import { isAdmin } from "@/lib/auth/admin";
import { SiteHeader } from "@/components/SiteHeader";
import { button } from "@/lib/ui";

export const dynamic = "force-dynamic";

const PILLARS = [
  {
    icon: GitBranch,
    title: "Prerequisite-aware by construction",
    body: "Sequencing is a graph traversal, not a model's opinion. A skill can never be recommended before what it depends on."
  },
  {
    icon: Gauge,
    title: "Transparent scoring, not a black box",
    body: "Every recommendation shows six numeric components — gap match, prerequisite readiness, quality, preference, time, and cost."
  },
  {
    icon: Search,
    title: "Real resources only",
    body: "Titles, links, durations and costs come from a hand-verified catalog. The model explains; it never invents a fact."
  },
  {
    icon: Award,
    title: "Evidence, not completion badges",
    body: "Each milestone produces a capability record with a rubric score and the specific skills it demonstrates."
  }
];

export default async function LandingPage() {
  const [domains, roles, user, graph] = await Promise.all([
    listDomains(),
    listRoles(),
    getCurrentUser(),
    getSkillGraph()
  ]);
  const chain = pickChain(graph.skills);
  const domainName = new Map(domains.map((domain) => [domain.id, domain.name]));

  return (
    <main className="min-h-screen bg-canvas" id="main">
      <SiteHeader showAdmin={isAdmin(user)} user={user} />

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <div>
            <h1 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink md:text-6xl">
              Know what to learn next — and be able to prove you learned it.
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted">
              Tell SkillForge the role you are aiming for. It maps what you already know, finds the
              gaps, orders them so nothing is taught out of sequence, and turns every finished step
              into portfolio evidence.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className={`${button.primary} h-11 px-6`} href="/onboarding">
                Build my learning path
              </Link>
              <Link className={`${button.secondary} h-11 px-6`} href="/diagnostic">
                Take the diagnostic
              </Link>
            </div>
          </div>

          <PrerequisiteChain chain={chain} />
        </div>
      </section>

      <section className="border-y border-border bg-white">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
            {domains.length} domain{domains.length === 1 ? "" : "s"} · {roles.length} career track
            {roles.length === 1 ? "" : "s"}
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {roles.map((role) => (
              <article className="rounded-lg border border-border p-5" key={role.id}>
                <p className="text-xs font-medium uppercase tracking-wide text-teal">{domainName.get(role.domainId) ?? role.domainId}</p>
                <h3 className="mt-2 font-semibold text-ink">{role.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{role.description}</p>
                <p className="mt-3 text-sm text-muted">{role.requiredSkills.length} tracked skills</p>
              </article>
            ))}
            {roles.length === 0 && (
              <p className="text-sm text-muted">
                Nothing seeded yet — run <code>npm run db:seed:all</code>.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-2xl font-semibold text-ink">Why this is different</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {PILLARS.map((pillar) => (
            <article className="rounded-lg border border-border bg-white p-6" key={pillar.title}>
              <pillar.icon aria-hidden="true" className="text-teal" size={22} />
              <h3 className="mt-3 text-lg font-semibold text-ink">{pillar.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{pillar.body}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="border-t border-border bg-white">
        <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-muted">
          You control your data: view, export, or delete your profile at any time.
        </div>
      </footer>
    </main>
  );
}
