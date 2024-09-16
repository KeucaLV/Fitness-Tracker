/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    screens: {
      'tablet': '320px',
      // => @media (min-width: 320px) { ... }

      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1180px',
      // => @media (min-width: 1280px) { ... }
    },
    extend: {
      boxShadow: {
        'custom': 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
      },
    },
  },
  plugins: [],
}
