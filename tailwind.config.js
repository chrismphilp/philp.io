const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-professional)', ...fontFamily.sans],
        serif: ['var(--font-professional)', 'Times New Roman', 'Georgia', 'serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#2D2A24', // Japanese charcoal
          light: '#504A40',   // Lighter charcoal
        },
        secondary: {
          DEFAULT: '#5D5D5D',
          light: '#8A8A8A',
        },
        background: {
          DEFAULT: '#FBFAF2', // Off-white, washi paper
          dark: '#F0EFE7',    // Slightly darker off-white
        },
        accent: {
          DEFAULT: '#BFB0A3', // Taupe
          subtle: '#D9D0C7',  // Lighter taupe
          dark: '#8C7B6B',    // Darker taupe
          highlight: '#C84630', // Vermilion, traditional Japanese accent
        }
      },
      spacing: {
        '128': '32rem',
      },
      boxShadow: {
        'washi': '0 2px 15px rgba(0, 0, 0, 0.03)',
      },
      borderWidth: {
        'thin': '0.5px',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: '#2D2A24',
            fontWeight: '300',
            lineHeight: '1.8',
            letterSpacing: '0.04em',
            fontSize: '1.05rem',
            color: 'rgba(45, 42, 36, 0.9)',
            a: {
              color: '#2D2A24',
              '&:hover': {
                color: '#C84630',
                opacity: 1,
              },
            },
            h1: {
              fontWeight: '300',
              fontSize: '2.5em',
              lineHeight: '1.2',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            },
            h2: {
              fontWeight: '300',
              fontSize: '2em',
              lineHeight: '1.2',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            },
            h3: {
              fontWeight: '300',
              fontSize: '1.5em',
              lineHeight: '1.2',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            },
            pre: {
              padding: '1.5rem',
              borderRadius: '0.25rem',
              fontSize: '0.85rem',
              lineHeight: '1.7',
            },
            code: {
              fontWeight: '300',
              fontSize: '0.9em',
              backgroundColor: 'rgba(191, 176, 163, 0.15)',
              padding: '0.2em 0.4em',
              borderRadius: '0.2rem',
            },
          },
        },
        lg: {
          css: {
            maxWidth: '75ch',
          },
        },
        xl: {
          css: {
            maxWidth: '85ch',
          },
        },
      },
    },
  },
  variants: {
    typography: ['dark'],
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
