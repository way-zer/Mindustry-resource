import { ID_INJECTION_KEY, default as ElementPlus } from "element-plus"
import { createPinia } from "pinia"
import type { App } from "vue"
import locale from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'

export default (app: App) => {
    const pinia = createPinia()
    app.use(pinia)
    app.use(ElementPlus)
    app.provide(ID_INJECTION_KEY, { prefix: 7777, current: 0 })
        .use((app) => {
            app.config.globalProperties.$ELEMENT = { locale, zIndex: 100 }
        })
    if (!import.meta.env.SSR) {
        const data = document.getElementById('pinia-data')?.dataset.data
        pinia.state.value = JSON.parse(data || '{}')
    }
}