declare module "vue-monaco" {
	type MonacoEditor = DefineComponent<{
		original?: string
		value: string
		theme?: string
		language?: string
		options?: object
		amdRequire?: function
		diffEditor?: boolean
	}>
	export default MonacoEditor
}
