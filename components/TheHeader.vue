<template>
  <el-menu router mode="horizontal" :default-active="navRoutes.find(it => $route.path.startsWith(it.path))?.path">
    <el-menu-item disabled>
      <img src="~/assets/icons-64.png" alt="logo" class="h-12 hidden md:block">
      <span class="text-22px font-bold" style="color: dodgerblue">Mindustry 资源站</span>
    </el-menu-item>
    <el-menu-item v-for="route in navRoutes" :key="route.path" :index="route.path" :route="route.path">
      {{ route.name }}
    </el-menu-item>
    <el-menu-item disabled style="margin-left: auto">
      <div v-if="logged">
        Hi {{ userInfo.name }}
        <el-link :underline="false" @click="logout">登出</el-link>
      </div>
      <el-link v-else :underline="false" @click="() => showDialog = true">登录</el-link>
    </el-menu-item>
  </el-menu>
  <login-dialog v-if="showDialog" />
</template>

<script lang="ts" setup>
const { info: userInfo, showDialog, logged, logout } = useUserStore()
</script>

<style lang="stylus" scoped>
.is-disabled
  cursor default
  opacity unset
</style>