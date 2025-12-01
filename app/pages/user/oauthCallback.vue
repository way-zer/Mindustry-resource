<script lang="ts" setup>
const code = useRouteQuery("login_code", null, { transform: String })
const store = useUserStore()

store.registerAutoRedirect()
onMounted(async () => {
	if (code.value) {
		await store.login("oauth", { loginCode: code.value })
	}
})
</script>
<template>
  <el-result v-if="store.logged" icon="success" title="登录成功" sub-title="你可以关闭当前页面，返回应用继续操作"/>
  <el-result v-else icon="error" title="登录失败" sub-title="请检查链接是否正确或已过期"/>
</template>