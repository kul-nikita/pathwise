import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { AdminCatalog } from "@/components/AdminCatalog";
import { requireUserOrRedirect } from "@/lib/auth/session";
import { isAdmin } from "@/lib/auth/admin";
import { listResources } from "@/lib/db/resources";
import { getSkillGraph } from "@/lib/graph/queries";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Catalog admin · SkillForge"
};

export default async function AdminPage() {
  const user = await requireUserOrRedirect("/admin");

  // notFound rather than a 403 page: a non-admin should not learn that a
  // catalog admin exists. The API route still enforces this independently, so
  // hiding the page is defence in depth rather than the actual control.
  if (!isAdmin(user)) {
    notFound();
  }

  const [resources, graph] = await Promise.all([listResources(), getSkillGraph()]);

  return (
    <main className="min-h-screen bg-canvas">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <Link
          className="inline-flex items-center gap-1 text-sm font-medium text-muted hover:text-ink"
          href="/dashboard"
        >
          <ArrowLeft aria-hidden="true" size={15} />
          Back to dashboard
        </Link>

        <div className="mt-4 flex items-center gap-2">
          <ShieldCheck aria-hidden="true" className="text-teal" size={22} />
          <h1 className="text-2xl font-semibold tracking-tight text-ink">Catalog admin</h1>
        </div>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted">
          Curating the catalog is the one job the model is not trusted with. Every rule enforced
          here is a defect that was found by hand during the build: a dead URL, a duplicated link, a
          tag naming a skill that does not exist, and a resource that required the very skill it
          teaches — which made it permanently unrecommendable.
        </p>

        <div className="mt-8">
          <AdminCatalog
            initialResources={resources}
            skillIds={graph.skills.map((skill) => skill.id).sort()}
          />
        </div>
      </div>
    </main>
  );
}
