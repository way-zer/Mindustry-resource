import locale from 'element-plus/es/locale/lang/zh-cn'
import '@/plugins/serviceWorker'
import App from "@/App.vue";
import {ID_INJECTION_KEY} from "element-plus";
import viteSSR from "simple-vite-vue-ssr";
import createRouter from "@/plugins/router";
import {createPinia} from "pinia";
import 'virtual:uno.css'

export default viteSSR(App, async (ctx) => {
    ctx.router = createRouter()
    ctx.app.provide(ID_INJECTION_KEY, {prefix: 7777, current: 0})
        .use((app) => {
            app.config.globalProperties.$ELEMENT = {locale, zIndex: 100}
        })

    const pinia = createPinia()
    ctx.app.use(pinia)
    if (ctx.kind == 'server') {
        ctx.state.pinia = pinia.state.value
    } else if (ctx.kind == 'client') {
        pinia.state.value = ctx.state.pinia
    }
})