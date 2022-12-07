import axios from 'axios'
import {ElMessage} from 'element-plus'
import {API_BASE} from "@/const";

export function initAxios() {
    if (axios.INIT) return
    axios.INIT = true
    if (import.meta.env.SSR)
        axios.interceptors.request.use((req) => {
            req.withCredentials = true
            if (req.url?.startsWith("/api/"))
                req.url = API_BASE + req.url!!.substring(5)
            return req
        })
    axios.interceptors.response.use((resp) => {
        return resp.data
    }, (error => {
        if (axios.isAxiosError(error) && !error.config?.skipErrorHandler) {
            if ((error.response?.status || 0) / 100 == 4) {
                if (import.meta.env.SSR) console.warn(`请求失败`, error)
                else ElMessage.error({
                    message: `请求失败: ${error.response?.status}\n${error.response?.data}`,
                    duration: 30_000,
                    showClose: true
                })
            }
        }
        throw error
    }))
}

declare module 'axios' {
    interface AxiosStatic {
        INIT: boolean
    }

    interface AxiosRequestConfig {
        skipErrorHandler?: boolean
    }
}