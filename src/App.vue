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
import TheLogin from '@/views/user/_TheLogin.vue'
import {defineComponent} from 'vue'
import TheHeader from '@/views/layout/_TheHeader.vue'

export default defineComponent({
  components: {TheHeader, TheLogin},
})
</script>

<style lang="stylus" scoped>
.el-main
  @media (max-width 756px)
    padding 12px 8px

#footer
  text-align center
</style>
