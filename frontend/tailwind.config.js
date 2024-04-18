/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm//*.js'
  ],
  theme: {
    extend: {
      fontFamily: {
        Montserrat: "Montserrat",
      },
    },
    colors: {
      fbblue: '#1877F2',
      accept: '#2f667f',
      details: '#c2c2c2',
      violet: 'rgb(56 189 248)'
    }
  },
  plugins: [require('tailwindcss-animate'),require('flowbite/plugin'),require('tailwind-scrollbar')]
}

