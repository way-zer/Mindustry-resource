import {createSSRApp} from 'vue'
import {renderToString} from 'vue/server-renderer'
import type {ServerSSRHandler} from './types'
import {htmlEscape, renderPreloadLinks} from "@/util/viteSSR/util";

const viteSSR: ServerSSRHandler = function (App, hook) {
    return async function (url, context) {
        const app = createSSRApp(App)
        context.app = app
        const {router, afterRender} = await hook(context)
        app.use(router)
        await router.push(url)
        await router.isReady()
        const body = await renderToString(app, context)
        afterRender && await afterRender()
        return {
            "SSR-Body": body,
            "Init-State": `<script>window.__INITIAL_STATE__=${htmlEscape(JSON.stringify(context.state))}</script>`,
            "SSR-Preload": renderPreloadLinks(context.modules, context.ssrManifest),
            //TODO teleports
        }
    }
}
export default viteSSR