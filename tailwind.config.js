import {slate, blue} from '@radix-ui/colors'

const keyMapper = {
  1: 50,
  2: 100,
  3: 200,
  4: 300,
  5: 400,
  6: 500,
  7: 600,
  8: 700,
  9: 800,
  10: 900,
  11: 950,
  12: 1000,
}
const twBlue = Object.entries(blue).reduce((acc, [key, value]) => {
  acc[keyMapper[key.replace('blue', '')]] = value;
  return acc;
}, {});

const twSlate = Object.entries(slate).reduce((acc, [key, value]) => {
  acc[keyMapper[key.replace('slate', '')]] = value;
  return acc;
}, {});

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // blue: twBlue,
        // slate: twSlate,
      }
    }
  },
  plugins: [],
}
