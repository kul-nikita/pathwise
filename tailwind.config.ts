import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "#d9dee8",
        canvas: "#f7f8fb",
        ink: "#111827",
        muted: "#5b6472",
        teal: {
          DEFAULT: "#0f766e",
          strong: "#0b5f59"
        }
      }
    }
  },
  plugins: []
};

export default config;
