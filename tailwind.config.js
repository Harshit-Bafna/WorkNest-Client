/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'roboto-slab': ['Roboto Slab', 'serif']
      },
      colors: {
        'bright-blue': '#316eff',
        'light-blue': '#eff2f6',
        'off-white': '#f0ffff',
        'light-gray': '#f5f5f5',
        'dark-grey': '#3a3a3a',
        'light-dark-grey': '#696969',
        'gray-muted': '#94a3b8',
        'vibrant-green': '#4CAF50',
        'orange': '#f97316',
      },
      dropShadow: {
        'text-shadow': '0px 4px 4px rgba(0, 0, 0, 0.25)',
      },
      boxShadow: {
        'input-shadow': 'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px'
      },
      backgroundImage: {
        'login-container': 'url("./src/assets/auth/container.png")'
      }
    },
  },
  plugins: [],
};
