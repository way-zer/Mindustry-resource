<template>
  <tooltip content="地图详情">
    <!--    <router-link :to="`/map/${$props.thread}/${$props.hash}`"/>-->
    <el-button @click="click" :link="!$props.circle" :circle="$props.circle">
      <el-icon-more class="h-4"/>
    </el-button>
  </tooltip>
</template>

<script lang="ts" setup>
import Tooltip from "@components/Tooltip";
import {useMapsRouter} from "../_clientRouter";

const props = defineProps({
  thread: {
    type: Number,
    required: true
  },
  hash: {
    type: String,
    default: 'latest',
  },
  circle: {
    type: Boolean,
    default: false,
  },
})

const router = useMapsRouter()

async function click() {
  await router.push({path: `/${props.thread}/${props.hash}`})
}
</script>