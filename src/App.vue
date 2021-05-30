<template>
  <el-container>
    <el-header>
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
    </el-header>
    <main class="el-main">
      <router-view/>
      <the-login/>
    </main>
    <el-footer id="footer">WayZer ©2021</el-footer>
  </el-container>
</template>

<script type="ts">
import {routes} from '@/plugins/router'
import NavUserInfo from '@/views/user/components/NavUserInfo.vue'
import TheLogin from '@/views/user/TheLogin.vue'

export default {
  components: {TheLogin, NavUserInfo},
  data: () => ({
    routes: routes.filter(it => it.name),
    f: (e) => {
      console.log(e)
    },
  }),
}
</script>

<style lang="stylus" scoped>
#logo
  display list-item
  color dodgerblue
  font-size 22px
  font-weight bold
  cursor default
.navItem
  @media (max-width 756px)
    font-size 12px
    padding 0 6px

#userInfo
  float right
  cursor default

.el-main
  @media (max-width 756px)
    padding 12px 8px

#footer
  text-align center
</style>
