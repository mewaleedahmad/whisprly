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
        secondary: '#1d232a',
       
        
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

