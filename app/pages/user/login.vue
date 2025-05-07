<template>
  <el-card class="container max-w-400px m-auto">
    <template v-if="method==='username'">
      <h2 class="text-center text-lg font-bold m-4">登录你的账号</h2>
      <el-form ref="formRef" :model="form1" size="large">
        <el-form-item prop="login" :rules="[
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {pattern: /[-_a-zA-Z0-9]{6,16}/, message: '用户名需要6-16位字母数字下划线构成', trigger: 'change'},
        ]">
          <el-input v-model="form1.login" placeholder="邮箱/用户名" autocomplete="username" autofocus/>
        </el-form-item>
        <el-form-item prop="password" :rules="[
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, message: '密码需要至少6个字符', trigger: 'change'},
        ]">
          <el-input v-model="form1.password" placeholder="密码" autocomplete="current-password" type="password"/>
        </el-form-item>
        <el-button type="primary" class="w-full" @click="onSubmit">登录</el-button>
      </el-form>
    </template>
    <template v-if="method==='email'">
      <h2 class="text-center text-lg font-bold m-4">QQ邮箱登录</h2>
      <el-form ref="formRef" :model="form2" size="large">
        <el-form-item prop="qq" :rules="[
          {required: true, message: '请输入QQ号', trigger: 'blur'},
          {pattern: /[0-9]{6,11}/, message: '格式错误', trigger: 'change'},
        ]">
          <el-input v-model="form2.qq" placeholder="QQ号" autofocus>
            <template #append>@qq.com</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="code" required>
          <el-input v-model="form2.code" placeholder="邮箱验证码">
            <template #append>
              <el-button v-if="sendEmailCoolDown <= 0" @click="SendEmailCode">发送验证码</el-button>
              <el-button v-else disabled>重新获取验证码({{ sendEmailCoolDown }})</el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-button type="primary" class="w-full" @click="onSubmit">登录/注册</el-button>
      </el-form>
    </template>
    <el-divider>或</el-divider>
    <el-button class="w-full my-1" v-if="method!='username'" @click="method='username'">使用密码登录</el-button>
    <el-button class="w-full my-1" v-if="method!='email'" @click="method='email'">使用QQ邮箱一键登录</el-button>
    <br/>
    <el-button class="w-full my-1" @click="store.login('oauth',{provider:'discord'})">使用Discord一键登录</el-button>
  </el-card>
</template>

<script lang="ts" setup>
import {UserApi} from "~/backendApi/user";

const store = useUserStore()

const method = ref<'username' | 'email'>("username")
const formRef = useTemplateRef("formRef")
const form1 = reactive({
  login: '',
  password: ''
})
const form2 = reactive({
  qq: '',
  code: ''
})

watchPostEffect(async () => {
  if (store.logged) {
    await store.redirectBack()
    ElMessage.success("登录成功")
  }
})

const sendEmailCoolDown = ref(0)

async function SendEmailCode() {
  if (!formRef.value || !await formRef.value?.validateField('qq')) return
  sendEmailCoolDown.value = 60
  const interval = setInterval(() => {
    sendEmailCoolDown.value--
    if (sendEmailCoolDown.value <= 0) clearInterval(interval)
  }, 1000)
  await UserApi.sendEmail(form2.qq + "@qq.com")
}

async function onSubmit() {
  if (!formRef.value || !await formRef.value.validate()) return;
  if (method.value === 'username') {
    if (form1.login.startsWith("qq")) {
      ElMessage.error("QQ作为用户名已弃用，请使用QQ邮箱登录")
      return
    }
    await store.login('username', {user: form1.login, password: form1.password})
  } else if (method.value === 'email')
    await store.login('email', {email: form2.qq + "@qq.com", code: form2.code})
}
</script>

<style scoped>
</style>
