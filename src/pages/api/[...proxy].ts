import type { APIRoute } from "astro"

export const all: APIRoute = async ({ request, params }) => {
    const { proxy } = params
    return await fetch(`https://api.mindustry.top/${proxy}`, request)
}