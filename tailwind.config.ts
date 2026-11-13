import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#90643D",
          light: "#A77B52",
          dark: "#754F2E",
          antique: "#90643D",
        },
        burgundy: {
          DEFAULT: "#6B292D",
          light: "#82363B",
          dark: "#521F22",
        },
        ivory: {
          DEFAULT: "#F4EDE2",
          warm: "#F4EDE2",
          light: "#FAF7F2",
          dark: "#EADCCB",
        },
        cream: "#FAF7F2",
        emerald: {
          deep: "#263B32",
          DEFAULT: "#263B32",
          light: "#334E43",
          dark: "#1B2A24",
        },
        charcoal: {
          DEFAULT: "#282522",
          dark: "#282522",
          light: "#3A3632",
          muted: "#4A4541",
        },
        taupe: {
          DEFAULT: "#806B56",
          muted: "#806B56",
          light: "#9A836D",
          dark: "#665443",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        royale: "0 1px 3px rgba(40, 37, 34, 0.06), 0 8px 24px rgba(40, 37, 34, 0.05)",
        luxury: "0 12px 32px -8px rgba(40, 37, 34, 0.1)",
      },
    },
  },
  plugins: [],
};

export default config;
