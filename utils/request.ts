import {ElMessage} from 'element-plus'
import type {FetchOptions} from 'ofetch'

type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH"

export function mapUrl(raw: string) {
    if (import.meta.env.DEV && !import.meta.env.SSR) return raw
    if (raw?.startsWith("/api/"))
        return API_BASE + raw?.substring(5)
    return raw
}

export interface MyRequestConfig extends Omit<FetchOptions, "method"> {
    reCaptchaAction?: string
    skipErrorHandler?: boolean
}

interface ErrorData {
    errorMessage: string
    actions?: string[]
    data?: any
}

export async function request<R>(method: Method, url: string, option?: MyRequestConfig): Promise<R> {
    url = mapUrl(url)
    try {
        const headers = {...option?.headers} as Record<string, string>
        if (!headers["X-ReCaptchaV2"] && option?.reCaptchaAction) {
            const token = await requestToken(option?.reCaptchaAction)
            headers["X-ReCaptcha"] = token
        }
        return await $fetch(url, {
            method, credentials: url!!.startsWith(API_BASE) ? "include" : undefined,
            responseType: "json", ...option,
            headers,
        })
    } catch (e: any) {
        if (option?.skipErrorHandler) throw e
        const data = e.data as ErrorData
        let message
        if (data && data.errorMessage) {
            if (data.actions?.includes('ReCaptchaV2')) {
                const token = await requestTokenV2()
                const headers = {...option?.headers, "X-ReCaptcha": "", "X-ReCaptchaV2": token}
                return await request(method, url, {...option, headers})
            }
            if (data.actions?.includes('Login')) {
                const userStore = useUserStore()
                if (!userStore.logged) {
                    userStore.showDialog = true
                }
            }
            message = h("div", {}, [
                `请求失败(${e.status}): ${data.errorMessage}`,
                h("br"),
                data.data && h("pre", {}, JSON.stringify(data.data))
            ])
        } else if (e.status) {
            message = `请求失败(${e.status}): ${e.data ?? e.statusText}`
        } else {
            message = e.message ?? e.toString()
        }

        ElMessage.error({message, duration: 30_000, showClose: true})
        throw e
    }
}