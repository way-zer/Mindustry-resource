// @ts-check
import * as http from "node:http";
import connect from 'connect'
import type {Renderer, ServerContext} from "@/util/viteSSR/types";
import {injectTemplate} from "@/util/viteSSR/util";
import indexProd from '@/../dist/client/index.html?raw'
import manifest from '@/../dist/client/ssr-manifest.json'

const port = +(process.env["PORT"] || 6173)

;(async () => {
    const render = (await import("@/main")).default as Renderer //split package
    const app = connect()
    app.use(async (req, res) => {
        try {
            const ctx = {
                kind: 'server',
                state: {},
                ssrManifest: manifest as unknown
            } as ServerContext
            const htmlParts = await render(req.originalUrl!!, ctx)
            const html = injectTemplate(indexProd, htmlParts)
            res.setHeader('Content-Type', 'text/html').end(html)
        } catch (e: any) {
            console.log(e.stack)
            res.statusCode = 500
            res.end(e.stack)
        }
    })
    http.createServer(app).listen(port)
    console.log('http://localhost:' + port)
})()