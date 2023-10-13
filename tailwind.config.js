const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    "./app/template/**/*.{html,js}",
    "./app/src/**/*.{html,js}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans]
      },
    }
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio')
  ],
}
