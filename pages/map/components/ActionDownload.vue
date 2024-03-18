<template>
  <tooltip content="下载地图">
    <el-button @click="download" :link="!circle" :circle="circle">
      <el-icon-download class="h-4" />
    </el-button>
  </tooltip>
</template>

<script lang="ts" setup>
import { MapApi } from '@/backendApi/maps'

const props = withDefaults(defineProps<{
  hash?: string,
  mapName?: string,
  circle?: boolean
}>(), { circle: false })

async function download() {
  if (!props.hash) return
  await MapApi.download(props.hash, props.mapName)
}
</script>