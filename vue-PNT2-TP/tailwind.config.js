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
    },
  },
  plugins: [],
};
