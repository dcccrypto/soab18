/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6B00',
          50: '#FFF2E5',
          100: '#FFE5CC',
          200: '#FFCC99',
          300: '#FFB266',
          400: '#FF9933',
          500: '#FF6B00',
          600: '#CC5500',
          700: '#994000',
          800: '#662A00',
          900: '#331500'
        },
        background: {
          DEFAULT: '#000000',
          50: '#1A1A1A',
          100: '#262626',
          200: '#404040',
          300: '#595959',
          400: '#737373',
          500: '#8C8C8C',
          600: '#A6A6A6',
          700: '#BFBFBF',
          800: '#D9D9D9',
          900: '#F2F2F2'
        },
        accent: {
          DEFAULT: '#FFB266',
          light: '#FFD9B3',
          dark: '#FF8000'
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' }
        },
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        'flame': {
          '0%, 100%': {
            transform: 'scaleY(1)',
            opacity: '0.5'
          },
          '50%': {
            transform: 'scaleY(1.2)',
            opacity: '0.7'
          },
        }
      },
      animation: {
        shimmer: 'shimmer 8s linear infinite',
        pulse: 'pulse 2s ease-in-out infinite',
        float: 'float 3s ease-in-out infinite',
        'gradient-x': 'gradient-x 15s ease infinite',
        'flame-1': 'flame 2s ease-in-out infinite',
        'flame-2': 'flame 2.5s ease-in-out infinite',
        'flame-3': 'flame 3s ease-in-out infinite',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} 