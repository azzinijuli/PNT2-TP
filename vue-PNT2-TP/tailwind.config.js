/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#02315E",
        secondary: "#00457E",
        tertiary: "#2F70AF",
        accent1: "#B9848C",
        accent2: "#806491",
      },
      backgroundImage: {
        "hero-background":
          "url(/public/library-book.svg), linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(22, 43, 76, 0.4))",
      },
    },
  },
  plugins: [],
};
