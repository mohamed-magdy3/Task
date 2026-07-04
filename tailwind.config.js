/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // هذا السطر سيجعل خطك الجديد هو الافتراضي لجميع عناصر Tailwind
        sans: ['GoogleSans', 'sans-serif'], 
      },
    },
  },
  plugins: [],
}