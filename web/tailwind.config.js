/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: "#1152d4",
        "primary-hover": "#4338ca",
        "background-light": "#F3F4F6",
        "background-dark": "#111827",
        "surface-light": "#FFFFFF",
        "surface-dark": "#1F2937",
        "border-light": "#E5E7EB",
        "border-dark": "#374151",
        "text-light": "#111827",
        "text-dark": "#F9FAFB",
        "text-secondary-light": "#6B7280",
        "text-secondary-dark": "#9CA3AF",

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
