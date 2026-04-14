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
          50: "#fdf8f6",
          100: "#f2e8e5",
          200: "#eaddd7",
          300: "#e0cec7",
          400: "#d2bab0",
          500: "#bfa094",
          600: "#a18072",
          700: "#977669",
          800: "#846358",
          900: "#43302b",
        },
        sage: {
          50: "#f6f9f7",
          100: "#e3efe8",
          200: "#c7dfd1",
          300: "#a9cdb9",
          400: "#8bbca2",
          500: "#6da98a",
          600: "#4f8d6f",
          700: "#3d6f58",
          800: "#2f5745",
          900: "#1e3a2f",
        },
      },
    },
  },
  plugins: [],
}

