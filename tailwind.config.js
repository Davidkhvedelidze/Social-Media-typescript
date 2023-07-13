/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FA6163",
        secondary: {
          100: "#E2E2D5",
          200: "#888883",
        },
        height: {
          100: "100px",
        },
        colors: {
          "custom-color": "#CFCFCF",
        },
      },
      fontFamily: {
        body: ["Josefin"],
      },
    },
  },
  plugins: [],
};
