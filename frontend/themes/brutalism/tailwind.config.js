/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brutal: {
          yellow: '#FFE600',
          cream: '#FFFDF0',
          cyan: '#00F0FF',
          pink: '#FF597B',
          orange: '#FF9F29',
          purple: '#9D4EDD',
          lime: '#CCFF00',
          black: '#000000',
          white: '#FFFFFF',
          dark: '#121212'
        }
      },
      boxShadow: {
        'brutal-sm': '3px 3px 0px #000000',
        'brutal': '5px 5px 0px #000000',
        'brutal-lg': '8px 8px 0px #000000',
        'brutal-xl': '12px 12px 0px #000000',
        'brutal-cyan': '6px 6px 0px #00F0FF',
        'brutal-pink': '6px 6px 0px #FF597B',
        'brutal-yellow': '6px 6px 0px #FFE600',
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}
