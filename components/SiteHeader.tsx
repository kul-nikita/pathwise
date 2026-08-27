import Link from "next/link";
import { SignOutButton } from "@/components/SignOutButton";
import { button } from "@/lib/ui";
import type { User } from "@/lib/db/users";

const NAV = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/diagnostic", label: "Diagnostic" },
  { href: "/evidence", label: "Evidence" }
];

/**
 * One header for every page. Before this, only the landing page had any
 * navigation at all — an authenticated learner had no way back to the
 * dashboard, no link to their account, and no way to sign out.
 *
 * `current` drives aria-current for screen readers, not just the visual state.
 */
export function SiteHeader({
  user,
  current,
  showAdmin = false
}: {
  user?: Pick<User, "email"> | null;
  current?: string;
  showAdmin?: boolean;
}) {
  const links = showAdmin ? [...NAV, { href: "/admin", label: "Catalog" }] : NAV;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/85 backdrop-blur">
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-6"
      >
        <div className="flex items-center gap-6">
          <Link
            className="flex items-center gap-2 rounded-md text-lg font-semibold tracking-tight text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
            href={user ? "/dashboard" : "/"}
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

          {user ? (
            <ul className="hidden items-center gap-1 md:flex">
              {links.map((link) => {
                const active = current === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      aria-current={active ? "page" : undefined}
                      className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        active
                          ? "bg-teal-subtle text-teal-strong"
                          : "text-muted hover:bg-surface-sunken hover:text-ink"
                      }`}
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Link
                aria-current={current === "/account" ? "page" : undefined}
                className="hidden max-w-[16rem] truncate rounded-lg px-3 py-2 text-sm font-medium text-muted hover:bg-surface-sunken hover:text-ink sm:block"
                href="/account"
                title={user.email}
              >
                {user.email}
              </Link>
              <SignOutButton className={button.ghost} />
            </>
          ) : (
            <>
              <Link className={button.ghost} href="/login">
                Sign in
              </Link>
              <Link className={button.primary} href="/onboarding">
                Get started
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* The nav collapses on small screens; these keep it reachable there. */}
      {user ? (
        <ul className="flex items-center gap-1 overflow-x-auto border-t border-border px-4 py-2 md:hidden">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                aria-current={current === link.href ? "page" : undefined}
                className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium ${
                  current === link.href
                    ? "bg-teal-subtle text-teal-strong"
                    : "text-muted hover:text-ink"
                }`}
                href={link.href}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              className="whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium text-muted hover:text-ink"
              href="/account"
            >
              Account
            </Link>
          </li>
        </ul>
      ) : null}
    </header>
  );
}
