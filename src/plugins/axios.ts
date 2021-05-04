import axios from 'axios'
import {ElMessage} from 'element-plus'

export function initAxios() {
    axios.interceptors.response.use((resp) => {
        return resp.data
    }, (error => {
        if (axios.isAxiosError(error) && !error.config.skipErrorHandler) {
            if (error.response?.status == 400) {
                ElMessage.error(error.response?.data)
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