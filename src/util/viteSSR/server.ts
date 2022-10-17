import {createServer, ViteDevServer} from "vite";
import chalk from "chalk";
import {performance} from "perf_hooks";
import {NextHandleFunction} from "connect";
import {Renderer, ServerContext} from "./types";
import {htmlEscape, injectTemplate} from "./util";
import {resolve} from "path";
import {readFileSync} from "fs";

globalThis.__ssr_start_time = performance.now()
const viteServer = await createServer({
    plugins: [
        {
            name: 'viteSSR', enforce: 'pre',
            async configureServer(server) {
                const handler = createSSRHandler(server)
                return () => {
                    server.middlewares.use(handler)
                }
            }
        }
    ]
})
await viteServer.listen()
printServerInfo(viteServer)

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
            const entryPoint = 'src/main.ts'

            let resolvedEntryPoint = await server.ssrLoadModule(entryPoint, {fixStacktrace: true})
            resolvedEntryPoint = resolvedEntryPoint.default || resolvedEntryPoint
            const render = (resolvedEntryPoint.render || resolvedEntryPoint) as Renderer

            const ctx = {
                kind: 'server',
                state: {},
            } as ServerContext
            const htmlParts = await render(request.originalUrl!!, ctx)
            htmlParts["Init-State"] = `<script>window.__INITIAL_STATE__=${htmlEscape(JSON.stringify(ctx.state))}</script>`

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

function printServerInfo(server: ViteDevServer) {
    const info = server.config.logger.info

    let ssrReadyMessage = '\n -- SSR mode'

    if (Object.prototype.hasOwnProperty.call(server, 'printUrls')) {
        info(
            chalk.cyan(`\n  vite v${require('vite/package.json').version}`) +
            chalk.green(` dev server running at:\n`),
            {clear: !server.config.logger.hasWarned}
        )

        // @ts-ignore
        server.printUrls()

        // @ts-ignore
        if (globalThis.__ssr_start_time) {
            ssrReadyMessage += chalk.cyan(
                ` ready in ${Math.round(
                    // @ts-ignore
                    performance.now() - globalThis.__ssr_start_time
                )}ms.`
            )
        }
    }

    info(ssrReadyMessage + '\n')
}
