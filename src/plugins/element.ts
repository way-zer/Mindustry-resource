import {
    ElAlert,
    ElBacktop,
    ElButton,
    ElCard,
    ElCol,
    ElCollapse,
    ElCollapseItem,
    ElContainer,
    ElDialog,
    ElDivider,
    ElEmpty,
    ElFooter,
    ElForm,
    ElFormItem,
    ElHeader,
    ElIcon,
    ElInput,
    ElLoading,
    ElMain,
    ElMenu,
    ElMenuItem,
    ElRadioButton,
    ElRadioGroup,
    ElRow,
    ElSpace,
    ElSwitch,
    ElTable,
    ElTableColumn,
    ElTag,
    ElUpload,
} from 'element-plus'
import 'element-plus/lib/theme-chalk/display.css'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import 'dayjs/locale/zh-cn'
import Vue from 'vue'

const components = [
    ElContainer, ElHeader, ElFooter, ElMain,
    ElCol, ElRow, ElSpace, ElDivider,
    ElMenu, ElMenuItem,
    ElCard, ElDialog, ElEmpty,
    ElTable, ElTableColumn,
    ElCollapse, ElCollapseItem,
    ElForm, ElFormItem, ElInput, ElSwitch,
    ElButton, ElTag, ElRadioGroup, ElRadioButton,
    ElLoading,
    ElIcon,
    ElBacktop,
    ElUpload, ElAlert,
]

export function installElementPlus(app: Vue.App) {
    components.forEach(app.use)
    app.config.globalProperties.$ELEMENT = {locale, zIndex: 100}
}
