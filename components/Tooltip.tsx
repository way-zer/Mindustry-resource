import {ElTooltip} from "element-plus";

export default defineComponent({
    ...ElTooltip,
    inheritAttrs: false,
    sorts: ['content'],
    setup(props, {slots}) {
        const ssr = ref(true)
        onMounted(() => ssr.value = false)
        return () => ssr.value ? slots.default!!()
            : h(ElTooltip, props, slots)
    }
})