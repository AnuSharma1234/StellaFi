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
          // Standardized darker gray palette for consistency
          muted: '#71767B',      // Primary muted text color (darker)
          subtle: '#5B6570',     // Secondary muted text color (darker)
          disabled: '#495057',   // Disabled text color (darker)
          postBg: '#181A1E',     // Center feed post background color
        }
      },
      fontFamily: {
        'heading': ['Poppins', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        'body': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        'twitter': ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Inter', 'Helvetica Neue', 'Arial', 'sans-serif']
      },
      fontSize: {
        'xs': ['0.8rem', { lineHeight: '1.4', letterSpacing: '0' }],
        'sm': ['0.95rem', { lineHeight: '1.4', letterSpacing: '-0.01em' }],
        'base': ['1.05rem', { lineHeight: '1.6', letterSpacing: '-0.01em' }],
        'lg': ['1.2rem', { lineHeight: '1.5', letterSpacing: '-0.02em' }],
        'xl': ['1.35rem', { lineHeight: '1.4', letterSpacing: '-0.02em' }],
        '2xl': ['1.6rem', { lineHeight: '1.3', letterSpacing: '-0.03em' }],
        '3xl': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.03em' }],
        '4xl': ['2.4rem', { lineHeight: '1.1', letterSpacing: '-0.04em' }],
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
