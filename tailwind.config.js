const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      current: 'currentColor',
      transparent: 'transparent',
      black: '#000',
      white: '#fff',
      pink: {
        50: '#FCDBEB',
        100: '#FBC3DD',
        200: '#F794C2',
        300: '#F365A7',
        400: '#F0358C',
        500: '#E11172',
        600: '#B20D5A',
        700: '#820A42',
        800: '#53062A',
        900: '#240312'
      },
      gray: {
        50: '#fbfbfd',
        100: '#f5f6fa',
        150: '#eef0f7',
        200: '#e7e9f4',
        300: '#d7daec',
        400: '#bec3d6',
        500: '#9797A5',
        600: '#808091',
        700: '#3e3e47',
        800: '#23272c',
        900: '#17191D'
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
