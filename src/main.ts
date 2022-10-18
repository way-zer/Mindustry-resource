import locale from 'element-plus/es/locale/lang/zh-cn'
import '@/plugins/serviceWorker'
import App from "@/App.vue";
import {ID_INJECTION_KEY} from "element-plus/es/hooks/use-id/index";
import viteSSR from "@/util/viteSSR";
import {initAxios} from "@/plugins/axios";
import createRouter from "@/plugins/router";
import {createPinia} from "pinia";

export default viteSSR(App, async (ctx) => {
    initAxios()
    const pinia = createPinia()
    ctx.app.provide(ID_INJECTION_KEY, {prefix: Math.floor(Math.random() * 10000000), current: 0})
        .use((app) => {
            app.config.globalProperties.$ELEMENT = {locale, zIndex: 100}
        })
        .use(pinia)
    if (ctx.kind == 'server') {
        ctx.state.pinia = pinia.state.value
    } else if (ctx.kind == 'client') {
        pinia.state.value = ctx.state.pinia
    }
    return {
        router: createRouter(),
    }
})