import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      // Dark palette, matched to the landing page and the auth screens.
      //
      // `body` was already #050714 with color-scheme:dark, but the signed-in
      // pages kept painting themselves light over it (bg-canvas #f6f8fb,
      // bg-white cards) - an unfinished migration rather than a deliberate
      // split. The token names are unchanged so every page follows without
      // touching its markup; only the values moved.
      colors: {
        border: "rgba(255, 255, 255, 0.10)",
        "border-strong": "rgba(255, 255, 255, 0.20)",
        canvas: "#050816",
        surface: { DEFAULT: "#0b1026", sunken: "#070b1c" },
        ink: "#f8fafc",
        muted: "#94a3b8",
        // Kept the `teal` name so ~60 existing usages keep working, but the
        // accent is now the landing page's cyan. Chosen dark enough to carry
        // white label text at AA rather than the neon used for glows.
        teal: {
          subtle: "rgba(34, 211, 238, 0.10)",
          soft: "rgba(34, 211, 238, 0.35)",
          DEFAULT: "#0e7490",
          strong: "#155e75"
        }
      },
      fontFamily: {
        // next/font sets these variables in app/layout.tsx and self-hosts the
        // files, so there is no request to Google at runtime.
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "ui-sans-serif", "sans-serif"]
      },
      // Shadows read as depth on a light page and as nothing on a dark one, so
      // these carry a hairline highlight instead of only a drop shadow.
      boxShadow: {
        card: "0 1px 2px rgba(0, 0, 0, 0.40), inset 0 1px 0 rgba(255, 255, 255, 0.04)",
        lift: "0 8px 24px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
        "inner-hairline": "inset 0 1px 0 rgba(255, 255, 255, 0.03)"
      }
    }
  },
  plugins: []
};

export default config;
