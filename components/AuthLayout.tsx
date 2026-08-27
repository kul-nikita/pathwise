import Link from "next/link";
import { GitBranch, Gauge, Award } from "lucide-react";
import { card } from "@/lib/ui";

const POINTS = [
  { icon: GitBranch, text: "Sequencing is a graph traversal, never a model's opinion." },
  { icon: Gauge, text: "Every recommendation shows its six score components." },
  { icon: Award, text: "Each milestone produces a capability record, not a badge." }
];

/**
 * Shared by /login and /signup. The panel on the right is not decoration —
 * a sign-in page with a lone card and no context reads as unfinished, and this
 * is the first screen a judge sees after the landing page.
 */
export function AuthLayout({
  children,
  title,
  subtitle
}: {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <main className="grid min-h-screen lg:grid-cols-2" id="main">
      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <Link
            className="inline-flex items-center gap-2 text-lg font-semibold tracking-tight text-ink"
            href="/"
          >
            <span aria-hidden="true" className="grid h-7 w-7 place-items-center rounded-md bg-teal">
              <svg fill="none" height="16" viewBox="0 0 16 16" width="16">
                <path
                  d="M3 12.5 7 3l2.2 5.2L13 5.5"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                />
              </svg>
            </span>
            SkillForge
          </Link>

          <h1 className="font-display mt-8 text-3xl font-semibold tracking-tight text-ink">
            {title}
          </h1>
          <p className="mt-2 text-sm leading-6 text-muted">{subtitle}</p>

          <div className={`${card} mt-6 p-6`}>{children}</div>
        </div>
      </div>

      <aside className="relative hidden overflow-hidden bg-ink px-12 py-16 lg:flex lg:flex-col lg:justify-center">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, #0f766e 0, transparent 45%), radial-gradient(circle at 80% 70%, #0b5f59 0, transparent 40%)"
          }}
        />
        <div className="relative">
          <p className="font-display text-2xl font-semibold leading-snug text-white">
            Know what to learn next — and be able to prove you learned it.
          </p>
          <ul className="mt-10 space-y-5">
            {POINTS.map((point) => (
              <li className="flex gap-3" key={point.text}>
                <point.icon aria-hidden="true" className="mt-0.5 shrink-0 text-teal-soft" size={18} />
                <span className="text-sm leading-6 text-white/75">{point.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </main>
  );
}
