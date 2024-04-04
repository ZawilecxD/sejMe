/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts}'],
  theme: {
    extend: {
      keyframes: {
        scaleWidth: {
          '0%': {
            transform: 'scaleX(0)',
            'transform-origin': 'left',
          },
          '100%': {
            transform: 'scaleX(1)',
            'transform-origin': 'left',
          },
        },
      },
    },
    animation: {
      scaleWidth: 'scaleWidth 1s ease-in-out',
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: true,
    styled: true,
    themes: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
  },
};
