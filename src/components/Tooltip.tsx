import { ElTooltip } from "element-plus";
import { defineComponent, ref, onMounted, h } from "vue";

export default defineComponent({
    ...ElTooltip,
    inheritAttrs: false,
    setup(props, { slots }) {
        const ssr = ref(true)
        onMounted(() => ssr.value = false)
        return () => ssr.value ? slots.default!!()
            : h(ElTooltip, props, slots)
    }
})