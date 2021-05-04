import {createApp} from 'vue'
import {router} from './plugins/router'
import {initAxios} from './plugins/axios'
import {installElementPlus} from './plugins/element'
import {installAntDesign} from '@/plugins/antDesign'
import {installGlobalComponent} from '@/components'
import App from './App.vue'

import('@/plugins/serviceWorker')
initAxios()

createApp(App)
    .use(installElementPlus)
    .use(installAntDesign)
    .use(installGlobalComponent)
    .use(router)
    .mount('#app')
