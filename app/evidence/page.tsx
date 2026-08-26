import Link from "next/link";
import { ArrowLeft, Award } from "lucide-react";
import { EvidenceCard } from "@/components/EvidenceCard";
import { listEvidence } from "@/lib/db/learners";
import { findResourcesByIds } from "@/lib/db/resources";
import { getSkillGraph } from "@/lib/graph/queries";
import { requireUserOrRedirect } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Evidence wallet · SkillForge"
};

export default async function EvidencePage() {
  const user = await requireUserOrRedirect("/evidence");
  const evidence = await listEvidence(user.id);
  const [graph, resources] = await Promise.all([
    getSkillGraph(),
    findResourcesByIds(evidence.map((item) => item.resourceId))
  ]);

  const skillById = new Map(graph.skills.map((skill) => [skill.id, skill]));
  const resourceById = new Map(resources.map((resource) => [resource.id, resource]));
  const averageScore = evidence.reduce((sum, item) => sum + item.rubricScore, 0) / (evidence.length || 1);

  return (
    <main className="min-h-screen bg-canvas">
      <section className="border-b border-border bg-white">
        <div className="mx-auto max-w-4xl px-6 py-8">
          <Link className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink" href="/dashboard">
            <ArrowLeft aria-hidden="true" size={16} />
            Back to dashboard
          </Link>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold text-ink">Evidence wallet</h1>
              <p className="mt-2 max-w-2xl text-base leading-7 text-muted">
                Every completed milestone produces a verifiable capability record — what was done, how
                it was scored, and which specific skills it demonstrates.
              </p>
            </div>
            {evidence.length > 0 && (
              <div className="flex items-center gap-3 rounded-lg border border-border bg-canvas p-4">
                <Award aria-hidden="true" className="text-teal" size={28} />
                <div>
                  <div className="text-2xl font-semibold">{Math.round(averageScore * 100)}%</div>
                  <div className="text-sm text-muted">
                    average across {evidence.length} artifact{evidence.length === 1 ? "" : "s"}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl space-y-5 px-6 py-8">
        {evidence.length === 0 && (
          <p className="rounded-lg border border-border bg-white p-6 text-sm text-muted">
            No evidence yet. Completing a recommended resource with an evidence artifact adds the first
            card here.
          </p>
        )}
        {evidence.map((item) => (
          <EvidenceCard
            evidence={item}
            key={item.id}
            resourceTitle={resourceById.get(item.resourceId)?.title}
            skill={skillById.get(item.skillId)}
          />
        ))}
      </div>
    </main>
  );
}
