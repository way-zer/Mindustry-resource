<template>
  <a-tooltip title="下载地图" destroy-tooltip-on-hide>
    <icon-button icon="el-icon-download" :circle="$props.circle" @click="download"/>
  </a-tooltip>
</template>

<script lang="ts">
import IconButton from '@/components/IconButton.vue'
import {ElMessage} from 'element-plus'
import {MapApi} from '@/store/maps/api'
import {userStore} from '@/store/user'

export default {
  name: 'ActionDownload',
  components: {IconButton},
  props: {
    hash: String,
    circle: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    async download() {
      if (!userStore.logged) {
        userStore.showDialog = false
        return ElMessage.error('请先登录后再下载')
      }
      await MapApi.download(this.$props.hash)
    },
  },
}
</script>