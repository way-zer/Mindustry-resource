const Koa = require('koa')
const {SSR} = require("./ssr");

const koa = new Koa()

function log(msg) {
    console.log("[", new Date().toLocaleString(), "]", msg)
}

koa.use(async (ctx, next) => {
    try {
        const ua = ctx.req.headers["user-agent"]
        const time = Date.now()
        log(`S: ${ctx.req.url} UA=${ua}`)
        const {html} = await SSR("https://mdt.wayzer.top" + ctx.req.url)
        ctx.body = html
        log(`E: ${ctx.req.url} UA=${ua} T=${Date.now() - time}ms`)
    } catch (e) {
        console.log(e)
        ctx.status = 500
    }
})

koa.listen(3000)
log('app started at port 3000...')