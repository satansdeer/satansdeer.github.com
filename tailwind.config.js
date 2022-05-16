module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./slices/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "raleway": ['Raleway'],
        "fira-code": ['Fira Code'],
      },
    },
  },
  plugins: [
		require('@tailwindcss/typography'),
	],
};
