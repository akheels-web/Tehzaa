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
        /* Deccani Editorial Luxury Palette */
        alabaster: {
          DEFAULT: "#F9F6F1",
          warm: "#F5F1EA",
        },
        silk: "#FFFFFF",
        limestone: {
          DEFAULT: "#EFE9DF",
          dark: "#E2DAD0",
        },
        obsidian: {
          DEFAULT: "#12100E",
          elevated: "#1A1715",
          muted: "#26211D",
          line: "#2E2823",
        },
        brass: {
          DEFAULT: "#A27B43",
          light: "#C7A36B",
          dark: "#7A5929",
          pale: "#E8DCCB",
        },
        garnet: {
          DEFAULT: "#5C1F24",
          light: "#7A2D34",
          dark: "#421519",
        },
        ink: {
          DEFAULT: "#161412",
          muted: "#4A453F",
          subtle: "#6E675F",
          light: "#F5F1EA",
          lightMuted: "#BEB6AA",
        },
        "stone-line": "#E2DAD0",

        /* Compatibility aliases mapped to Deccani Editorial Luxury */
        champagne: {
          DEFAULT: "#A27B43",
          light: "#C7A36B",
          dark: "#7A5929",
        },
        gold: {
          DEFAULT: "#A27B43",
          light: "#C7A36B",
          dark: "#7A5929",
          antique: "#7A5929",
        },
        ivory: {
          DEFAULT: "#F9F6F1",
          warm: "#F9F6F1",
          light: "#FFFFFF",
          dark: "#EFE9DF",
        },
        cream: "#F9F6F1",
        burgundy: {
          DEFAULT: "#5C1F24",
          light: "#7A2D34",
          dark: "#421519",
        },
        charcoal: {
          DEFAULT: "#161412",
          dark: "#12100E",
          light: "#26211D",
          muted: "#4A453F",
        },
        taupe: {
          DEFAULT: "#6E675F",
          muted: "#6E675F",
          light: "#9B9388",
          dark: "#4A453F",
        },
        sandstone: {
          DEFAULT: "#EFE9DF",
          light: "#F9F6F1",
          dark: "#E2DAD0",
        },
        saffron: {
          DEFAULT: "#A27B43",
          light: "#C7A36B",
          dark: "#7A5929",
        },
        copper: {
          DEFAULT: "#A27B43",
          light: "#C7A36B",
          dark: "#7A5929",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        serif: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        /* Legacy fallback mapped cleanly to editorial serif (zero cursive) */
        script: ["var(--font-display)", "Georgia", "serif"],
      },
      boxShadow: {
        gallery: "0 1px 2px rgba(18, 16, 14, 0.04), 0 12px 32px -8px rgba(18, 16, 14, 0.06)",
        obsidian: "0 20px 48px -12px rgba(18, 16, 14, 0.45)",
        royale: "0 1px 2px rgba(18, 16, 14, 0.04), 0 12px 32px -8px rgba(18, 16, 14, 0.06)",
        luxury: "0 16px 40px -12px rgba(18, 16, 14, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
