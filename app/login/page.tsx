import { AuthForm } from "@/components/AuthForm";
import { AuthLayout } from "@/components/AuthLayout";

export const metadata = {
  title: "Sign in"
};

export default async function LoginPage({
  searchParams
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  const target =
    next?.startsWith("/") && !next.startsWith("//")
      ? next
      : "/dashboard";

  return (
    <AuthLayout
      title="Welcome back."
      subtitle="Pick up your learning path where you left off."
    >
      <AuthForm
        mode="login"
        next={target}
      />
    </AuthLayout>
  );
}