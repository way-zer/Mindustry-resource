<template>
  <el-tooltip content="拷贝换图指令">
    <el-button ref="buttonRef" @click="copy" :link="!$props.circle" :circle="$props.circle">
      <el-icon-document-copy/>
    </el-button>
  </el-tooltip>

  <el-popover trigger="click" :persistent="false" width="unset" virtual-triggering :virtual-ref="buttonRef">
    粘贴指令到支持网络换图的服务器使用
    <pre ref="commandRef">/vote map {{ $props.thread }}</pre>
    如果服务器仍在使用旧版本插件,请使用下面指令换图
    <pre>/vote map {{ $props.hash?.replaceAll('-', '') }}</pre>
  </el-popover>
</template>

<script lang="ts" setup>
import {copyContent} from '@/util/copyContent'

defineProps({
  thread: Number,
  hash: String,
  circle: {
    type: Boolean,
    default: false,
  }
})

const buttonRef = ref<Node>()
const commandRef = ref<Node>()

function copy() {
  copyContent(() => (commandRef.value!!))
}
</script>