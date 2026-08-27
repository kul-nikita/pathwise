import { listRoles } from "@/lib/graph/queries";
import { requireUserOrRedirect } from "@/lib/auth/session";
import { OnboardingFlow } from "@/components/OnboardingFlow";
import { SiteHeader } from "@/components/SiteHeader";
import { isAdmin } from "@/lib/auth/admin";

export const dynamic = "force-dynamic";

export const metadata = { title: "Set your goal" };

export default async function OnboardingPage() {
  const user = await requireUserOrRedirect("/onboarding");
  const roles = await listRoles();

  return (
    <>
      <SiteHeader showAdmin={isAdmin(user)} user={user} />
      <main className="min-h-screen bg-canvas" id="main">
      <div className="mx-auto max-w-2xl px-6 py-14">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-ink">What are you aiming for?</h1>
        <p className="mt-3 text-base leading-7 text-muted">
          Describe your goal in your own words. We&apos;ll turn it into a structured plan — and show you
          exactly what we understood before saving anything.
        </p>
        <OnboardingFlow roles={roles} />
      </div>
      </main>
    </>
  );
}
