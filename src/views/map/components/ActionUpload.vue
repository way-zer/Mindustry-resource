<template>
  <el-button v-if="!circle" type="primary" @click="click">
    上传地图
    <el-icon-upload class="h-4"/>
  </el-button>
  <tooltip v-else content="更新地图">
    <el-button circle @click="click">
      <el-icon-upload class="h-4"/>
    </el-button>
  </tooltip>
</template>

<script lang="ts" setup>
import {useRouter} from "vue-router";

const props = defineProps({
  thread: {//如果用于更新地图，不为空
    type: Number,
    require: false
  },
  circle: {
    type: Boolean,
    default: false
  }
})

const router = useRouter()

function click() {
  router.push("/map/upload" + (props.thread ? `?update=${props.thread}` : ''))
}
</script>