import { MapApi } from "~/backendApi/maps"
import type { MapInfo } from "~/backendApi/maps/type"

export default defineStore("map", () => {
	const searchKey = useRouteQuery<string | string[], string>("q", [], {
		transform: { get: (it) => it?.toString() ?? "", set: (v) => v || [] },
	})
	const data = ref([] as MapInfo[])

	const loading = ref(false)
	const noMore = ref(false)

	return {
		searchKey,
		data,
		loading,
		noMore,

		async pullMore() {
			if (loading.value || noMore.value) return
			loading.value = true
			const newMaps = await MapApi.list(data.value.length, searchKey.value)
			if (newMaps.length) data.value = data.value.concat(newMaps)
			else noMore.value = true
			loading.value = false
		},
		async search(key: string) {
			while (key.includes("  ")) key = key.replace("  ", " ")
			key = key.trim() //reduce space
			if (key.match(/^\d{5}$/)) {
				navigateTo(`/map/${key}/latest`)
				return
			}
			loading.value = true
			searchKey.value = key
			const newMaps = await MapApi.list(0, key)
			data.value = newMaps
			noMore.value = newMaps.length === 0
			loading.value = false
		},
		async navigateToMaps(searchKey: string) {
			navigateTo({
				path: "/map",
				query: {
					q: searchKey,
				},
			})
		},
	}
})
