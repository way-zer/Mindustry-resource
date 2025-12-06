<script lang="ts" setup>
import { ServerApi } from "./_api"

const user = useUserStore()
const code = useRouteQuery<string>("code")
const { data: info } = await useAsyncData(
	() => ServerApi.authInfo(code.value),
	{ immediate: Boolean(code) },
)
const success = ref(false)

async function submit() {
	if (!user.logged) return user.redirectToLogin()
	await ServerApi.auth(code.value)
	success.value = true
}

function exit() {
	window.close()
}
</script>
<template>
  <el-result v-if="success" icon="success" title="操作成功" sub-title="你可以关闭当前页面，返回服务器继续操作"/>
  <div v-else-if="info" class="w-full max-w-[400px] m-auto p-4 text-center">
    <h2 class="text-center w-full">资源站统一登录</h2>
    <el-descriptions :column="1" border>
      <el-descriptions-item label="资源站账号">{{ user.info.name }}</el-descriptions-item>
      <el-descriptions-item label="游戏ID">{{ info.name }}</el-descriptions-item>
      <el-descriptions-item label="UUID">{{ info.uid }}</el-descriptions-item>
      <el-descriptions-item label="客户端IP">{{ info.clientIp }}</el-descriptions-item>
    </el-descriptions>
    <el-row class="relative mt-4 p-4 justify-evenly">
      <el-button type="warning" @click="() => submit()">登录</el-button>
      <el-button type="info" @click="exit">取消</el-button>
      <div v-if="!user.logged" class="absolute w-full h-full left-0 top-0 bg-black/80 flex items-center justify-center rounded-4">
        <el-button type="primary" @click="user.redirectToLogin()">请先登录</el-button>
      </div>
    </el-row>
  </div>
  <el-result v-else icon="error" title="找不到授权请求,或请求已过期"/>
</template>
