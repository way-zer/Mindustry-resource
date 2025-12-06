import withNuxt from "./.nuxt/eslint.config.mjs"
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended"

export default withNuxt([
	eslintPluginPrettierRecommended,
	{
		rules: {
			"vue/no-multiple-template-root": "off",
			"prettier/prettier": "warn",
		},
	},
])
