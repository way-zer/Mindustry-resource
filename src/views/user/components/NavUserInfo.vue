<template>
  <div v-if="userModel.logged">
    Hi {{userModel.info?.name}}
    <a @click="userModel.logout">登出</a>
  </div>
  <el-button v-else type="text" @click="login">登录</el-button>
</template>

<script lang="ts">
import {default as defineComponent} from "@/store/mobxObserver";
import userModel from "@/store/user/model";

export default defineComponent({
  name: "_NavUserInfo",
  setup() {
    return {
      userModel,
      login(){
        userModel.setDialog(true)
      }
    }
  }
})
</script>

<style scoped>

</style>