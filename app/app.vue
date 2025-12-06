<template>
  <Head>
    <Link rel="icon" href="/icons-192.20210425.png"/>
    <VitePwaManifest/>
  </Head>
  <el-container>
    <el-header>
      <the-header/>
    </el-header>
    <el-main class="max-md:px-0 max-md:pb-2">
      <NuxtLoadingIndicator/>
      <NuxtPage/>
    </el-main>
    <el-footer class="text-center">WayZer ©{{ year }}</el-footer>
  </el-container>
</template>

<script lang="ts" setup>
const year = computed(() => new Date().getFullYear())
</script>