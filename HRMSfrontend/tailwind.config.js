/** @type {import('tailwindcss').Config} */
export default {
  // THIS IS THE MAGIC LINE YOU NEED 👇
  darkMode: "class", 
  
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}