import {ElTooltip} from "element-plus";

export default defineComponent({
    inheritAttrs: false,
    sorts: ['content','default'],
    setup(props, {slots}) {
        const ssr = ref(true)
        onMounted(() => ssr.value = false)
        return () => ssr.value ? slots.default!!()
            : h(ElTooltip, props, slots)
    }
})