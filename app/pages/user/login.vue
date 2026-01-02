<template>
	<el-card class="container max-w-100 m-auto">
		<h2 class="text-center text-lg font-bold m-4">登录你的账号</h2>
		<login-form-email v-if="method === 'email'" />
		<login-form-password v-else-if="method === 'username'" />
		<el-divider>或</el-divider>
		<el-button class="w-full my-1" @click="oauthLogin('discord')"
			>使用Discord继续</el-button
		>
		<br />
		<el-button
			v-if="method != 'email'"
			class="w-full my-1"
			@click="method = 'email'"
			>使用QQ邮箱继续</el-button
		>
		<el-button
			v-if="method != 'username'"
			class="w-full my-1"
			@click="method = 'username'"
			>老用户使用密码登录</el-button
		>
	</el-card>
</template>

<script lang="ts" setup>
import { UserApi } from "~/backendApi/user"
import { autoRedirectWhenLogged } from "./_/auth"
import LoginFormEmail from "./_/LoginFormEmail.vue"
import LoginFormPassword from "./_/LoginFormPassword.vue"

const method = ref<"username" | "email">("email")

autoRedirectWhenLogged()

async function oauthLogin(provider: string) {
	const callback = "/user/oauthCallback"
	window.location.href = UserApi.oauthUrl(provider, callback)
}
</script>

<style scoped></style>
