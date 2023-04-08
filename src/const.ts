export const API_BASE = "https://api.mindustry.top/"

export function mapUrl(raw: string) {
    if (import.meta.env.DEV && !import.meta.env.SSR) return raw
    if (raw?.startsWith("/api/"))
        return API_BASE + raw?.substring(5)
    return raw
}