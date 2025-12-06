<template>
	<app-tooltip content="下载地图">
		<el-button :link="!circle" :circle="circle" @click="download">
			<Icon name="ep:download" />
		</el-button>
	</app-tooltip>
</template>

<script lang="ts" setup>
import { MapApi } from "@/backendApi/maps"

const props = withDefaults(
	defineProps<{
		thread: number
		mapName?: string
		circle?: boolean
	}>(),
	{ circle: false, mapName: undefined },
)

async function download() {
	await MapApi.download("" + props.thread)
}
</script>
