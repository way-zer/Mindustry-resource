<template>
	<el-form ref="formRef" :model="model" size="large">
		<el-form-item
			prop="login"
			:rules="[
				{ required: true, message: '请输入用户名', trigger: 'blur' },
				{
					pattern: /[-_a-zA-Z0-9]{6,16}/,
					message: '用户名需要6-16位字母数字下划线构成',
					trigger: 'change',
				},
			]"
		>
			<el-input
				v-model="model.login"
				placeholder="邮箱/用户名"
				autocomplete="username"
				autofocus
			/>
		</el-form-item>
		<el-form-item
			prop="password"
			:rules="[
				{ required: true, message: '请输入密码', trigger: 'blur' },
				{ min: 6, message: '密码需要至少6个字符', trigger: 'change' },
			]"
		>
			<el-input
				v-model="model.password"
				placeholder="密码"
				autocomplete="current-password"
				type="password"
			/>
		</el-form-item>
		<el-button type="primary" class="w-full" @click="onSubmit">登录</el-button>
	</el-form>
</template>

<script setup lang="ts">
const store = useUserStore()

const formRef = useTemplateRef("formRef")
const model = reactive({
	login: "",
	password: "",
})
async function onSubmit() {
	if (!formRef.value || !(await formRef.value.validate())) return
	if (model.login.startsWith("qq")) {
		ElMessage.error("QQ作为用户名已弃用，请使用QQ邮箱登录")
		return
	}
	await store.login("username", {
		user: model.login,
		password: model.password,
	})
}
</script>
