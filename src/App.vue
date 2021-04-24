<template>
  <el-container>
    <el-header>
      <el-menu router mode="horizontal" :default-active="$route.name">
        <li class="el-menu-item" id="logo">Mindustry 资源站 </li>
        <el-menu-item v-for="route in routes" :key="route.name" :index="route.name" :route="route">
          {{ route.name }}
        </el-menu-item>
        <li class="el-menu-item" id="userInfo"><NavUserInfo/></li>
      </el-menu>
    </el-header>
    <el-main>
      <router-view/>
    </el-main>
    <el-footer id="footer">WayZer ©2021</el-footer>
  </el-container>
</template>

<script type="ts">
import {routes} from "@/plugins/router";
import NavUserInfo from "@/views/user/components/NavUserInfo.vue";

export default {
  components: {NavUserInfo},
  data: () => ({
    routes: routes.filter(it => it.name)
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
#userInfo
  float right
  cursor default
#footer
  text-align center
</style>
