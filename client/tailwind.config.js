/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        warm: {
          50: "rgb(var(--warm-50))",
          100: "rgb(var(--warm-100))",
          200: "rgb(var(--warm-200))",
          300: "rgb(var(--warm-300))",
          400: "rgb(var(--warm-400))",
          500: "rgb(var(--warm-500))",
          600: "rgb(var(--warm-600))",
          700: "rgb(var(--warm-700))",
          800: "rgb(var(--warm-800))",
          900: "rgb(var(--warm-900))",
        },
        sage: {
          50: "rgb(var(--sage-50))",
          100: "rgb(var(--sage-100))",
          200: "rgb(var(--sage-200))",
          300: "rgb(var(--sage-300))",
          400: "rgb(var(--sage-400))",
          500: "rgb(var(--sage-500))",
          600: "rgb(var(--sage-600))",
          700: "rgb(var(--sage-700))",
          800: "rgb(var(--sage-800))",
          900: "rgb(var(--sage-900))",
        },
      },
    },
  },
  plugins: [],
}

