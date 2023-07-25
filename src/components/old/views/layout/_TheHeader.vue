<template>
  <el-menu router mode="horizontal" default-active="/server">
    <el-menu-item disabled id="logo" class="cursor-default" style="opacity: unset;">
      <img src="@assets/icons-64.png" alt="logo" height="42">
      <span class="hidden sm:block color-primary text-6 font-bold">Mindustry 资源站</span>
    </el-menu-item>
    <el-menu-item class="navItem" v-for="route in routes" :key="route.path" :index="route.path" :route="route">
      <router-link :to="route" />
      {{ route.name }}
    </el-menu-item>
    <el-menu-item class="navItem cursor-default" disabled style="opacity: unset;margin-left: auto;">
      <NavUserInfo />
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import NavUserInfo from '@/views/user/components/NavUserInfo.vue'

const routes = [
  { path: '/map', name: "地图" },
  { path: '/server', name: "服务器列表" },
  { path: '/game', name: "游戏下载" },
  { path: '/masm', name: "逻辑编辑器" },
  { path: '/about', name: "关于" },
]
</script>

<style lang="stylus" scoped>
.navItem
  @media only screen and (max-width 768px)
    font-size 12px
    padding 0 6px
</style>