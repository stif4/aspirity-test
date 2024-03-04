/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'my-color-geen': '#86ff4b',
        'my-color-secondary': '#68c8ff'
      },
      screens: {
        'my-mobile': '400px',
        'my-mobile-2': '470px',
        'my-mobile-3': '650px',
        'my-big-screen': '1850px',
        'my-medium-screen': '1600px'
      }
    }
  },
  plugins: []
};
