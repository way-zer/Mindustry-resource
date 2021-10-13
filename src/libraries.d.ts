declare module 'vue3-json-viewer' {
    import {DefineComponent} from '@vue/runtime-core'

    export type JsonViewer = DefineComponent<{
        value: object,
        expandDepth: number
    }>
}

import 'vue-router'

declare module 'vue-router' {
    interface RouteMeta {
        navName?: string
        navIndex?: number
    }
}