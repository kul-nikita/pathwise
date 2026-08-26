import { listDomains, listRoles } from "@/lib/graph/queries";
import { getProfile } from "@/lib/db/learners";
import { requireUserOrRedirect } from "@/lib/auth/session";
import { DiagnosticFlow } from "@/components/DiagnosticFlow";

export const dynamic = "force-dynamic";

export const metadata = { title: "Diagnostic · SkillForge" };

export default async function DiagnosticPage() {
  const user = await requireUserOrRedirect("/diagnostic");
  const [roles, domains, profile] = await Promise.all([listRoles(), listDomains(), getProfile(user.id)]);

  return (
    <DiagnosticFlow
      // Results are only stored for a learner who explicitly consented.
      canPersist={user.consentGiven}
      defaultRoleId={profile?.targetRoleId ?? null}
      domains={domains}
      roles={roles}
    />
  );
}
