<template>
  <el-popover trigger="click" :persistent="false" width="unset">
    <template #reference>
      <el-tooltip content="拷贝换图指令">
        <el-button @click="copy" :link="!$props.circle" :circle="$props.circle">
          <el-icon-document-copy/>
        </el-button>
      </el-tooltip>
    </template>
    粘贴指令到支持网络换图的服务器使用
    <pre ref="command">/vote map {{ $props.thread }}</pre>
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

const command = ref<Node>()

function copy() {
  copyContent(() => (command.value!!))
}
</script>