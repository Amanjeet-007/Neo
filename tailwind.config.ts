import type { Config } from "tailwindcss";

// Colors come from CSS variables in app/globals.css so light/dark share one set of classes.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        line: "var(--line)",
        accent: "var(--accent)",
        "accent-ink": "var(--accent-ink)",
      },
      fontFamily: {
        sans: ["var(--font-sans, system-ui)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono, ui-monospace)", "ui-monospace", "monospace"],
      },
      borderRadius: { DEFAULT: "6px" },
    },
  },
  plugins: [],
};
export default config;
