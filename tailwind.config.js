/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        oat: "#FBF9F5",   // page background
        linen: "#F3EEE6",
        beige: "#E7DDCE",
        diary: "#F2E8DA", // reflection page
        tape: "#E3D6C1",
        sage: "#8E9A7B",
        olive: "#5F6A4E",
        mist: "#8A8378",  // secondary text
        smoke: "#2C2C2C", // primary text, never pure black
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', "Georgia", '"Times New Roman"', "serif"],
        sans: ['"Jost"', "system-ui", "-apple-system", '"Segoe UI"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
