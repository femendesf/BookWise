import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'green-100' : '#50B2C0',
        'green-200' : '#255D6A',
        'green-300' : '#0A313C',

        'purple-hoover' : '#ABAAE1',
        'purple-100' : '#8381D9',
        'purple-200' : '#2A2879',
        
        'gray-100' : '#F8F9FC',
        'gray-200' : '#E6E8F2',
        'gray-300' : '#D1D6E4',
        'gray-400' : '#8D95AF',

        'gray-500' : '#303F73',
        'gray-600' : '#252D4A',
        'gray-700' : '#181C2A',
        'gray-750' : '#141824',
        'gray-800' : '#0E1116',

        'red-exit' : '#F75A68'


      },
      fontSize:{
        'span' : '1.625rem',
      },
      fontFamily:{
        'nunito' : ['Nunito Sans', 'sans-serif'],
      },
      boxShadow:{
        'custom-dual' : 'inset 0px 60px 73px -29px rgba(41, 40, 121, 0.4), inset 0px -70px 30px -29px rgba(37, 93, 106, 0.11)',
      }
    },
  },
  plugins: [],
} satisfies Config;
