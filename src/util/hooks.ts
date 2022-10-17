// @ts-ignore
export const useWatch: typeof import('vue')['watch'] = function (...param: Parameters<typeof import("vue")["watch"]>) {
    if (import.meta.env.SSR) return
    const unwatch = watch(...param)
    onBeforeUnmount(unwatch)
}