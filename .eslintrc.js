module.exports = {
	"env": {
		"amd": true,
		"browser": true,
		"es6": true,
		"node": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:react/recommended"
	],
	"parser": "babel-eslint",
	"plugins": ["react"],
	"settings": {
		"react": {
			"version": "detect"
		}
	}
};
