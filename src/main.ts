import {createApp} from 'vue'
import {router} from "./plugins/router";
import {installStores} from "./store";
import {installElementPlus} from "./plugins/element";
import {installAntDesign} from "@/plugins/antDesign";
import {installGlobalComponent} from "@/components";
import App from './App.vue'


createApp(App)
    .use(installElementPlus)
    .use(installAntDesign)
    .use(installGlobalComponent)
    .use(installStores)
    .use(router)
    .mount('#app')
