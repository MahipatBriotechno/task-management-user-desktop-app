/** @type {import("tailwindcss").Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	theme: {
		colors: {
		  transparent: 'transparent',
		  primary: '#4f46e5',
		  blueLight: '#b1adf4',
		  blueExtraLight: '#b1adf473',
		  white: '#fff',
		  red: '#FF0000	',
		  blacklight: '#00000075',
		  gray: '#808080',
		  lightGray: '#D3D3D3',
		  SeaGreen : '#2E8B57',
		  GreenLeaves : '#3A5F0B',
		  LightOrange : '#FED8B1',
		  SafetyYellow : '#EED202',
		  greensuccess:'#008000',
		  yellowpending:'#FFB500',
		  activeblue:'#2196F3',
	
		},
		screens: {
		  xs: { max: "375px" },
		  sm: { min: "375px", max: "767px" }, 
		  md: { min: "768px", max: "1024px" }, 
		  lg: { min:"1024px", max:"1900px" }
		}
	  },
	darkMode: "media",
};
