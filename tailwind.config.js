/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        warm: "#FEF8F4",
        coral: "#FF7F50",
        lightblack: "#4E4039",
        lightbrown:"#A08F86",
        darkwarm:"#FCE8DF",
      },
      keyframes: {
        "bounce-slow-low": {
          "0%, 100%": {
            transform: "translateY(-10%)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(0)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
      },
      animation: {
        "bounce-slow-low": "bounce-slow-low 3s infinite",
      },
    },
  },
  plugins: [],
};
