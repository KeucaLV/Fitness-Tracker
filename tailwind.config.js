/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',

  theme: {
    screens: {
      'tablet': '600px',
      // => @media (min-width: 320px) { ... }

      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
    extend: {
      colors: {
        'accent-green': '#C8FFA6',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      boxShadow: {
        'custom': 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
      },
      animation: {
        bubble: 'bubble 2s infinite ease-in-out',
      },
      keyframes: {
        bubble: {
          '0%': { boxShadow: '0 0 5px rgba(255, 255, 255, 0.5), 0 0 10px rgba(255, 255, 255, 0.4), 0 0 15px rgba(255, 255, 255, 0.3)' },
          '50%': { boxShadow: '0 -5px 10px rgba(255, 255, 255, 0.5), 0 -10px 20px rgba(255, 255, 255, 0.4), 0 -15px 30px rgba(255, 255, 255, 0.3)' },
          '100%': { boxShadow: '0 0 5px rgba(255, 255, 255, 0.5), 0 0 10px rgba(255, 255, 255, 0.4), 0 0 15px rgba(255, 255, 255, 0.3)' },
        },
        animation: {
          spin: 'spin 5s linear infinite',
        },
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],

}
