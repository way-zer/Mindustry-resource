import * as http from "http";

import indexProd from '../dist/client/index.html?raw'
import manifest from '../dist/client/ssr-manifest.json'
import {createProdHandler} from "simple-vite-vue-ssr/prodHandler";

const port = +(process.env["PORT"] || 6173)

;(async () => {
    http.createServer(createProdHandler({
        manifest, indexFile: indexProd,
        render: (await import("@/main")).default //split package
    })).listen(port)
    console.log('http://localhost:' + port)
})()