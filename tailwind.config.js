/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", 
  content: [
    "./src/**/*.{html,js,svelte,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6AE75D",
        secondary: "var(--secondary-color)",
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        surfaceAlt: "var(--color-surface-alt)",
        accent: "var(--color-accent)",
        text: "var(--color-text)",
        active: "[#6AE75D]",
        inactive: "var(--color-inactive)",
        hyperlink: "var(--color-hyperlink)",
      }
    }
  },
  plugins: []
}
