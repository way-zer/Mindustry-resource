import {createSSRApp} from 'vue'
import {renderToString} from 'vue/server-renderer'
import type {ServerSSRHandler} from './types'

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
        return {"SSR-Body": body}
    }
}
export default viteSSR