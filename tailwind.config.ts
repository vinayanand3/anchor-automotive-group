import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sylva: {
          bg: "#2b2e27",
          deep: "#23261f",
          olive: "#383b34",
          light: "#4a4d44",
          surface: "rgba(34, 40, 31, 0.74)",
          ink: "#ffffff",
          "ink-soft": "rgba(255, 255, 255, 0.65)",
          "ink-faint": "rgba(255, 255, 255, 0.44)",
          rule: "rgba(255, 255, 255, 0.06)",
        },
        paper: {
          card: "#f2f3ef",
          surface: "#fbfcf8",
          ink: "#23261f",
          label: "#7c8177",
          muted: "#9da397",
        },
        accent: {
          pale: "#eef1e7",
          warm: "#d6ddd0",
          amber: "#e5b869",
          sage: "#9eb89a",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-lexend)",
          "Lexend",
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "Roboto",
          "sans-serif",
        ],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      boxShadow: {
        "paper-soft": "0 30px 70px rgba(16, 21, 13, 0.28)",
        "paper-hover": "0 38px 84px rgba(16, 21, 13, 0.36)",
        "dock-glow": "0 8px 22px rgba(10, 14, 8, 0.30)",
        "pill-near": "0 7px 16px rgba(10, 14, 8, 0.30)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.75rem",
      },
    },
  },
  plugins: [],
};
export default config;
