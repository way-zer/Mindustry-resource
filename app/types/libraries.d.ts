declare module "vue-monaco" {
	type MonacoEditor = DefineComponent<{
		original?: string
		value: string
		theme?: string
		language?: string
		options?: object
		diffEditor?: boolean
	}>
	export default MonacoEditor
}
