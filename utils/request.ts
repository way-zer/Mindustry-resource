import { ElMessage } from 'element-plus'
import type { FetchOptions } from 'ofetch'

type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH"

export function mapUrl(raw: string) {
    if (import.meta.env.DEV && !import.meta.env.SSR) return raw
    if (raw?.startsWith("/api/"))
        return API_BASE + raw?.substring(5)
    return raw
}

export interface MyRequestConfig extends Omit<FetchOptions, "method"> {
    skipErrorHandler?: boolean
}

export async function request<R>(method: Method, url: string, option?: MyRequestConfig): Promise<R> {
    url = mapUrl(url)
    return await $fetch(url, {
        method, credentials: url!!.startsWith(API_BASE) ? "include" : undefined,
        responseType: "json",
        ...option,
        onResponseError({ response }) {
            if (!option?.skipErrorHandler && response.status / 100 == 4) {
                if (import.meta.env.SSR) console.warn(`请求失败`, response)
                else ElMessage.error({
                    message: `请求失败: ${response.status}\n${response.text()}`,
                    duration: 30_000,
                    showClose: true
                })
            }
        }
    })
}