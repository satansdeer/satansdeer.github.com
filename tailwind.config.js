const { spacing, fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
	darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./slices/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
			colors: {
				'logo-green-start': '#00ff97',
				'logo-green-end': '#76ff1d',
				'logo-purple-start': '#ff2575',
				'logo-purple-end': '#1d20ff',
			},
      fontFamily: {
        raleway: ['Raleway'],
        "fira-code": ['Fira Code'],
      },
    }
  },
  plugins: [
		require('@tailwindcss/typography'),
	],
};
