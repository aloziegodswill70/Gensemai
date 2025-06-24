/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",  // For Next.js
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",     // If you're using the new app dir
    "./public/index.html",            // For plain HTML
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

