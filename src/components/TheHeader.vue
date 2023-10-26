<template>
  <el-menu router mode="horizontal" :default-active="navRoutes.find(it=>$route.path.startsWith(it.path))?.path">
    <li class="inline-flex flex-none items-center w-auto">
      <img src="/src/assets/icons-64.png" alt="logo" class="h-12 hidden md:block">
      <span class="text-22px font-bold" style="color: dodgerblue">Mindustry 资源站</span>
    </li>
    <el-menu-item v-for="route in navRoutes" :key="route.path" :index="route.path" :route="route.path">
      {{ route.name }}
    </el-menu-item>
    <el-menu-item disabled style="margin-left: auto">
      <NavUserInfo/>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import NavUserInfo from '@/components/NavUserInfo.vue'
import {navRoutes} from "@/const";
</script>

<style lang="stylus" scoped>
.is-disabled
  cursor default
  opacity unset
</style>