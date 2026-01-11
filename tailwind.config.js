/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ink-black': '#1a1a1a',
        'paper-beige': '#f5f5dc',
        'crimson-red': '#8b0000',
        'gold-accent': '#daa520',
      },
      fontFamily: {
        serif: ['"Noto Serif SC"', 'serif'],
      },
    },
  },
  plugins: [],
}
