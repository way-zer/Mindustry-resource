<template>
  <el-tooltip content="下载地图">
    <el-button @click="download" :link="!$props.circle" :circle="$props.circle">
      <el-icon-download/>
    </el-button>
  </el-tooltip>
</template>

<script lang="ts" setup>
import {MapApi} from '@/store/maps/api'
import {userStore} from '@/store/user'
import {ElMessage} from 'element-plus'

defineProps({
  hash: String,
  circle: {
    type: Boolean,
    default: false,
  },
})

async function download() {
  if (!userStore.logged) {
    userStore.showDialog = true
    return ElMessage.error('请先登录后再下载')
  }
  await MapApi.download(this.$props.hash)
}
</script>