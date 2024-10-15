/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      ivory: '#F0EFEB',
      teal: '#17282b',
      white: '#ffffff',
      black: '#000000',
      gray: {
        50: 'f3f4f6',
        100: '#f7fafc',
        200: '#edf2f7',
        300: '#e2e8f0',
        400: '#cbd5e0',
        500: '#a0aec0',
        600: '#718096',
        700: '#4a5568',
        800: '#2d3748',
        900: '#111827'
      },
      green: {
        700: '#2b6a4e',
        600: '#2c7a7b',
      },
      red:{
        500: '#e53e3e',
      },
      blue: {
        500: '#3182ce',
      }
    },
    extend: {},
  },
  plugins: [],
}
