import {registerSW} from 'virtual:pwa-register'
import {ElMessage} from "element-plus";

if (!import.meta.env.SSR)
    registerSW({
        immediate: true,
        onNeedRefresh() {
            console.log("need to refresh")
        },
        onOfflineReady() {
            ElMessage.info('资源加载完毕，选择"添加到主屏幕"可离线使用哦')
        }
    })
