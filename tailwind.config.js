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
        // Legacy Pop Lilac tokens (kept for compatibility)
        "primary": "#FF5A35",
        "primary-hover": "#E84420",
        "primary-container": "#FFE3D9",
        "secondary": "#5C92D1",
        "secondary-hover": "#4A7BBB",
        "secondary-container": "#D6E8FA",
        "surface": "#FFFDF9",
        "surface-container-low": "#FFF8F5",
        "surface-container": "#FFF3EE",
        "surface-container-high": "#FFE8DF",
        "surface-container-highest": "#FFD9CC",
        "brand-purple": "#987DC7",
        "dark": "#1A1A2E",
        "on-surface-variant": "#5A4F48",
        "border-light": "#F0E8E4",
        "border-purple": "#E8D9D0",
        "border-pink": "#FFD9CC",
        "tertiary": "#419F98",
        "tertiary-container": "#C7EDEB",

        // Headspace-Style Per-Screen Palette
        // Landing: Warm Apricot
        "screen-landing": "#FF9266",
        "screen-landing-light": "#FFBBA3",
        // Auth: Sandy Cream
        "screen-auth": "#F5DFCC",
        "screen-auth-light": "#FAF0E6",
        // Dashboard: Calm Sky Blue
        "screen-dashboard": "#5C92D1",
        "screen-dashboard-light": "#A8C8EE",
        // Tasks: Sunshine Ochre Yellow
        "screen-tasks": "#F7BF52",
        "screen-tasks-light": "#FCDDA0",
        // Mood: Sage Mint Green
        "screen-mood": "#6FB899",
        "screen-mood-light": "#AEDCC9",
        // Focus: Warm Peach Amber
        "screen-focus": "#F28E66",
        "screen-focus-light": "#F8BFA3",
        // Curhat: Lavender Lilac
        "screen-curhat": "#987DC7",
        "screen-curhat-light": "#C8B4E3",
        // Community: Ocean Teal
        "screen-community": "#419F98",
        "screen-community-light": "#86CCC8",
        // Premium: Midnight Indigo
        "screen-premium": "#4F4D82",
        "screen-premium-light": "#8B89BB",

        // Bobi mascot palette
        "bobi-cream": "#FFF1D0",
        "bobi-cheek": "#FFB8A0",
      },
      fontFamily: {
        headline: ['Nunito', 'Plus Jakarta Sans', 'sans-serif'],
        display: ['Nunito', 'Anton', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'sans-serif']
      },
      boxShadow: {
        'pop': '4px 4px 0px rgba(0,0,0,0.08)',
        'pop-lg': '6px 6px 0px rgba(0,0,0,0.08)',
        'card': '0 8px 32px -4px rgba(0,0,0,0.10)',
        'card-sm': '0 4px 16px -2px rgba(0,0,0,0.08)',
        'soft': '0 4px 20px -2px rgba(0,0,0,0.06)',
        'inner-soft': 'inset 0 2px 8px rgba(0,0,0,0.05)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'bounce-soft': 'bounce-soft 2s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 2.5s ease-in-out infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'bounce-soft': {
          '0%, 100%': { transform: 'translateY(-3px)' },
          '50%': { transform: 'translateY(3px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.75' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-5deg)' },
          '50%': { transform: 'rotate(5deg)' },
        }
      }
    },
  },
  plugins: [],
}
