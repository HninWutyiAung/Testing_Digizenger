/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        background: 'var(--color-background)',
        darkBlue: 'var(--color-dark-blue)',
        textGrey: 'var(--color-text-grey)',
        accent: 'var(--color-accent)',
        lightAccent: 'var(--color-light-accent)',
        darkAccent: 'var(--color-dark-accent)',
        black: 'var(--color-black)',
      },
    },
  },

  plugins: [],
}

