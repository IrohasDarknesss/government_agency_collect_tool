/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gov: {
          blue: {
            50: '#f0f5fa',
            100: '#e1ecf6',
            500: '#1d5a8e',
            600: '#154670',
            700: '#0f3252',
            800: '#0a233b',
            900: '#071829',
          },
          gold: {
            400: '#e6a119',
            500: '#cf8600',
            600: '#b06f00',
          },
          red: '#c53030',
          green: '#276749',
        }
      },
      fontFamily: {
        sans: [
          '"Hiragino Sans"',
          '"BIZ UDPGothic"',
          '"Meiryo"',
          'system-ui',
          '-apple-system',
          'sans-serif',
        ],
      }
    },
  },
  plugins: [],
}
