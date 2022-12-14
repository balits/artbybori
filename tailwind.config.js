/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#828770",
        "darkGreen": "#273120",
        "beige": "#ebeae6",
        "offwhite": "#fffcf9",
        grey: {
          "light": "#d9d9d9",
          "dark": "#292524",
        },
        decorative: {
          "myOrange": "#fe670c",
          "darkGreen": "#426148"
        }
      },
      fontFamily: {
        "kameron": ['Kameron'],
        "hind": ['Hind Siliguri'],
        "cantata": ['Cantata One'],

        //TODO Add fallback options for the fonts above (or is it done automatically, using font-sans for Hind, and so on?)
      },
      spacing: {
        "header-base": "64px",
        "header-md": "80px",
        "header-xl": "96px",
        "wrapper-max": "1400px",
        "sidebar-phone": "280px",
        "sidebar-tablet": "380px",
        "sidebar-desktop": "520px",
      }
    },
    gridTemplateRows: {
      '1': 'repeat(1, minmax(0,1fr))',
      '2': 'repeat(2, minmax(0,1fr))',
      '12': 'repeat(12, minmax(0,1fr))',
    },
    gridRow: {
      'span-8': 'span 8 / span 8',
      'span-10': 'span 10 / span 10',
      'span-12': 'span 12 / span 12',
      'span-14': 'span 14 / span 14',
    }
  },
  plugins: [],
}
