<template>
  <a-tooltip title="拷贝换图指令" destroy-tooltip-on-hide>
    <a-popover trigger="click">
      <icon-button icon="el-icon-document-copy" :circle="$props.circle" @click="copy"/>
      <template #content>
        粘贴指令到支持网络换图的服务器使用
        <pre ref="command">/vote map {{ $props.thread }}</pre>
        如果服务器仍在使用旧版本插件,请使用下面指令换图
        <pre>/vote map {{ $props.hash?.replaceAll('-', '') }}</pre>
      </template>
    </a-popover>
  </a-tooltip>
</template>

<script lang="ts">
import {copyContent} from "@/util/copyContent";
import IconButton from "@/components/IconButton.vue";

export default {
  name: "ActionCopy",
  components: {IconButton},
  props: {
    thread: Number,
    hash: String,
    circle: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    copy() {
      copyContent(() => (this.$refs.command))
    }
  }
}
</script>