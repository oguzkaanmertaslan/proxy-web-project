/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary': '#1152d4',
        'primary-hover': '#0f4bc2',
        'background-light': '#f6f6f8',
        'background-dark': '#101622',
        'card-dark': '#1c232e',
        'border-dark': '#2a313d',
        'text-secondary': '#9da6b9',
        'navy-sidebar': '#0f172a',
      },
      fontFamily: {
        'outfit': ['Outfit', 'sans-serif'],
        'display': ['Inter', 'sans-serif'],
        'sans': ['Inter', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'DEFAULT': '0.25rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        'full': '9999px',
      },
    },
  },
  plugins: [],
};
