export default defineComponent(function ({}, {slots}) {
    if (import.meta.env.SSR) return () => ""
    else {
        return slots.default
    }
})