import fastify from "fastify";

import indexProd from '../dist/client/index.html?raw'
import manifest from '../dist/client/ssr-manifest.json'
import {createProdHandler} from "simple-vite-vue-ssr/prodHandler";
import * as path from "path";

(async () => {
    const app = fastify({
        logger: true
    })
    await app.register(import("@fastify/compress"))
    await app.register(import("@fastify/static"), {
        root: path.resolve("client"),
        index: false,
        list: false,
    })

    const ssrHandler = createProdHandler({
        manifest, indexFile: indexProd,
        render: (await import("./main")).default //split package
    })
    await app.setNotFoundHandler(async (request, reply) => {
        if (request.url.match(".*\.(html|ico|js|png|css|json)"))
            return "404"
        await ssrHandler(request, reply.raw)
    })
    await app.listen({
        port: +(process.env["PORT"] || 6173)
    })
})().then()