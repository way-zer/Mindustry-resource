<template>
  <tooltip content="地图详情">
    <!--    <router-link :to="`/map/${$props.thread}/${$props.hash}`"/>-->
    <el-button @click="click" :link="!$props.circle" :circle="$props.circle">
      <el-icon-more/>
    </el-button>
  </tooltip>
</template>

<script lang="ts" setup>
import {useRouter} from 'vue-router'

const props = defineProps({
  thread: Number,
  hash: {
    type: String,
    default: 'latest',
  },
  circle: {
    type: Boolean,
    default: false,
  },
})

const router = useRouter()

async function click() {
  await router.push({path: `/map/${props.thread}/${props.hash}`})
}
</script>