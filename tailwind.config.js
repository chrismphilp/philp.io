const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} \*/
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-source-code)', ...fontFamily.sans],
        serif: ['Times New Roman', 'Georgia', 'serif'],
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
            a: {
              color: '#2D2A24',
              '&:hover': {
                color: '#C84630',
                opacity: 1,
              },
            },
            h1: {
              fontWeight: '400',
              fontSize: '2.25em',
              letterSpacing: '0.05em',
            },
            h2: {
              fontWeight: '400',
              fontSize: '1.75em',
              letterSpacing: '0.05em',
            },
            h3: {
              fontWeight: '400',
              fontSize: '1.5em',
              letterSpacing: '0.05em',
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
