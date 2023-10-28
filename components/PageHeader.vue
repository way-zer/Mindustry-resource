<template>
  <el-card>
    <template #header v-if="props.title">
      <el-row id="header" type="flex" justify="space-between" align="middle">
        <b style="font-size: large">{{ props.title }}</b>
        <el-space>
          <slot name="actions" />
        </el-space>
      </el-row>
    </template>
    <slot />
  </el-card>
</template>

<script lang="ts" setup>
const props = defineProps<{
  title?: string
}>()
</script>
