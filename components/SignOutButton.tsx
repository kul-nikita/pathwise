"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

/**
 * Until now `/api/auth/logout` existed with no caller anywhere in the UI, so a
 * signed-in learner had no way to sign out. `router.refresh()` after the POST
 * matters: without it the server components keep rendering the cached
 * signed-in shell even though the cookie is gone.
 */
export function SignOutButton({ className }: { className?: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function signOut() {
    setBusy(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/");
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <button className={className} disabled={busy} onClick={signOut} type="button">
      <LogOut aria-hidden="true" size={15} />
      {busy ? "Signing out…" : "Sign out"}
    </button>
  );
}
