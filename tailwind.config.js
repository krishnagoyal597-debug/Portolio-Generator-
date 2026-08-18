/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        indigo: {
          50: '#eef2ff', 100: '#e0e7ff', 200: '#c7d2fe', 300: '#a5b4fc',
          400: '#818cf8', 500: '#6366f1', 600: '#4f46e5', 700: '#4338ca',
          800: '#3730a3', 900: '#312e81', 950: '#1e1b4b',
        },
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)',
        'elevated': '0 20px 60px rgba(0,0,0,0.08)',
      },
      keyframes: {
        'fade-in': { from: { opacity: '0', transform: 'translateY(8px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        'slide-up': { from: { opacity: '0', transform: 'translateY(12px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        'spin-slow': { from: { transform: 'rotate(0deg)' }, to: { transform: 'rotate(360deg)' } },
        'pulse-glow': { '0%,100%': { boxShadow: '0 0 0 0 rgba(99,102,241,0.3)' }, '50%': { boxShadow: '0 0 0 8px rgba(99,102,241,0)' } },
        blink: { '0%,100%': { opacity: '1' }, '50%': { opacity: '0' } },
        'loading-dot': { '0%,80%,100%': { opacity: '0', transform: 'scale(0.8)' }, '40%': { opacity: '1', transform: 'scale(1)' } },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-up': 'slide-up 0.25s ease-out',
        'spin-slow': 'spin-slow 3s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        blink: 'blink 1s step-end infinite',
        'loading-dot': 'loading-dot 1.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
