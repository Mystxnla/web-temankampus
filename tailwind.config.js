/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#FF2E93",
        "primary-hover": "#E6187F",
        "primary-container": "#FFD9E8",
        "secondary": "#712AE2",
        "secondary-hover": "#5E1DC6",
        "secondary-container": "#EADDFF",
        "surface": "#FDF7FF",
        "surface-container-low": "#F7F1FF",
        "surface-container": "#F3E8FF",
        "surface-container-high": "#EDE4FF",
        "surface-container-highest": "#E7DEFA",
        "brand-purple": "#8A4CFC",
        "dark": "#1D192C",
        "on-surface-variant": "#5A3F48",
        "border-light": "#EFE4FB",
        "border-purple": "#E2CEFD",
        "border-pink": "#FFD9E8",
        "tertiary": "#006577",
        "tertiary-container": "#008096"
      },
      fontFamily: {
        headline: ['Anton', 'sans-serif'],
        display: ['Anton', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'sans-serif']
      },
      boxShadow: {
        'pop': '4px 4px 0px #1D192C',
        'pop-lg': '6px 6px 0px #1D192C',
        'pop-pink': '0 8px 24px -4px rgba(255, 46, 147, 0.35)',
        'pop-purple': '0 8px 24px -4px rgba(113, 42, 226, 0.25)',
        'soft': '0 4px 20px -2px rgba(113, 42, 226, 0.08)'
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem'
      }
    },
  },
  plugins: [],
}
