/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#222222',
        contrast: '#222222',

        custom: {
          white: '#fffcf9',
          black: '#273120',
          orange: '#fe670c',
          grey: '#d9d9d9',
          'darker-green': '#828770',
          'signature-green': '#acaea4',
          'placeholder-green': '#d9d9d9',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'BlinkMacSystemFont',
          'system-ui',
          'sans-serif',
        ],
        serif: ['Cantata One', '"IBMPlexSerif"', 'Palatino', 'ui-serif'],
        cantata: ['Cantata One'],
      },
      fontSize: {
        md: ['16px', '24px'],
      },
      gridTemplateRows: {
        8: 'repeat(8, minmax(0,1fr))',
      },
      gridRow: {
        'span-4': 'span 4 / span 4',
      },
      maxWidth: {
        '8xl': '1920px',
        wrapper: '1300px',
      },
      spacing: {
        'header-base': '64px',
        'header-md': '76px',
        'header-lg': '96px',

        'sidebar-phone': '70vw',
        'sidebar-tablet': '50vw',
        'sidebar-desktop': '35vw',
      },
      boxShadow: {
        border: 'inset 0px 0px 0px 1px rgb(var(--color-primary) / 0.08)',
        darkHeader: 'inset 0px -1px 0px 0px rgba(21, 21, 21, 0.4)',
        lightHeader: 'inset 0px -1px 0px 0px rgba(21, 21, 21, 0.05)',
      },
    },
  },
};
