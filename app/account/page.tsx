import { AccountPanel } from "@/components/AccountPanel";
import { SiteHeader } from "@/components/SiteHeader";
import { requireUserOrRedirect } from "@/lib/auth/session";
import { isAdmin } from "@/lib/auth/admin";
import { getProfile, listEvents, listEvidence } from "@/lib/db/learners";

export const dynamic = "force-dynamic";

export const metadata = { title: "Account" };

export default async function AccountPage() {
  const user = await requireUserOrRedirect("/account");
  const [profile, events, evidence] = await Promise.all([
    getProfile(user.id),
    listEvents(user.id),
    listEvidence(user.id)
  ]);

  return (
    <>
      <SiteHeader current="/account" showAdmin={isAdmin(user)} user={user} />
      <main className="mx-auto max-w-4xl px-6 py-10" id="main">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-ink">Account</h1>
        <p className="mt-2 text-sm text-muted">
          Signed in as <span className="font-medium text-ink">{user.email}</span>
        </p>

        <div className="mt-8">
          <AccountPanel
            counts={{
              events: events.length,
              evidence: evidence.length,
              hasProfile: Boolean(profile)
            }}
            email={user.email}
            initialConsent={user.consentGiven}
          />
        </div>
      </main>
    </>
  );
}
