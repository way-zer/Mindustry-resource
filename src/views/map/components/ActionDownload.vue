<template>
  <el-tooltip content="下载地图">
    <el-button @click="download" :link="!circle" :circle="circle">
      <el-icon-download/>
    </el-button>
  </el-tooltip>
</template>

<script lang="ts" setup>
import {MapApi} from '@/store/maps/api'
import {userStore} from '@/store/user'
import {ElMessage} from 'element-plus'

const {hash, circle = false} = defineProps<{
  hash: string,
  circle?: boolean
}>()

async function download() {
  if (!userStore.logged) {
    userStore.showDialog = true
    return ElMessage.error('请先登录后再下载')
  }
  await MapApi.download(hash)
}
</script>