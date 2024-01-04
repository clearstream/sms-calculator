const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      ...defaultTheme.colors,
      pink: {
        500: '#e11172'
      },
    },
    extend: {
      fontFamily: {
        sans: ['sofia-pro', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
