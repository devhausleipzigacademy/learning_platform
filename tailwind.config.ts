import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    colors: {
      black: '#000000',
      white: '#ffffff',
      danger: '#eb3011',
      warning: '#dece22',
      success: '#23a76b',
      dark: '#251a25',
      light: '#e5e5e6'
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [
    require('tailwindcss-themer')({
      themes: [
        {
          name: 'light',
          extend: {
            colors: {
              primary: '#6d5685',
              secondary: '#6b58a3',
              accent1: '#17164d',
              accent2: '#2f3275',
              accent3: '#434d9c',
              info: '#853818'
            }
          }
        },
        {
          name: 'dark',
          extend: {
            colors: {
              primary: '#C2B7C9',
              secondary: '#C9B8E6',
              accent1: '#5F5494',
              accent2: '#7F8ABA',
              accent3: '#9EAFDE',
              info: '#C78D5D'
            }
          }
        }
      ]
    }),
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries'),
    require('tailwindcss-animate'),
    require('tailwindcss-hero-patterns'),
    require('tailwindcss-debug-screens')
  ]
} satisfies Config;

export default config;
