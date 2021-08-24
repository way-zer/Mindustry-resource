<template>
  <el-container>
    <el-header>
      <the-header/>
    </el-header>
    <main class="el-main">
      <router-view/>
      <the-login/>
    </main>
    <el-footer id="footer">WayZer ©2021</el-footer>
  </el-container>
</template>

<script lang="ts">
import {routes} from '@/plugins/router'
import TheLogin from '@/views/user/TheLogin.vue'
import {defineComponent} from 'vue'
import TheHeader from '@/views/layout/TheHeader.vue'

export default defineComponent({
  components: {TheHeader, TheLogin},
  setup() {
    return {
      routes: routes.filter(it => it.name),
    }
  },
})
</script>

<style lang="stylus" scoped>
.el-main
  @media (max-width 756px)
    padding 12px 8px

#footer
  text-align center
</style>
