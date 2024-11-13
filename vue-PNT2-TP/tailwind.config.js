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
        primaryDark: "#0056b3",
      },
      backgroundImage: {
        "hero-background":
          "linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(/public/library-book.svg)",
      },
      scale: {
        102: "1.02",
      },
    },
  },
  plugins: [],
};
