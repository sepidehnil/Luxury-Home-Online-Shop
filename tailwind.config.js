/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        primary: "IRANyekan",
        secondary: "IRANyekanbold",
        third: "IRANyekanmedium",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
