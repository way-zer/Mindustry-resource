import {Plugin, ViteDevServer} from "vite";
import {NextHandleFunction} from "connect";
import {Renderer, ServerContext} from "./types";
import {injectTemplate} from "./util";
import {resolve} from "path";
import {readFileSync} from "fs";

function createSSRHandler(server: ViteDevServer): NextHandleFunction {
    return async (request, response, next) => {
        if (request.method !== 'GET' || request.url!.includes(".ico"))
            return next()
        let template: string
        try {
            const indexHtml = readFileSync(resolve(server.config.root, 'index.html'), 'utf-8')
            template = await server.transformIndexHtml(request.originalUrl!!, indexHtml)
        } catch (error) {
            return next(error)
        }

        try {
            //TODO
            const entryPoint = '/src/main.ts'

            let resolvedEntryPoint = await server.ssrLoadModule(entryPoint, {fixStacktrace: true})
            resolvedEntryPoint = resolvedEntryPoint.default || resolvedEntryPoint
            const render = (resolvedEntryPoint.render || resolvedEntryPoint) as Renderer

            const ctx = {
                kind: 'server',
                state: {},
            } as ServerContext
            const htmlParts = await render(request.originalUrl!!, ctx)
            response.setHeader('Content-Type', 'text/html')
            response.end(injectTemplate(template, htmlParts))
        } catch (error) {
            // Send back template HTML to inject ViteErrorOverlay
            response.setHeader('Content-Type', 'text/html')
            response.end(template)

            // Wait until browser injects ViteErrorOverlay
            // custom element from the previous template
            setTimeout(() => next(error), 250)
            server.ssrFixStacktrace(error as Error)
        }
    }
}

export default function viteSSR({} = {}) {
    return [
        {
            name: 'viteSSR', enforce: 'pre',
            async configureServer(server) {
                const handler = createSSRHandler(server)
                return () => {
                    server.middlewares.use(handler)
                }
            },
            resolveId(id, _, {ssr}) {
                if (id.endsWith("viteSSR"))
                    return ssr ? (id + "/entry-server.ts") : (id + "/entry-client.ts")
            }
        } as Plugin
    ]
}