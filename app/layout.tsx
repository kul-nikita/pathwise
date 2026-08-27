import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";

// Self-hosted at build time by next/font, so there is no runtime request to
// Google and no layout shift while the face loads.
const sans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans"
});

const display = Fraunces({
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "700"],
  variable: "--font-display"
});

export const metadata: Metadata = {
  title: {
    default: "SkillForge AI",
    template: "%s · SkillForge"
  },
  description: "Explainable, prerequisite-aware learning paths with portfolio evidence."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${sans.variable} ${display.variable}`} lang="en">
      <body className="font-sans antialiased">
        {/* Keyboard users should be able to jump the nav on every page. */}
        <a
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-teal focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
          href="#main"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
