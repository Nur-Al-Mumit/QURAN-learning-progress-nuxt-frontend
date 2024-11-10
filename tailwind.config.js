/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      screens: {
        '3xl': '1600px',
        '4xl': '2100px'
      },

      colors: {
        // 'primary': '#2d75c8'
        // 16a34a
        'primary': '#2d75c8'
      },

      animation: {
        'fade-in-up': 'fade-in-up 0.7s ease forwards',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },

    },
  },
  plugins: [],
}

