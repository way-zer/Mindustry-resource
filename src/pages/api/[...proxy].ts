import type {APIRoute} from "astro"

export const all: APIRoute = async ({request}) => {
    function clearHeader(headers: Headers) {
        headers = new Headers(headers)
        headers.delete("Host")
        headers.delete("Connection")
        headers.delete("Content-Encoding")
        headers.delete("Alt-Svc")
        return headers
    }

    const url = new URL(request.url.split('/api')[1], "https://api.mindustry.top/")
    const resp = await fetch(url, {
        method: request.method,
        body: request.body,
        headers: clearHeader(request.headers),
    })
    return new Response(await resp.text(), {
        status: resp.status,
        headers: clearHeader(resp.headers),
    })
}