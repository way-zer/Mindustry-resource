<template>
  <el-container>
    <el-header>
      <the-header/>
    </el-header>
    <el-main>
      <router-view/>
      <client-only>
        <the-login/>
      </client-only>
    </el-main>
    <el-footer id="footer" class="test">WayZer ©{{ year }}</el-footer>
  </el-container>
</template>

<script lang="ts" setup>
import TheLogin from '@/views/user/_TheLogin.vue'
import TheHeader from '@/components/TheHeader.vue'
import ClientOnly from "@/components/ClientOnly";

const year = computed(() => new Date().getFullYear())
</script>

<style lang="stylus" scoped>
.el-main
  @media (max-width 756px)
    padding 12px 8px

#footer
  text-align center
</style>
