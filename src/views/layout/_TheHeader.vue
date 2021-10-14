<template>
  <el-menu router mode="horizontal" :default-active="$route.path">
    <el-menu-item disabled id="logo">
      <img src="/src/assets/icons-64.png" alt="logo" height="42">
      <span class="hidden-xs-only">Mindustry 资源站</span>
    </el-menu-item>
    <el-menu-item class="navItem" v-for="route in routes" :key="route.path" :index="route.path" :route="route">
      <router-link :to="route"/>
      {{ route.meta?.navName }}
    </el-menu-item>
    <el-menu-item disabled id="userInfo">
      <NavUserInfo/>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import {routes as routes0} from '@/plugins/router'
import NavUserInfo from '@/views/user/components/NavUserInfo.vue'

const routes = routes0.filter(it => it.meta?.navName)
    .sort((a, b) => (a.meta?.navIndex || 0) - (b.meta?.navIndex || 0))
</script>

<style lang="stylus" scoped>
#logo
  cursor default
  opacity unset

  span
    color dodgerblue
    font-size 22px
    font-weight bold

.navItem
  @media only screen and (max-width 768px)
    font-size 12px
    padding 0 6px

#userInfo
  margin-left auto
  cursor default
  opacity unset
</style>