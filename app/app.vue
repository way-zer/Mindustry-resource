<template>
  <Head>
    <Link rel="icon" href="/icons-192.20210425.png"/>
    <VitePwaManifest/>
  </Head>
  <el-container>
    <el-header>
      <the-header/>
    </el-header>
    <el-main>
      <NuxtLoadingIndicator/>
      <NuxtPage/>
    </el-main>
    <el-footer class="text-center">WayZer ©{{ year }}</el-footer>
  </el-container>
</template>

<script lang="ts" setup>
const year = computed(() => new Date().getFullYear())
</script>

<style lang="stylus">
body
  margin 0
</style>

<style lang="stylus" scoped>
.el-main
  @media (max-width 756px)
    padding 12px 4px 12px 8px

//let right less space due to scrollbar
</style>