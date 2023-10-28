import {DefineComponent} from "vue";
import 'vue-router'

declare module 'vue3-json-viewer' {
    import {DefineComponent} from '@vue/runtime-core'

    export type JsonViewer = DefineComponent<{
        value: object,
        expandDepth: number
    }>
}

declare module 'vue-monaco' {
    type MonacoEditor = DefineComponent<{
        original?: string,
        value: string,
        theme?: string,
        language?: string,
        options?: object,
        amdRequire?: function,
        diffEditor?: boolean
    }>
    export default MonacoEditor
}