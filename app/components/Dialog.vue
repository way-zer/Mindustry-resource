<script setup lang="ts">
const props = defineProps<{
  onClose: () => void,
  maxWidth?: number | string,
}>()
</script>

<template>
  <div role="dialog" class="modal modal-open">
    <div class="modal-box w-full max-h-full overflow-y-auto" :style="{ maxWidth: props.maxWidth ?? '600px' }">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click="props.onClose">
        <Icon name="ep:close-bold" size="1.5em"/>
      </button>
      <slot/>
    </div>
  </div>
</template>