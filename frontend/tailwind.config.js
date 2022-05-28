module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				primaryLight: "$pink400",
				primary: "$pink400",
				primaryDark: "$pink800",
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
