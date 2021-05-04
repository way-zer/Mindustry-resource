import Vue from 'vue'
import Popover from 'ant-design-vue/es/popover'
import 'ant-design-vue/es/popover/style/css'
import Tooltip from 'ant-design-vue/es/tooltip'
import 'ant-design-vue/es/tooltip/style/css'

export function installAntDesign(app: Vue.App) {
    app.use(Popover)
    app.use(Tooltip)
}
