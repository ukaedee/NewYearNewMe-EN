module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./app/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        tsukuaold: ['fot-tsukuaoldmin-pr6n', 'Arial', 'sans-serif'],
      },
      colors: {
        primary: "hsl(var(--primary))",
      },
    },
  },
  plugins: [],
};