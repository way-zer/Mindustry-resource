<script setup lang="ts">
const props = defineProps<{
  onClose: () => void,
  maxWidth?: number | string,
  title?: string,
  contentClass?: string,
}>()
</script>

<template>
  <div role="dialog" class="modal modal-open">
    <PageHeader class="modal-box w-full" style="overflow-y: auto;" :title="props.title" :class="props.contentClass"
                :style="{ maxWidth: props.maxWidth ?? '600' }">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click="props.onClose">
        <el-icon-close class="w-4 absolute right-2 top-2"/>
      </button>
      <slot/>
    </PageHeader>
  </div>
</template>

<style lang="stylus" scoped>
.modal-box
  padding 0
</style>