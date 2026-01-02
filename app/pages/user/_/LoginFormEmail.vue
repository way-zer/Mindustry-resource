<template>
	<el-form ref="formRef" :model="model" size="large">
		<el-form-item
			prop="qq"
			:rules="[
				{ required: true, message: '请输入QQ号', trigger: 'blur' },
				{ pattern: /[0-9]{6,11}/, message: '格式错误', trigger: 'change' },
			]"
		>
			<el-input v-model="model.qq" placeholder="QQ号" autofocus>
				<template #append>@qq.com</template>
			</el-input>
		</el-form-item>
		<el-form-item prop="code" required>
			<el-input v-model="model.code" placeholder="邮箱验证码">
				<template #append>
					<el-button v-if="sendEmailCoolDown <= 0" @click="SendEmailCode"
						>发送验证码</el-button
					>
					<el-button v-else disabled
						>重新获取验证码({{ sendEmailCoolDown }})</el-button
					>
				</template>
			</el-input>
		</el-form-item>
		<el-button type="primary" class="w-full" @click="onSubmit"
			>登录/注册</el-button
		>
	</el-form>
</template>

<script setup lang="ts">
import { UserApi } from "~/backendApi/user"

const store = useUserStore()

const model = reactive({
	qq: "",
	code: "",
})

const formRef = useTemplateRef("formRef")
const sendEmailCoolDown = ref(0)

async function SendEmailCode() {
	if (!formRef.value || !(await formRef.value?.validateField("qq"))) return
	sendEmailCoolDown.value = 60
	const interval = setInterval(() => {
		sendEmailCoolDown.value--
		if (sendEmailCoolDown.value <= 0) clearInterval(interval)
	}, 1000)
	await UserApi.sendEmail(model.qq + "@qq.com")
}

async function onSubmit() {
	if (!formRef.value || !(await formRef.value.validate())) return
	await store.login("email", {
		email: model.qq + "@qq.com",
		code: model.code,
	})
}
</script>
