/**
 * Shared class strings rather than wrapper components.
 *
 * Buttons and cards appear in roughly twenty places across the app, so the
 * classes are worth naming once — but a `<Button>` component would add a layer
 * whose only job is to forward props to a `<button>`. Some of these render as
 * links and some as buttons, and a string works for both.
 */
const BUTTON_BASE =
  "inline-flex items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold " +
  "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal " +
  "focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:pointer-events-none " +
  "disabled:opacity-50";

export const button = {
  primary: `${BUTTON_BASE} h-10 bg-teal text-white shadow-sm hover:bg-teal-strong`,
  secondary: `${BUTTON_BASE} h-10 border border-border bg-white text-ink shadow-sm hover:border-teal hover:text-teal`,
  ghost: `${BUTTON_BASE} h-9 text-muted hover:bg-surface-sunken hover:text-ink`,
  danger: `${BUTTON_BASE} h-10 border border-red-200 bg-white text-red-700 shadow-sm hover:border-red-400 hover:bg-red-50`
};

export const card = "rounded-xl border border-border bg-white shadow-card";

export const input =
  "w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-ink shadow-inner-hairline " +
  "outline-none transition-colors placeholder:text-muted/70 focus:border-teal focus:ring-2 focus:ring-teal/20";

export const label = "mb-1 block text-xs font-medium uppercase tracking-wide text-muted";
