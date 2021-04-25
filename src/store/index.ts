import maps from "@/store/maps/store";
import Vue from "vue";
import axios from "axios";
import {ElMessage} from "element-plus";

const stores = {
    maps
}

export function installStores(app: Vue.App): void {
    app.use(maps, "maps")
}

export function useStore<N extends keyof typeof stores>(name: N): (typeof stores)[N] {
    return stores[name]
}

export function initAxios() {
    axios.interceptors.response.use((resp) => {
        return resp.data
    }, (error => {
        if (axios.isAxiosError(error)&&!error.config.skipErrorHandler) {
            if (error.response?.status == 400) {
                ElMessage.error(error.response?.data)
            }
        }
        throw error
    }))
}

declare module "axios" {
    interface AxiosRequestConfig {
        skipErrorHandler?: boolean
    }
}