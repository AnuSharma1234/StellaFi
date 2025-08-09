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
        twitter: {
          blue: '#1DA1F2',
          darkBlue: '#1A91DA',
          black: '#14171A',
          darkGray: '#657786',
          lightGray: '#AAB8C2',
          extraLightGray: '#E1E8ED',
          white: '#FFFFFF',
          background: '#15202B',
          darker: '#192734',
          surface: '#1E2732',
          border: '#38444D', // A slightly lighter border for better visibility
          success: '#00BA7C',
          // --- ADDED THESE TWO COLORS ---
          danger: '#F91880', // For likes
          purple: '#7B61FF', // For NFTs
        }
      },
      fontFamily: {
        'twitter': ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif']
      }
    },
  },
  plugins: [],
}
