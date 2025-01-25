<script lang="ts" setup>
import {type AuthInfo, ServerApi} from "~/backendApi/server";

const user = useUserStore()
const query = useRoute().query as AuthInfo
const success = ref(false)

async function submit() {
  if (!user.logged) return user.redirectToLogin()
  await ServerApi.auth(query)
  success.value = true
}

function exit() {
  window.close()
}

</script>
<template>
  <el-result v-if="success" icon="success" title="操作成功" sub-title="你可以关闭当前页面，返回服务器继续操作"/>
  <div v-else-if="query" class="w-full max-w-[400px] m-auto p-4 text-center">
    <h2 class="text-center w-full">资源站统一登录</h2>
    <el-descriptions :column="1" border>
      <el-descriptions-item label="UUID">{{ query.uid }}</el-descriptions-item>
      <el-descriptions-item label="客户端IP">{{ query.clientIp }}</el-descriptions-item>
    </el-descriptions>
    <el-row class="relative mt-4 p-4 justify-evenly">
      <el-button type="warning" @click="() => submit()">登录</el-button>
      <el-button type="info" @click="exit">取消</el-button>
      <div v-if="!user.logged" class="mask flex items-center justify-center rounded-4">
        <el-button type="primary" @click="user.redirectToLogin()">请先登录</el-button>
      </div>
    </el-row>
  </div>
  <el-result v-else icon="error" title="找不到授权请求,或请求已过期"/>
</template>
<style lang="stylus" scoped>
.mask
  position absolute
  width 100%
  height 100%
  left 0
  top 0
  background-color rgba(0, 0, 0, 0.8)
</style>
