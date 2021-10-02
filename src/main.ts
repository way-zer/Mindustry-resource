import {createApp} from 'vue'
import {router} from './plugins/router'
import {initAxios} from './plugins/axios'
import App from './App.vue'
import {store} from '@/store'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import Loading from 'element-plus/es/el-loading'

import('element-plus/packages/theme-chalk/lib/display.css')
import('@/plugins/serviceWorker')
initAxios()

createApp(App)
    .use((app) => {
        app.config.globalProperties.$ELEMENT = {locale, zIndex: 100}
        app.directive('Loading', Loading.directive)
    })
    .use(router)
    .use(store)
    .mount('#app')
