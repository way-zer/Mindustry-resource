export default defineComponent({
    name: "ClientOnly",
    inheritAttrs: false,
    setup(_, {slots}) {
        const ssr = ref(true)
        onMounted(() => ssr.value = false)
        return () => ssr.value ? ""
            : slots.default?.()
    }
})