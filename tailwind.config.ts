import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "#e2e6ee",
        "border-strong": "#cbd2e0",
        canvas: "#f6f8fb",
        surface: { DEFAULT: "#ffffff", sunken: "#f1f4f9" },
        ink: "#0f1729",
        muted: "#5b6577",
        teal: {
          subtle: "#eefaf7",
          soft: "#a7ded4",
          DEFAULT: "#0f766e",
          strong: "#0b5f59"
        }
      },
      fontFamily: {
        // next/font sets these variables in app/layout.tsx and self-hosts the
        // files, so there is no request to Google at runtime.
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "ui-sans-serif", "sans-serif"]
      },
      boxShadow: {
        card: "0 1px 2px rgba(15, 23, 41, 0.04), 0 1px 3px rgba(15, 23, 41, 0.06)",
        lift: "0 4px 12px rgba(15, 23, 41, 0.08), 0 2px 4px rgba(15, 23, 41, 0.04)",
        "inner-hairline": "inset 0 1px 1px rgba(15, 23, 41, 0.03)"
      }
    }
  },
  plugins: []
};

export default config;
