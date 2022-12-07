<template>
  <div v-if="userStore.logged">
    Hi {{ userStore.info?.name }}
    <a @click="userStore.logout">登出</a>
  </div>
  <el-link v-else :underline="false" @click="login">登录</el-link>
</template>

<script lang="ts" setup>
import {useStore} from "pinia-class-store";
import {UserStore} from "@/store/user";

const userStore = useStore(UserStore)
onMounted(() => {
  if (userStore.first)
    userStore.refresh()
})

function login() {
  userStore.showDialog = true
}
</script>

<style scoped>

</style>