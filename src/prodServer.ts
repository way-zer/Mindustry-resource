import fastify from "fastify";

import indexProd from '../dist/client/index.html?raw'
import manifest from '../dist/client/ssr-manifest.json'
import {createProdHandler} from "simple-vite-vue-ssr/prodHandler";
import * as path from "path";
import LRUCache from "lru-cache";

const cache = new LRUCache<string, string>({
    maxSize: 1024 * 1024 * 10,//10M
    sizeCalculation: (it: string) => it.length,
    ttl: 10 * 60 * 1000,//10 Min
});

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
        cache: cache.set.bind(cache),
        render: (await import("./main")).default //split package
    })
    await app.setNotFoundHandler(async (request, reply) => {
        if (request.url.match(".*\.(html|ico|js|png|css|json)"))
            return "404"
        if (cache.has(request.url)) {
            reply.type("text/html")
            return reply.send(cache.get(request.url))
        }
        await ssrHandler(request as any, reply.raw)
    })
    await app.listen({
        port: +(process.env["PORT"] || 6173)
    })
})().then()