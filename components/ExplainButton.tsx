"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";

export function ExplainButton({ resourceId, skillId }: { resourceId: string; skillId: string }) {
  const [text, setText] = useState<string | null>(null);
  const [source, setSource] = useState<"llm" | "fallback" | null>(null);
  const [busy, setBusy] = useState(false);

  async function explain() {
    setBusy(true);

    try {
      const res = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resourceId, skillId })
      });
      const data = await res.json();
      setText(res.ok ? data.text : (data.error ?? "Could not generate an explanation."));
      setSource(res.ok ? data.source : null);
    } catch {
      setText("Could not reach the server.");
      setSource(null);
    } finally {
      setBusy(false);
    }
  }

  if (text) {
    return (
      <div className="mt-3 rounded-md border border-border bg-canvas p-3">
        <p className="text-sm leading-6 text-ink">{text}</p>
        {/* Say plainly who wrote this — the fallback is deterministic text. */}
        <p className="mt-2 text-xs text-muted">
          {source === "llm"
            ? "Written by the model from verified catalog facts only."
            : "Generated from catalog data (no model output used)."}
        </p>
      </div>
    );
  }

  return (
    <button
      className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-teal hover:underline disabled:opacity-50"
      disabled={busy}
      onClick={explain}
      type="button"
    >
      <Sparkles aria-hidden="true" size={14} />
      {busy ? "Writing…" : "Explain this in plain English"}
    </button>
  );
}
