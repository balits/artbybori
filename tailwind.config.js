/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: "480px",
      },
      colors: {
        primary: '#222222',
        contrast: '#222222',

        custom: {
          white: 'var(--custom-white)',
          black: 'var(--custom-black)',
          orange: '#fe670c',
          grey: '#374151',
          lightgrey: '#6b7280',
          'darker-green': '#828770',
          'signature-green': 'var(--custom-signature)',
          'placeholder-green': 'var(--custom-placeholder)',
          'brighter-green': ' #B2BEB5'
        },
      },
      fontFamily: {
        sans: [
          'Inter var',
          'ui-sans-serif',
          'BlinkMacSystemFont',
          'Helvetica Neue',
          'system-ui',
          'sans-serif',
        ],
        cantata: ['"Cantata One"', "Georgia", "Times", "serif"],
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
        'header-base': 'var(--header-base)',
        'header-md': 'var(--header-md)',
        'header-lg': 'var(--header-lg)',

        'sidebar-tablet': '50vw',
        'sidebar-desktop': '35vw',

        'carousel-item-sm': '18rem',
        'carousel-item-md': '21rem',
        'carousel-item-lg': '25rem',
        'carousel-item-xl': '28rem',
      },
      boxShadow: {
        border: 'inset 0px 0px 0px 1px rgb(var(--color-primary) / 0.08)',
        darkHeader: 'inset 0px -1px 0px 0px rgba(21, 21, 21, 0.4)',
        lightHeader: 'inset 0px -1px 0px 0px rgba(21, 21, 21, 0.05)',
      },
    },
  },
};
