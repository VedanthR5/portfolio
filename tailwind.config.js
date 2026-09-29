/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#050816",
        secondary: "#aaa6c3",
        tertiary: "#151030",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
        // Hero tokens. They were referenced since b273d62 but never defined,
        // so the hero's muted tiers and scroll cue rendered white or invisible.
        "vr-text-primary": "#eeedf6",
        "vr-text-secondary": "#b9b5cd",
        "vr-text-muted": "#8f8aa8",
        "vr-accent": "#915EFF",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        mono: ["Space Mono", "Courier New", "monospace"],
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg.png')",
      },
    },
  },
  plugins: [],
};
