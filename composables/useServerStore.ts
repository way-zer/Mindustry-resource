import { ServerApi } from "~/backendApi/server";

export default function () {
    const { data, refresh, pending } = useAsyncData("server", ServerApi.list, { default: () => [] })
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
}