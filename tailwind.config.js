const defaultTheme = require('tailwindcss/defaultTheme'); // eslint-disable-line
module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: ['./app/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        header: ['Dosis', ...defaultTheme.fontFamily.sans],
      },
      spacing: {
        '2/3': '66.666667%',
      },
    },
  },
  variants: {},
  plugins: [],
};
