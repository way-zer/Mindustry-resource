import {createApp} from 'vue'
import {router} from "./plugins/router";
import {initAxios, installStores} from "./store";
import {installElementPlus} from "./plugins/element";
import {installAntDesign} from "@/plugins/antDesign";
import {installGlobalComponent} from "@/components";
import App from './App.vue'

import("@/plugins/serviceWorker")
initAxios()

createApp(App)
    .use(installElementPlus)
    .use(installAntDesign)
    .use(installGlobalComponent)
    .use(installStores)
    .use(router)
    .mount('#app')
