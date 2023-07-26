<template>
  <el-button v-if="!circle" type="primary" @click="click">
    上传地图<i class="el-icon-upload el-icon--right"/>
  </el-button>
  <tooltip v-else content="更新地图">
    <el-button circle @click="click">
      <el-icon-upload class="h-4"/>
    </el-button>
  </tooltip>
</template>

<script lang="ts" setup>
import Tooltip from "@components/Tooltip";
import {useMapsRouter} from "../_clientRouter";

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

const router = useMapsRouter()

function click() {
  router.push("/upload" + (props.thread ? `?update=${props.thread}` : ''))
}
</script>