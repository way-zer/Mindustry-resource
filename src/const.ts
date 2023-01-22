export const API_BASE = "https://mdt.wayzer.top/api/"

export function mapUrl(raw: string) {
    if (raw?.startsWith("/api/"))
        return API_BASE + raw?.substring(5)
    return raw
}