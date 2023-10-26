<template>
  <tooltip content="下载地图">
    <el-button @click="download" :link="!circle" :circle="circle">
      <el-icon-download class="h-4"/>
    </el-button>
  </tooltip>
</template>

<script lang="ts" setup>
import {MapApi} from '@/store/maps/api'
import {ElMessage} from 'element-plus'
import {useStore} from "pinia-class-store";
import {UserStore} from "@/store/user";

const userStore = useStore(UserStore)

const props = withDefaults(defineProps<{
  hash?: string,
  circle?: boolean
}>(), {circle: false})

async function download() {
  if (!props.hash) return
  if (!userStore.logged) {
    userStore.showDialog = true
    return ElMessage.error({message: '请先登录后再下载', duration: 10_000})
  }
  await MapApi.download(props.hash)
}
</script>