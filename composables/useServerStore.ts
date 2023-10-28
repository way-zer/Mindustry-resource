import { ServerApi } from "~/backendApi/server";

export default defineStore("server", () => {
    const { data, refresh, pending } = asyncData(ServerApi.list, [], { swr: true })
    const autoRefresh = ref(true)
    return {
        pending, data,
        autoRefresh,

        refresh,
        async add(address: string) {
            await ServerApi.add(address)
            await refresh()
        }
    }
})