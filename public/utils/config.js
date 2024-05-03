const { join } = require("path");
const isDev = require("electron-is-dev");

let config = {
	appName: "taskmanagement-app-v2.0.3",
	icon: join(__dirname, "..", "/favicon.ico"),
	tray: null,
	isQuiting: false,
	mainWindow: null,
	popupWindow: null,
	isDev,
	
};

module.exports = config;
