export default defineComponent({
    name: "ClientOnly",
    inheritAttrs: false,
    setup({}, {slots}) {
        const ssr = ref(true)
        onMounted(() => ssr.value = false)
        return () => ssr ? "" : <>{slots.default}</>
    }
})