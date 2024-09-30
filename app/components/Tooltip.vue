<template>
  <client-only>
    <template #fallback>
      <slot/>
    </template>
    <el-tooltip v-bind="$attrs">
      <template #content>
        <slot name="content"/>
      </template>
      <slot/>
    </el-tooltip>
  </client-only>
</template>