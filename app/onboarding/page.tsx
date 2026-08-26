import { listRoles } from "@/lib/graph/queries";
import { requireUserOrRedirect } from "@/lib/auth/session";
import { OnboardingFlow } from "@/components/OnboardingFlow";

export const dynamic = "force-dynamic";

export const metadata = { title: "Set your goal · SkillForge" };

export default async function OnboardingPage() {
  await requireUserOrRedirect("/onboarding");
  const roles = await listRoles();

  return (
    <main className="min-h-screen bg-canvas">
      <div className="mx-auto max-w-2xl px-6 py-14">
        <h1 className="text-3xl font-semibold text-ink">What are you aiming for?</h1>
        <p className="mt-3 text-base leading-7 text-muted">
          Describe your goal in your own words. We&apos;ll turn it into a structured plan — and show you
          exactly what we understood before saving anything.
        </p>
        <OnboardingFlow roles={roles} />
      </div>
    </main>
  );
}
