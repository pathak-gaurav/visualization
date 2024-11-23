/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./src/**/*.{js,jsx,ts,tsx}'], // Ensure Tailwind scans all relevant files
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      borderColor: {
        border: '#ccc', // Define 'border-border' as a light gray color
      },
      backgroundColor: {
        background: '#f8f9fa', // Replace with your desired background color
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}