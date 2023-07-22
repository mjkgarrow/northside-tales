/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      dropShadow: {
        glow: [
          "0 0px 8px rgba(0,0, 255, 0.6)",
          "0 0px 20px rgba(0, 0,255, 0.4)",
        ],
      },
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

