/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-cyan': '#00ffc3',
        'neon-blue': '#0099ff',
        'neon-purple': '#8b5cf6',
        'neon-pink': '#ff00e0',
        'dark-800': '#1f2937',
        'dark-900': '#111827',
        'dark-950': '#0f0f23',
        'glass-light': 'rgba(255, 255, 255, 0.1)',
        'glass-dark': 'rgba(15, 15, 35, 0.3)',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
        'display': ['Space Grotesk', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(99, 102, 241, 0.6)' },
          '50%': { boxShadow: '0 0 25px rgba(139, 92, 246, 0.5)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(99, 102, 241, 0.6)',
        'glow-lg': '0 0 30px rgba(99, 102, 241, 0.8)',
        'neon': '0 0 20px rgba(0, 255, 195, 0.4)',
        'neon-lg': '0 0 30px rgba(0, 255, 195, 0.6)',
      },
    },
  },
  plugins: [],
}
