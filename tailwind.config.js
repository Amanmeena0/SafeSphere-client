import tailwindcssAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,tsx,ts}",
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius, 0.5rem)',
        md: 'calc(var(--radius, 0.5rem) - 2px)',
        sm: 'calc(var(--radius, 0.5rem) - 4px)',
        DEFAULT: "0.125rem",
        xl: "0.5rem",
        full: "0.75rem"
      },
      colors: {
        background: "var(--background)",
        "on-background": "var(--on-background)",
        primary: {
          DEFAULT: "var(--primary)",
          fixed: "var(--primary-fixed)",
          "on-fixed": "var(--on-primary-fixed)",
          container: "var(--primary-container)",
          "on-container": "var(--on-primary-container)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          fixed: "var(--secondary-fixed)",
          "on-fixed": "var(--on-secondary-fixed)",
          container: "var(--secondary-container)",
        },
        surface: {
          DEFAULT: "var(--surface)",
          "on": "var(--on-surface)",
          variant: "var(--surface-variant)",
          "on-variant": "var(--on-surface-variant)",
          "container-low": "var(--surface-container-low)",
          container: "var(--surface-container)",
          "container-high": "var(--surface-container-high)",
          "container-highest": "var(--surface-container-highest)",
          "container-lowest": "var(--surface-container-lowest)",
        },
        outline: {
          DEFAULT: "var(--outline)",
          variant: "var(--outline-variant)",
        },
        "on-surface": "var(--on-surface)",
        "on-surface-variant": "var(--on-surface-variant)",
        "primary-fixed": "var(--primary-fixed)",
        "on-primary-fixed": "var(--on-primary-fixed)",
        "primary-container": "var(--primary-container)",
        "secondary-fixed": "var(--secondary-fixed)",
        "outline-variant": "var(--outline-variant)",
        "surface-container-low": "var(--surface-container-low)",
        "surface-container": "var(--surface-container)",
        "surface-container-high": "var(--surface-container-high)",
        "surface-container-highest": "var(--surface-container-highest)",
        "surface-container-lowest": "var(--surface-container-lowest)",
        "on-primary": "var(--on-primary)",
        "on-secondary": "var(--on-secondary)",
      },
      spacing: {
        "margin-desktop": "64px",
        "stack-md": "16px",
        "container-max": "1280px",
        "gutter": "24px",
        "section-gap": "80px",
        "stack-sm": "8px",
        "stack-lg": "32px",
        "margin-mobile": "20px"
      },
      fontFamily: {
        "display-lg": ["Manrope", "sans-serif"],
        "body-lg": ["Inter", "sans-serif"],
        "headline-lg": ["Manrope", "sans-serif"],
        "title-md": ["Manrope", "sans-serif"],
        "label-sm": ["JetBrains Mono", "monospace"],
        "body-md": ["Inter", "sans-serif"]
      },
      fontSize: {
        "display-lg": ["48px", { lineHeight: "56px", letterSpacing: "-0.02em", fontWeight: "800" }],
        "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }],
        "headline-lg": ["32px", { lineHeight: "40px", fontWeight: "700" }],
        "title-md": ["20px", { lineHeight: "28px", fontWeight: "600" }],
        "label-sm": ["12px", { lineHeight: "16px", fontWeight: "500" }],
        "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }]
      }
    }
  },
  plugins: [tailwindcssAnimate],
}
