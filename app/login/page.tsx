import { AuthForm } from "@/components/AuthForm";
import { AuthLayout } from "@/components/AuthLayout";

export const metadata = { title: "Sign in" };

export default async function LoginPage({
  searchParams
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  // Only allow same-site paths, so ?next= can't be used as an open redirect.
  const target = next?.startsWith("/") && !next.startsWith("//") ? next : "/dashboard";

  return (
    <AuthLayout
      subtitle="Pick up your learning path where you left off."
      title="Welcome back"
    >
      <AuthForm mode="login" next={target} />
    </AuthLayout>
  );
}
