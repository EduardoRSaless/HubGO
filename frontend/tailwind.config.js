/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Habilita o modo escuro via classe 'dark'
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        primaryHover: "var(--color-primary-hover)",

        background: "var(--color-background)",
        surface: "var(--color-surface)",
        surfaceLight: "var(--color-surface-light)",

        border: "var(--color-border)",

        textPrimary: "var(--color-text-primary)",
        textSecondary: "var(--color-text-secondary)",

        success: "var(--color-success)",
        danger: "var(--color-danger)",
        warning: "var(--color-warning)"
      }
    },
  },
  plugins: [],
}
