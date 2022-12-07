import {ElTooltip} from "element-plus";

export default defineComponent({
    name: "Tooltip",
    props: ElTooltip.props,
    inheritAttrs: false,
    setup(props) {
        const slots = useSlots()
        const ssr = ref(true)
        onMounted(() => ssr.value = false)
        return () => ssr ? slots.default!!()
            : h(ElTooltip, props, slots)
    }
})