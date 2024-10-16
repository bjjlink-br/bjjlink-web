/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
      fontFamily: {
        primary: "var(--font-poppins)",
        secondary: "var(--font-openSans)"
      },
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
        'brand-blue': {
          50: '#E8F7FF',
          100: '#D5F0FF',
          200: '#B3E1FF',
          300: '#85CBFF',
          400: '#56A6FF',
          500: '#2F80FF',
          600: '#0C53FF', // P (principal)
          700: '#044BFF',
          800: '#0641CD',
          900: '#103E9F',
          950: '#0A225C',
        },
        gray: {
          50: '#D8D8E1',
          100: '#C2C2CB',
          200: '#ABABB4',
          300: '#95959E',
          400: '#7F7F88',
          500: '#686871',
          600: '#51515B',
          700: '#3A3A44',
          800: '#2A2A34',
          900: '#23232D',
          950: '#20202A',
          1000: '#1E1E28',
          1100: '#191924',
          1200: '#12121D',
          1300: '#0D0D18',
        },
        'semantic-green': {
          300: '#BDF283',
          500: '#9FE662',
        },
        'semantic-blue': {
          300: '#6DFCF1',
          500: '#0EE3F7',
        },
        'semantic-yellow': {
          300: '#FBD979',
          500: '#F4AE22',
        },
        'semantic-red': {
          300: '#F39678',
          500: '#D83122',
        },
      },
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
