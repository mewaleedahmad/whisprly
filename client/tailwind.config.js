/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#171b1d',
        secondary: '#2b2d42',
        tertiary: '#00ffff',
       
        
      },
    
    },
  },
  plugins: [
    daisyui,
  ],
  daisyui:{
    logs: false
  }
}

