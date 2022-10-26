// @ts-check
import fs from 'node:fs'
import * as http from "node:http";
import connect from 'connect'
import type {Renderer, ServerContext} from "@/util/viteSSR/types";
import {injectTemplate} from "@/util/viteSSR/util";

const indexProd = fs.readFileSync('index.html', 'utf-8')
const manifest = JSON.parse(fs.readFileSync('ssr-manifest.json', 'utf-8'))
;(async () => {
    const render = (await import("@/main")).default as Renderer //split package
    const app = connect()
    app.use(async (req, res) => {
        try {
            const ctx = {
                kind: 'server',
                state: {},
                ssrManifest: manifest
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
    http.createServer(app).listen(6173)
    console.log('http://localhost:6173')
})()