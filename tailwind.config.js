import {slate, blue, blueDark, slateDark } from '@radix-ui/colors'

const accent = {
  base: blue.blue1,
  bgSubtle: blue.blue2,
  bg: blue.blue3,
  bgHover: blue.blue4,
  bgActive: blue.blue5,
  line: blue.blue6,
  border: blue.blue7,
  borderHover: blue.blue8,
  solid: blue.blue9,
  solidHover: blue.blue10,
  text: blue.blue11,
  textContrast: blue.blue12,
} 

const neutral = {
  base: slate.slate1,
  bgSubtle: slate.slate2,
  bg: slate.slate3,
  bgHover: slate.slate4,
  bgActive: slate.slate5,
  line: slate.slate6,
  border: slate.slate7,
  borderHover: slate.slate8,
  solid: slate.slate9,
  solidHover: slate.slate10,
  text: slate.slate11,
  textContrast: slate.slate12,
} 

const darkAccent = {
  base: blueDark.blue1,
  bgSubtle: blueDark.blue2,
  bg: blueDark.blue3,
  bgHover: blueDark.blue4,
  bgActive: blueDark.blue5,
  line: blueDark.blue6,
  border: blueDark.blue7,
  borderHover: blueDark.blue8,
  solid: blueDark.blue9,
  solidHover: blueDark.blue10,
  text: blueDark.blue11,
  textContrast: blueDark.blue12,
} 
const darkNeutral = {
  base: slateDark.slate1,
  bgSubtle: slateDark.slate2,
  bg: slateDark.slate3,
  bgHover: slateDark.slate4,
  bgActive: slateDark.slate5,
  line: slateDark.slate6,
  border: slateDark.slate7,
  borderHover: slateDark.slate8,
  solid: slateDark.slate9,
  solidHover: slateDark.slate10,
  text: slateDark.slate11,
  textContrast: slateDark.slate12,
} 

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
        accent,
        neutral,
        'dark-accent': darkAccent,
        'dark-neutral': darkNeutral,
      }
    }
  },
  plugins: [],
}
