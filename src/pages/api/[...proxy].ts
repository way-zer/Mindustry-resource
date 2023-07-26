import type {APIRoute} from "astro"

export const all: APIRoute = async ({request, params}) => {
    function clearHeader(headers: Headers){
        headers = new Headers(headers)
        headers.delete("Host")
        headers.delete("Connection")
        headers.delete("Content-Encoding")
        headers.delete("Alt-Svc")
        return headers
    }
    const {proxy} = params
    const resp = await fetch(`https://api.mindustry.top/${proxy}`, {
        method: request.method,
        body: request.body,
        headers: clearHeader(request.headers),
    })
    return new Response(await resp.text(),{
        status: resp.status,
        headers: clearHeader(resp.headers),
    })
}