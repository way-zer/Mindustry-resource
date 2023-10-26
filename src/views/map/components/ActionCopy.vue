<template>
  <el-button ref="buttonRef" @click="copy" :link="!$props.circle" :circle="$props.circle">
    <el-icon-document-copy class="h-4"/>
    <client-only>
      <el-tooltip content="拷贝换图指令" virtual-triggering :virtual-ref="buttonRef"/>
      <el-popover trigger="click" :persistent="false" width="unset" virtual-triggering :virtual-ref="buttonRef">
        粘贴指令到支持网络换图的服务器使用
        <pre ref="commandRef">/vote map {{ thread }}</pre>
      </el-popover>
    </client-only>
  </el-button>
</template>

<script lang="ts" setup>
import {copyContent} from '@/util/copyContent'
import ClientOnly from "@/components/ClientOnly";

defineProps({
  thread: Number,
  circle: {
    type: Boolean,
    default: false,
  }
})

const buttonRef = ref<HTMLElement>()
const commandRef = ref<Node>()

function copy() {
  copyContent(() => (commandRef.value!!))
}
</script>