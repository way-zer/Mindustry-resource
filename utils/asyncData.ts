type Options = {
    /**@default true */
    server?: boolean
    /**@default false */
    swr?: boolean
    /**@default false */
    resetBeforeRefresh?: boolean
}

/** 适配NUXT和pinia的异步获取
 * 如果server获取过，且不开启swr，则客户端自动跳过获取 */
export default function <T>(f: () => Promise<T>, initialValue: T, options?: Options) {
    //初始状态 pending = true, data = initialValue, error = null, init = false
    //直接加载 data=v, pending = false, error = null, init = true
    //Promise加载 pending = true, error = null, init = true
    //Promise成功 data=v, pending = false
    //Promise失败 error=e, pending = false

    let init = false//是否开始加载
    let _data = initialValue
    const pending = ref(true)
    const error = ref<Error | null>(null)

    const data = customRef((track, trigger) => ({
        get() {
            if (!init) execute()
            track()
            return _data
        },
        set(value) {
            init = true
            pending.value = false
            _data = value
            trigger()
        },
    }))

    async function execute() {
        init = true
        pending.value = true
        error.value = null
        if (options?.resetBeforeRefresh) data.value = initialValue
        await f().then(d => {
            data.value = d
        }, e => {
            error.value = e
            pending.value = false
        })
    }

    if (import.meta.server && options?.server !== false)
        onServerPrefetch(execute)
    else if (options?.swr) execute()
    return {
        data, pending, error, refresh: async () => {
            await execute()
            if (error.value) throw error.value
            return data.value
        }
    }
}