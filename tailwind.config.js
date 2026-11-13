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
        // ── Figma Design Tokens ──────────────────────────
        // Backgrounds
        "paper":        "#C8BA96",   // halaman utama
        "paper-warm":   "#DDD0A8",   // card surface
        "paper-gold":   "#C8BA96",   // heading box / tape bg
        "paper-dark":   "#342B27",   // shadow layer luar card

        // Text
        "ink":          "#1A1208",   // body text
        "ink-navy":     "#1F3A7A",   // label / patrick hand text
        "ink-dark":     "#342B27",   // border gelap
        "ink-brown":    "#5C4A3A",   // border card

        // Accents
        "red-heading":  "#8B0A0A",   // heading merah (PROBLEM, CHANNELS, dll)
        "blue-heading": "#4A8DB7",   // heading biru (SOLUTION, KEY METRICS, dll)
        "blue-dark":    "#2F6C93",   // biru tua untuk bintang/dekorasi
        "tape-pink":    "#F6D0D6",   // selotip dekoratif

        // Bobi mascot palette (keep)
        "bobi-cream":   "#FFF1D0",
        "bobi-cheek":   "#FFB8A0",
      },
      fontFamily: {
        // Anton: semua heading besar
        display:  ['Anton', 'sans-serif'],
        headline: ['Anton', 'sans-serif'],
        // Nunito 800: body & list items
        sans:     ['Nunito', 'Plus Jakarta Sans', 'sans-serif'],
        // Patrick Hand: label/subtitle handwritten
        hand:     ['"Patrick Hand"', 'cursive'],
      },
      boxShadow: {
        // Card signature: double outline + drop
        'figma-card': '0 0 0 12px #F7F0DA, 0 0 0 16px #342B27, 0 6px 0 16px rgba(0,0,0,0.12)',
        // Heading box
        'figma-heading': '0 0 0 3px #342B27, 0 7px 0 3px rgba(0,0,0,0.12)',
        // Soft card
        'card':     '0 8px 32px -4px rgba(52,43,39,0.10)',
        'card-sm':  '0 4px 16px -2px rgba(52,43,39,0.08)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      animation: {
        'float':       'float 3s ease-in-out infinite',
        'bounce-soft': 'bounce-soft 2s ease-in-out infinite',
        'wiggle':      'wiggle 1s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        'bounce-soft': {
          '0%, 100%': { transform: 'translateY(-3px)' },
          '50%':      { transform: 'translateY(3px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-5deg)' },
          '50%':      { transform: 'rotate(5deg)' },
        },
      },
    },
  },
  plugins: [],
}
