<template>
  <el-menu router mode="horizontal" :default-active="$route.name">
    <li class="el-menu-item navItem" id="logo">
      <img src="/src/assets/icons-64.png" alt="logo" height="42">
      <span class="hidden-xs-only">Mindustry 资源站</span>
    </li>
    <el-menu-item class="navItem" v-for="route in routes" :key="route.name" :index="route.name" :route="route">
      {{ route.name }}
    </el-menu-item>
    <li class="el-menu-item" id="userInfo">
      <NavUserInfo/>
    </li>
  </el-menu>
</template>

<script lang="ts">
import {routes} from '@/plugins/router'
import NavUserInfo from '@/views/user/components/NavUserInfo.vue'

import {defineComponent} from 'vue'

export default defineComponent({
  components: {NavUserInfo},
  setup() {
    return {
      routes,
    }
  },
})
</script>

<style scoped lang="stylus">
#logo
  vertical-align center
  cursor default

  span
    color dodgerblue
    font-size 22px
    font-weight bold

.navItem
  @media (max-width 756px)
    font-size 12px
    padding 0 6px

#userInfo
  float right
  cursor default
</style>