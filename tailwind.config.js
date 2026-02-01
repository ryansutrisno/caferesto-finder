/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    fontFamily: {
      sans: ["Open Sans", "sans-serif"],
      heading: ["Inter", "sans-serif"],
    },
    extend: {
      colors: {
        brown: {
          500: "#8B4513", // Warm Brown - Primary
          600: "#6F370F", // Darker shade for hover
          50: "#FDF8F6", // Lightest shade
        },
        cream: {
          100: "#F5E6D3", // Cream - Secondary
          200: "#EBDCC9",
        },
        orange: {
          500: "#FF6B35", // Accent Orange
          600: "#E55A2B", // Darker accent
        },
      },
    },
  },
  plugins: [],
};
