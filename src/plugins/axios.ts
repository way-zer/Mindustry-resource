import axios from 'axios'
import {ElMessage} from 'element-plus'
import {API_BASE, mapUrl} from "@/const";
import {Method, AxiosRequestConfig, AxiosResponse} from "axios";

export interface MyRequestConfig extends AxiosRequestConfig {
    skipErrorHandler?: boolean
}

export async function request<R>(method: Method, url: string, option?: MyRequestConfig): Promise<R> {
    option = {
        ...option, method,
        url: mapUrl(url)
    }
    option.withCredentials = option.url!!.startsWith(API_BASE)
    try {
        const resp = await axios.request<any, AxiosResponse<R>>(option)
        return resp.data
    } catch (e) {
        if (axios.isAxiosError(e) && !option.skipErrorHandler) {
            if ((e.response?.status || 0) / 100 == 4) {
                if (import.meta.env.SSR) console.warn(`请求失败`, e)
                else ElMessage.error({
                    message: `请求失败: ${e.response?.status}\n${e.response?.data}`,
                    duration: 30_000,
                    showClose: true
                })
            }
        }
        throw e
    }
}