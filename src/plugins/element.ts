import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/display.css';
import 'element-plus/lib/theme-chalk/index.css'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import 'dayjs/locale/zh-cn'
import Vue from 'vue'

export function installElementPlus(app: Vue.App) {
    app.use(ElementPlus, {locale})
}
