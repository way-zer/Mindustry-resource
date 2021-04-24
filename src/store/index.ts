import maps from "@/store/maps/store";
import Vue from "vue";
import axios, {AxiosRequestConfig} from "axios";

const stores = {
    maps
}

export function installStores(app: Vue.App): void {
    axios.interceptors.response.use((resp) => {
        return resp.data
    }, (error => {
        if(axios.isAxiosError(error)){
            if(error.response?.status==400){
                //
            }
        }
    }))
    app.use(maps, "maps")
}

export function useStore<N extends keyof typeof stores>(name: N): (typeof stores)[N] {
    return stores[name]
}

declare module "axios"{
    interface AxiosRequestConfig {
        skipErrorHandler?: boolean
    }
}