import type {MapDetail} from '~/backendApi/maps/type'
import {MapApi} from '~/backendApi/maps'

function initialSearchKey() {
    if (import.meta.server) {
        return useRequestURL().searchParams.get('q') || ''
    } else if (location) {
        return new URL(location.href).searchParams.get('q') || ''
    }
    return ''
}

export default defineStore("map", () => {
    const searchKey = ref(initialSearchKey())
    const {data} = asyncData(() => MapApi.list(0, searchKey.value), [])
    const loading = ref(false)
    const noMore = ref(false)

    const query = useUrlSearchParams('history')

    return {
        searchKey, data, loading, noMore,

        async pullMore() {
            if (loading.value) return
            loading.value = true
            const newMaps = await MapApi.list(data.value.length, searchKey.value)
            if (newMaps.length) data.value = data.value.concat(...newMaps)
            else noMore.value = true
            loading.value = false
        },
        async search(key: string) {
            while (key.includes('  '))
                key = key.replace('  ', ' ').trim()//reduce space
            if (key == searchKey.value) return
            loading.value = true
            searchKey.value = query.q = key
            if (!key.length) query.q = []
            const newMaps = await MapApi.list(0, key)
            data.value = newMaps
            noMore.value = newMaps.length === 0
            loading.value = false
        }
    }
})

export function useMapDetail(thread: string, version: string) {
    const key = `${thread}/${version}`
    return useAsyncData<MapDetail>('map-detail/' + key, () => MapApi.detail(thread, version))
}