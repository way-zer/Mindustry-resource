import Vue from 'vue'
import Popover from 'ant-design-vue/lib/popover'
import "ant-design-vue/lib/popover/style/index.css"
import Tooltip from 'ant-design-vue/lib/tooltip'
import "ant-design-vue/lib/tooltip/style/index.css"

export function installAntDesign(app: Vue.App) {
    app.use(Popover)
    app.use(Tooltip)
}
