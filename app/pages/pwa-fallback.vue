<template>
  <h2 class="text-center">Page just for Offline</h2>
  <NuxtLink to="/map">进入首页</NuxtLink>
</template>
<script lang="ts" setup>
useHead({
  title: '加载中',
})
navigateTo("/map")
</script>