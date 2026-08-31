import { notFound } from "next/navigation";
import { VerifyEvidence } from "@/components/VerifyEvidence";
import { getEvidenceById } from "@/lib/db/learners";
import { findResourcesByIds } from "@/lib/db/resources";
import { getSkillsByIds } from "@/lib/graph/queries";
import { verifyEvidenceSignature } from "@/lib/crypto/signing";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Verify Evidence"
};

export default async function VerifyPage({
  params,
  searchParams
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ sig?: string }>;
}) {
  const { id } = await params;
  const { sig } = await searchParams;

  if (!sig) {
    notFound();
  }

  const evidence = await getEvidenceById(id);
  if (!evidence) {
    notFound();
  }

  const isValid = verifyEvidenceSignature(
    {
      id: evidence.id,
      skillId: evidence.skillId,
      resourceId: evidence.resourceId,
      summary: evidence.summary,
      evidenceType: evidence.evidenceType,
      artifactUrl: evidence.artifactUrl,
      rubricScore: evidence.rubricScore,
      validatedCapabilities: evidence.validatedCapabilities,
      createdAt: evidence.createdAt
    },
    sig
  );

  const [resources, skills] = await Promise.all([
    findResourcesByIds([evidence.resourceId]),
    getSkillsByIds([evidence.skillId])
  ]);

  return (
    <main className="min-h-screen bg-[#050816]">
      <VerifyEvidence
        evidence={evidence}
        resourceTitle={resources[0]?.title}
        skill={skills[0]}
        isValid={isValid}
      />
    </main>
  );
}
