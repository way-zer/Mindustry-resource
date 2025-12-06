<template>
	<PureDialog max-width="1200px" @close="() => navigateTo('/map')">
		<MapDetail
			v-if="detail"
			:detail="detail"
			:do-delete="doDelete"
			:path="path"
			:admin="admin"
		/>
	</PureDialog>
</template>
<script lang="tsx" setup>
import { MapApi } from "@/backendApi/maps"
import MapDetail from "../components/MapDetail.vue"

const userStore = useUserStore()
const mapStore = useMapStore()

const path = computed(() =>
	import.meta.server ? useRequestURL().toString() : location.toString(),
)
const thread = useRouteParams<string>("thread")
const { data: detail, error: _error } = await useAsyncData(
	() => {
		return MapApi.detail(thread.value)
	},
	{ deep: false },
)

const mapName = computed(() => detail.value?.tags?.name)
const admin = computed(() => {
	if (!userStore.logged) return false
	return userStore.admin || userStore.info.gid == detail.value?.user?.gid
})

useHead({
	title: computed(() => {
		return mapName.value ? "地图详情 - " + mapName.value : "地图详情"
	}),
})

async function doDelete() {
	await MapApi.deleteThread(thread.value)
	mapStore.data = mapStore.data.filter((it) => "" + it.id !== thread.value)
	navigateTo({ path: "/map" }, { replace: true })
}
</script>

<style scoped>
h1,
h2,
h3,
h4,
h5,
h6 {
	margin-top: 0;
	margin-bottom: 0.5em;
	color: rgba(0, 0, 0, 0.85);
	font-weight: 500;
}

#footer {
	text-align: center;
}
</style>
