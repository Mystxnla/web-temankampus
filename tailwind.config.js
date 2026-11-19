/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm Oat & Eucalyptus Neutral Ramp (low-glare, soothing for reading)
        paper: {
          DEFAULT: "#F6F5F0",
          sidebar: "#EFEFE8",
          card: "#FCFBF8",
          raised: "#EAEBE3",
          hover: "#E2E4DA",
        },
        // Soft sage sanctuary tint for calming moments (Mimi AI, counseling, breathing)
        calm: {
          surface: "#E8F0EC",
          border: "rgba(53, 104, 84, 0.16)",
        },
        // Warm pine-charcoal ink (softer than harsh pure black)
        ink: {
          DEFAULT: "#222926",
          secondary: "#525D58",
          muted: "#707B76",
        },
        line: {
          DEFAULT: "rgba(34, 41, 38, 0.08)",
          strong: "rgba(34, 41, 38, 0.15)",
        },
        // Single Soothing Brand Accent (Deep Sage / Eucalyptus)
        accent: {
          DEFAULT: "#356854",
          hover: "#295342",
          soft: "rgba(53, 104, 84, 0.09)",
        },
        // Toned Semantic Colors (gentle, never alarming)
        semantic: {
          positive: "#2E7D5B",
          "positive-soft": "rgba(46, 125, 91, 0.10)",
          warning: "#9C6624",
          "warning-soft": "rgba(156, 102, 36, 0.10)",
          danger: "#B34A3C",
          "danger-soft": "rgba(179, 74, 60, 0.09)",
          info: "#3B6C8C",
          "info-soft": "rgba(59, 108, 140, 0.09)",
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "system-ui", "-apple-system", "sans-serif"],
        serif: ['"Newsreader"', "Georgia", "serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        subtle: "0 1px 2px rgba(34, 41, 38, 0.04)",
        float: "0 10px 28px rgba(34, 41, 38, 0.07)",
      },
      transitionTimingFunction: {
        unslop: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
