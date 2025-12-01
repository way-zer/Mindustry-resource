<template>
  <el-button ref="buttonRef" @click="copy()" :link="!props.circle" :circle="props.circle">
    <Icon name="ep:document-copy" />
    <client-only>
      <el-tooltip content="拷贝换图指令" virtual-triggering :virtual-ref="buttonRef" />
      <el-popover trigger="click" :persistent="false" width="unset" virtual-triggering :virtual-ref="buttonRef">
        粘贴指令到支持网络换图的服务器使用
        <pre ref="commandRef">{{ content }}</pre>
      </el-popover>
    </client-only>
  </el-button>
</template>

<script lang="ts" setup>

const props = defineProps({
  thread: Number,
  circle: {
    type: Boolean,
    default: false,
  }
})

const buttonRef = ref<HTMLElement>()
const commandRef = useTemplateRef<Node>("commandRef")
const content = computed(() => `/vote map ${props.thread}`)
const { copy, copied } = useClipboard({
  source: content,
  legacy: true,
})
watchPostEffect(() => {
  if (copied.value) {
    ElMessage.success('换图指令已复制到剪贴板')
  }
})
</script>