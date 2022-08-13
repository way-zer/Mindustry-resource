import axios from 'axios'
import {ElMessage} from 'element-plus'

export function initAxios() {
    axios.interceptors.response.use((resp) => {
        return resp.data
    }, (error => {
        if (axios.isAxiosError(error) && !error.config.skipErrorHandler) {
            if ((error.response?.status || 0) / 100 == 4) {
                ElMessage.error({message: `请求失败: ${error.response?.status}\n${error.response?.data}`, duration: 30_000, showClose: true})
            }
        }
        throw error
    }))
}

declare module 'axios' {
    interface AxiosRequestConfig {
        skipErrorHandler?: boolean
    }
}