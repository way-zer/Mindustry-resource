import { ID_INJECTION_KEY, default as ElementPlus } from "element-plus"
import {createPinia, getActivePinia, setActivePinia} from "pinia"
import type { App } from "vue"
import locale from 'element-plus/es/locale/lang/zh-cn'

export default (app: App) => {
    let pinia = getActivePinia()
    if(!pinia){
        console.log("createPinia")
        pinia = createPinia()
        if (!import.meta.env.SSR) {
            const data = document.getElementById('pinia-data')?.dataset.data
            pinia.state.value = JSON.parse(data || '{}')
        }
        setActivePinia(pinia)
    }
    app.use(pinia)
    app.use(ElementPlus)
    app.provide(ID_INJECTION_KEY, { prefix: 7777, current: 0 })
        .use((app) => {
            app.config.globalProperties.$ELEMENT = { locale, zIndex: 100 }
        })
}