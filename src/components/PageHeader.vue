<template>
  <el-card>
    <template #header>
      <el-row id="header" type="flex" justify="space-between" align="middle">
        <b style="font-size: large">{{ title }}</b>
        <el-space>
          <slot name="actions"/>
        </el-space>
      </el-row>
    </template>
    <slot/>
  </el-card>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'PageHeader',
  props: {
    title: String,
  },
})
</script>

<style scoped>

</style>