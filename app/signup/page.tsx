import { AuthForm } from "@/components/AuthForm";
import { AuthLayout } from "@/components/AuthLayout";

export const metadata = { title: "Create account" };

export default async function SignupPage({
  searchParams
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  // New accounts have no profile yet, so onboarding is the right landing spot.
  const target = next?.startsWith("/") && !next.startsWith("//") ? next : "/onboarding";

  return (
    <AuthLayout
      subtitle="Your diagnostic results and evidence stay private to you. Export or delete them whenever you want."
      title="Create your account"
    >
      <AuthForm mode="signup" next={target} />
    </AuthLayout>
  );
}
