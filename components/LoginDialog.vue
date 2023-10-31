<template>
  <Dialog maxWidth="600px" @close="() => userStore.showDialog = false" :title="title">
    <el-form ref="formRef" :model="form" @submit="submit">
      <el-form-item label="用户名" prop="user" :rules="[
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { pattern: /[-_a-zA-Z0-9]{6,16}/, message: '用户名需要6-16位字母数字下划线构成', trigger: 'change' },
        ...mode === 'login' ? [] : [{ pattern: /^(?!qq)[-_a-zA-Z0-9]{4,16}/, message: '用户名不能以qq开头', trigger: 'change' }],
      ]">
        <el-input v-model.trim="form.user" autocomplete="username" />
        <span class="tip" v-if="mode === 'login'">忘记账号?可以翻看已上传的地图，或者使用"qq+号码"代替，例"qq123456"</span>
      </el-form-item>

      <el-form-item label="密码" prop="password" :rules="[
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, message: '密码需要至少6个字符', trigger: 'change' },
      ]">
        <el-input v-model="form.password" type="password"
          :autocomplete="mode === 'login' ? 'current-password' : 'new-password'" />
        <span class="tip" v-if="mode === 'login'">忘记密码?点击
          <el-button link type="primary" @click="mode = 'resetPassword'">重置密码</el-button></span>
      </el-form-item>

      <el-form-item v-if="mode !== 'login'" label="重复密码" prop="password2" :rules="[
        { required: true, message: '请输入密码', trigger: 'blur' },
        { validator: (_, v) => v === form.password, message: '重复密码不匹配,请重新输入', trigger: 'change' },
      ]">
        <el-input v-model="form.password2" type="password" />
      </el-form-item>

      <el-form-item v-if="mode !== 'login'" label="QQ号验证" prop="code" required>
        <el-input v-model="form.code" disabled>
          <template #append>
            <el-button v-if="genCodeCoolDown <= 0" @click="genCode">点击获取验证码</el-button>
            <el-button v-else disabled>重新获取验证码({{ genCodeCoolDown }})</el-button>
          </template>
        </el-input>
        <el-alert v-if="form.code" type="warning" :closable="false">
          <p class="text-black">
            请在资源站交流群(722163668)发送消息"资源站验证 {{ form.code }}"进行验证。<br />
            <template v-if="mode === 'register'">一个QQ号仅允许注册一个账号, 请保管好自己的账号<br /></template>
            <template v-else-if="mode === 'resetPassword'">请使用注册时使用的QQ号进行验证<br /></template>
            <b>资源站会记录你的QQ号备用,继续即同意该条款</b>
          </p>
        </el-alert>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
        <span v-if="mode === 'login'">还没账号,点击<el-button link type="primary"
            @click="mode = 'register'">注册</el-button></span>
        <span v-else>已有账号,点击<el-button link type="primary" @click="mode = 'login'">登录</el-button></span>
      </el-form-item>
    </el-form>
  </Dialog>
</template>

<script lang="tsx" setup>
import { UserApi } from '~/backendApi/user';

const userStore = useUserStore()
const mode = ref<'login' | 'resetPassword' | 'register'>('login')
const title = computed(() => {
  switch (mode.value) {
    case 'login': return '登录'
    case 'resetPassword': return '重置密码'
    case 'register': return '注册'
  }
})

const formRef = ref<typeof ElForm>()
const form = ref({
  user: '',
  password: '',
  password2: '',
  code: '',
})

const genCodeCoolDown = ref(0)
async function genCode() {
  genCodeCoolDown.value = 60
  const interval = setInterval(() => {
    genCodeCoolDown.value--
    if (genCodeCoolDown.value <= 0) clearInterval(interval)
  }, 1000)
  form.value.code = await UserApi.genCode()
}

async function submit() {
  try {
    await formRef.value!!.validate()
    if (mode.value === 'login')
      await userStore.login(form.value)
    else
      await userStore.register(form.value)
  } catch (e) {
  }
}
</script>

<style lang="stylus" scoped>
.tip
  display inline-block
  line-height normal
  color gray
</style>