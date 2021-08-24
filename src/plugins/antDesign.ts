import Vue from 'vue'
import {Popover, Tooltip} from 'ant-design-vue'

export function installAntDesign(app: Vue.App) {
    app.use(Popover)
    app.use(Tooltip)
}
