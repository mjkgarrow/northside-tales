/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        screen: ['100vh', '100dvh'],
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: false, // only dark and light
    darkTheme: "dark", // name of one of the included themes used for dark mode
    logs: false // turn off console info
  },

}

