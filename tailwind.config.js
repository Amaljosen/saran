/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8C4CFF', // Purple
        secondary: '#f3e8ff', // Light Purple
        text: '#562CA0', // Darker Purple
        background: '#EFE5FF', // Background Gray
        button: '#9c7cff', // Button Purple
        buttonHover: '#7c4dff', // Button Hover Purple
        black:'#3C3F46'
      },
      
    },
  },
  plugins: [],
}