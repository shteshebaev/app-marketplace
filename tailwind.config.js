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
        // Apple iOS Blue
        primary: {
          DEFAULT: '#007AFF',
          50: '#E5F2FF',
          100: '#CCE5FF',
          200: '#99CBFF',
          300: '#66B2FF',
          400: '#3399FF',
          500: '#007AFF',
          600: '#0062CC',
          700: '#004999',
          800: '#003166',
          900: '#001833',
        },
        // Apple Gray Scale - Light
        apple: {
          gray1: '#8E8E93',
          gray2: '#AEAEB2',
          gray3: '#C7C7CC',
          gray4: '#D1D1D6',
          gray5: '#E5E5EA',
          gray6: '#F2F2F7',
        },
        // Apple Gray Scale - Dark
        'apple-dark': {
          gray1: '#8E8E93',
          gray2: '#636366',
          gray3: '#48484A',
          gray4: '#3A3A3C',
          gray5: '#2C2C2E',
          gray6: '#1C1C1E',
        },
        // Text colors - использовать CSS переменные для автопереключения
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          tertiary: 'var(--text-tertiary)',
        },
        // Background - использовать CSS переменные
        background: {
          DEFAULT: 'var(--bg-default)',
          card: 'var(--bg-card)',
          glass: 'var(--bg-glass)',
          elevated: 'var(--bg-elevated)',
        },
        // Surface colors for cards in dark mode
        surface: {
          DEFAULT: 'var(--surface-default)',
          elevated: 'var(--surface-elevated)',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'SF Pro Display',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
      },
      fontSize: {
        'h1': ['32px', { lineHeight: '1.3', fontWeight: '600' }],
        'h2': ['24px', { lineHeight: '1.35', fontWeight: '600' }],
        'h3': ['20px', { lineHeight: '1.4', fontWeight: '600' }],
        'body': ['16px', { lineHeight: '1.5', fontWeight: '400' }],
        'body-sm': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
        'caption': ['13px', { lineHeight: '1.4', fontWeight: '400' }],
        'caption-sm': ['12px', { lineHeight: '1.4', fontWeight: '400' }],
      },
      borderRadius: {
        'apple-sm': '10px',
        'apple': '14px',
        'apple-md': '18px',
        'apple-lg': '20px',
        'apple-xl': '24px',
      },
      boxShadow: {
        'apple-sm': '0 2px 8px var(--shadow-color, rgba(0, 0, 0, 0.04))',
        'apple': '0 4px 16px var(--shadow-color, rgba(0, 0, 0, 0.06))',
        'apple-md': '0 10px 30px var(--shadow-color, rgba(0, 0, 0, 0.05))',
        'apple-lg': '0 20px 40px var(--shadow-color, rgba(0, 0, 0, 0.08))',
        'apple-glow': '0 0 20px rgba(0, 122, 255, 0.3)',
        // Dark mode shadows with glow effect
        'apple-dark': '0 4px 16px rgba(0, 0, 0, 0.4)',
        'apple-dark-lg': '0 10px 30px rgba(0, 0, 0, 0.5)',
      },
      backdropBlur: {
        'apple': '20px',
      },
      transitionTimingFunction: {
        'apple': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },
      transitionDuration: {
        'apple': '300ms',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      maxWidth: {
        'content': '1280px',
      },
    },
  },
  plugins: [],
}
