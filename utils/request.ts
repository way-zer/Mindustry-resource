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
    try {
        return await $fetch(url, {
            method, credentials: url!!.startsWith(API_BASE) ? "include" : undefined,
            responseType: "json",
            ...option,
        })
    } catch (e: any) {
        if (option?.skipErrorHandler) throw e
        let message
        if (e.data && e.data.errorMessage) {
            const { errorMessage, data } = e.data
            message = h("div", {}, [
                `请求失败(${e.status}): ${errorMessage}`,
                h("br"),
                data && h("pre", {}, JSON.stringify(data))
            ])
        } else if (e.status) {
            message = `请求失败(${e.status}): ${e.data ?? e.statusText}`
        } else {
            message = e.message ?? e.toString()
        }

        ElMessage.error({ message, duration: 30_000, showClose: true })
        throw e
    }
}