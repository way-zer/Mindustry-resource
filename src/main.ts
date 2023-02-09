import locale from 'element-plus/es/locale/lang/zh-cn'
import '@/plugins/serviceWorker'
import App from "@/App.vue";
import {ID_INJECTION_KEY} from "element-plus";
import viteSSR from "simple-vite-vue-ssr";
import {initAxios} from "@/plugins/axios";
import createRouter from "@/plugins/router";
import {createPinia} from "pinia";

export default viteSSR(App, async ({app, state, kind}) => {
    initAxios()
    app.provide(ID_INJECTION_KEY, {prefix: 7777, current: 0})
        .use((app) => {
            app.config.globalProperties.$ELEMENT = {locale, zIndex: 100}
        })

    const pinia = createPinia()
    app.use(pinia)
    if (kind == 'server') {
        state.pinia = pinia.state.value
    } else if (kind == 'client') {
        pinia.state.value = state.pinia
    }

    return {
        router: createRouter(),
    }
})