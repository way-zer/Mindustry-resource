<template>
  <div class="card bg-base-100 card-md shadow-sm card-border">
    <template v-if="props.title">
      <div class="card-body pb-0">
        <div class="flex flex-row justify-between">
          <h2 class="card-title">{{ props.title }}</h2>
          <el-space>
            <slot name="actions"/>
          </el-space>
        </div>
      </div>
      <div class="divider"/>
      <div class="card-body pt-0">
        <slot/>
      </div>
    </template>
    <div v-else class="card-body">
      <slot/>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
	title?: string
}>()
</script>
