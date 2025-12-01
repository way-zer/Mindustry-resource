<template>
  <tooltip content="下载地图">
    <el-button @click="download" :link="!circle" :circle="circle">
      <Icon name="ep:download"/>
    </el-button>
  </tooltip>
</template>

<script lang="ts" setup>
import { MapApi } from "@/backendApi/maps"

const props = withDefaults(
	defineProps<{
		thread: number
		mapName?: string
		circle?: boolean
	}>(),
	{ circle: false },
)

async function download() {
	await MapApi.download("" + props.thread)
}
</script>