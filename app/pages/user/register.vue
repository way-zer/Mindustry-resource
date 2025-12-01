<template>
  <el-card class="container max-w-400px m-auto">
    <h2 class="text-center text-lg font-bold m-4">注册新用户</h2>
    <el-alert type="info" :closable="false">
      用户不存在，输入一个名字注册一个新用户吧<br/>
      * 名字仅用作展示，可在个人信息中修改<br/>
      * 注册成功后，该登录方式不能再和其他账号关联
    </el-alert>
    <el-form ref="formRef" :model="form" size="large">
      <el-form-item prop="name" :rules="[
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min:2, message: '用户名太短，至少2个字符', trigger: 'change'},
          {max:16, message: '用户名太长，最多16字符', trigger: 'change'},
        ]">
        <el-input v-model="form.name" placeholder="取一个用户名" autocomplete="username" autofocus/>
      </el-form-item>
      <el-button type="primary" class="w-full" @click="onSubmit">注册新用户</el-button>
    </el-form>
    <el-divider>或</el-divider>
    <el-button class="w-full my-1" @click="back(false)">关联已有账号</el-button>
    <br/>
    <el-button class="w-full my-1" @click="back(true)">取消登录</el-button>
  </el-card>
</template>

<script lang="ts" setup>
import type { FormInstance } from "element-plus"

const store = useUserStore()
const route = useRoute()

const formRef = ref<FormInstance>()
const form = reactive({
	name: "",
})

store.registerAutoRedirect()

async function onSubmit() {
	if (!formRef.value || !(await formRef.value.validate())) return
	await store.register({ name: form.name })
}

async function back(discard: boolean) {
	if (discard) {
		store.registerCode = null
	}
	navigateTo({ path: "/user/login", query: route.query }, { replace: true })
}
</script>

<style scoped>
</style>
