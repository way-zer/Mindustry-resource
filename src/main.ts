import routes0 from 'virtual:generated-pages'
import {registerStore} from '@/store'
import locale from 'element-plus/es/locale/lang/zh-cn'
import '@/plugins/serviceWorker'
import App from "@/App.vue";
import {ID_INJECTION_KEY} from "element-plus/es/hooks/use-id/index";
import viteSSR from "@/util/viteSSR";
import {initAxios} from "@/plugins/axios";
import createRouter from "@/plugins/router";

// import 'element-plus/es/components/message/style/css'

const routes = routes0.concat(
    {path: '/', redirect: '/map'},
)

export default viteSSR(App, async (ctx) => {
    initAxios()
    ctx.app.provide(ID_INJECTION_KEY, {prefix: Math.floor(Math.random() * 10000000), current: 0})
        .use((app) => {
            app.config.globalProperties.$ELEMENT = {locale, zIndex: 100}
        })
    const [store] = registerStore(ctx.app, ctx.state.vuex)
    if (ctx.kind == 'server') {
        ctx.state.vuex = store.state
    }
    return {router: createRouter()}
})