<template>
  <div v-if="userStore.logged">
    Hi {{ userStore.info?.name }}
    <a @click="userStore.logout">登出</a>
  </div>
  <el-button v-else type="text" @click="login">登录</el-button>
</template>

<script lang="ts">
import {userStore} from '@/store/user'
import {defineComponent} from 'vue'

export default defineComponent({
  name: '_NavUserInfo',
  setup() {
    return {
      userStore,
      login() {
        userStore.showDialog = true
      },
    }
  },
})
</script>

<style scoped>

</style>