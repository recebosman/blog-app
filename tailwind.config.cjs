/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#cbd865",
          secondary: "#3dff91",
          accent: "#dbb948",
          neutral: "#31273F",
          "base-100": "#423357",
          info: "#7CCCE4",
          success: "#1CA65F",
          warning: "#EEBD68",
          error: "#EC5177",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
