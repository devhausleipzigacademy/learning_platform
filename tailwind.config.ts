import type { Config } from "tailwindcss";

import plugin from "tailwindcss/plugin";

const config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    nightwind: {
      typography: true,
      colorClasses: [
        "gradient",
        "ring",
        "ring-offset",
        "divide",
        "placeholder",
      ],
    },
    variants: {
      nightwind: ["group-hover", "active", "focus"],
    },
    colors: {
      black: {
        "500": "#000000",
      },
      white: {
        "500": "#ffffff",
      },
      danger: {
        "500": "#eb3011",
      },
      warning: {
        "500": "#dece22",
      },
      success: {
        "500": "#23a76b",
      },
      dark: {
        "500": "#251a25",
      },
      light: {
        "500": "#e5e5e6",
      },
      primary: {
        "400": "#C2B7C9",
        "600": "#907DA1",
      },
      secondary: {
        "400": "#C9B8E6",
        "600": "#9280C4",
      },
      accent1: {
        "400": "#5F5494",
        "600": "#21205C",
      },
      accent2: {
        "400": "#7F8ABA",
        "600": "#464A8F",
      },
      accent3: {
        "400": "#9EAFDE",
        "600": "#626EBD",
      },
      info: {
        "400": "#C78D5D",
        "600": "#9E4C23",
      },
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/container-queries"),
    require("tailwindcss-animate"),
    require("tailwindcss-elevation"),
    require("tailwindcss-hero-patterns"),
    require("tailwindcss-debug-screens"),
    require("nightwind"),
  ],
} satisfies Config;

export default config;
