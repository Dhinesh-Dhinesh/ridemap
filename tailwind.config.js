/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors:{
        "backgroundprimary": "#18202c",
        "themeprimary": "#AEF359",
        "overlayprimary": "#1f2937",
      }
    },
  },
  plugins: [],
}