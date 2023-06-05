/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        pokedex: {
          50: "#fff1f2",
          100: "#ffdfe0",
          200: "#ffc5c8",
          300: "#ff9da1",
          400: "#ff646b",
          500: "#ff343d",
          600: "#ed151f",
          700: "#c80d15",
          800: "#a50f16",
          900: "#881419",
          950: "#4b0407",
        },
      },
      fontFamily: {
        Inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
