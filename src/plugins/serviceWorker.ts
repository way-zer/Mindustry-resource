import {registerSW} from 'virtual:pwa-register'
import {ElMessage} from "element-plus";

if (!import.meta.env.SSR)
    registerSW({
        immediate: true,
        onNeedRefresh() {
            console.log("need to refresh")
        },
        onOfflineReady() {
            ElMessage.warning("网络连接失败，当前处于离线模式")
            console.log('No internet connection found. App is running in offline mode.')
        }
    })
