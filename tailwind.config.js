/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  // overwriting tw default styles
  theme: {
    fontFamily: {
      sans: "Roboto Mono, monospace",
      // pizza: "Sans etc", to use it font-pizza
    },
    extend: {
      fontSize: {
        huge: ["80rem", { lineHeight: "1" }], //to use it text-huge
      },
      height: {
        screen: "100dvh", //dvh is dynamic view port height unit
      },
    },
  },
  plugins: [],
};
