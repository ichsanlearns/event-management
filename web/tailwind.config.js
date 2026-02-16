/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: "#1152d4",
        background: {
          light: "#f6f6f8",
          dark: "#101622",
        },
        surface: {
          light: "#ffffff",
          dark: "#1e2736",
        },
        brand: {
          primary: "#5D5FEF",
          light: "#F9FAFB",
          sidebar: "#FFFFFF",
          activeBg: "#F3F4F6",
        },
      },

      fontFamily: {
        display: ["Plus Jakarta Sans", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        full: "9999px",
      },
    },
  },
  plugins: [],
};
