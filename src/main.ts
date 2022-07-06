import {createApp} from 'vue'
import {router} from './plugins/router'
import {initAxios} from './plugins/axios'
import App from './App.vue'
import {store} from '@/store'
import locale from 'element-plus/es/locale/lang/zh-cn'
import {ElLoading} from 'element-plus'

import 'element-plus/theme-chalk/display.css'
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/message-box/style/css'
import '@/plugins/serviceWorker'

initAxios()

createApp(App)
    .use((app) => {
        app.config.globalProperties.$ELEMENT = {locale, zIndex: 100}
        app.use(ElLoading)
    })
    .use(router)
    .use(store)
    .mount('#app')
