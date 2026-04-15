/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
       colors: {
        blanco: '#F5F7FA',
        verdeazulado: '#3AAFA9',
        naranjacoral: '#FF6F59',
      },
    },
  },
  plugins: [],
}
