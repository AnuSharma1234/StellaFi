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
          border: '#38444D',
          success: '#00BA7C',
          danger: '#F91880',
          purple: '#7B61FF',
        }
      },
      fontFamily: {
        'twitter': ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif']
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-in': 'slideIn 0.4s ease-out',
        'pulse-gentle': 'pulse 3s infinite',
        'bounce-gentle': 'bounce 2s infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        }
      }
    },
  },
  plugins: [],
}
