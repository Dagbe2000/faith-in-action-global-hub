import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#2A9FD6',
          'blue-light': '#4BB8E8',
          'blue-dark': '#1A7DB0',
          'blue-50': '#EFF9FF',
          'blue-100': '#DBEFFE',
          orange: '#F97316',
          'orange-light': '#FB923C',
          'orange-dark': '#EA580C',
          'orange-50': '#FFF7ED',
          'orange-100': '#FFEDD5',
          navy: '#1E3A5F',
          'navy-light': '#2D4F7A',
          'navy-dark': '#132440',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        heading: ['var(--font-montserrat)', 'Montserrat', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #1E3A5F 0%, #2A9FD6 50%, #1A7DB0 100%)',
        'orange-gradient': 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
        'blue-gradient': 'linear-gradient(135deg, #2A9FD6 0%, #1E3A5F 100%)',
        'section-gradient': 'linear-gradient(180deg, #EFF9FF 0%, #FFFFFF 100%)',
      },
      boxShadow: {
        card: '0 4px 20px rgba(42, 159, 214, 0.12)',
        'card-hover': '0 8px 30px rgba(42, 159, 214, 0.25)',
        orange: '0 4px 20px rgba(249, 115, 22, 0.25)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config
