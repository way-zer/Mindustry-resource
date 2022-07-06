<template>
  <el-dialog :model-value="showDialog" :before-close="close" :title="isLogin?'登录':'注册'" center>
    <el-form ref="formRef" :model="form" @submit="submit">
      <el-form-item label="用户名" prop="user" :rules="[
            { required: true, message: '请输入用户名', trigger: 'blur'},
            { pattern: /[-_a-zA-Z0-9]{6,16}/, message: '用户名需要6-16位字母数字下划线构成', trigger: 'change'},
      ]">
        <el-input v-model.trim="form.user" autocomplete="username"/>
      </el-form-item>

      <el-form-item label="密码" prop="password" :rules="[
            { required: true, message: '请输入密码', trigger: 'blur'},
            { min: 6, message: '密码需要至少6个字符', trigger: 'change'},
      ]">
        <el-input v-model="form.password" type="password"
                  :autocomplete="isLogin ? 'current-password' : 'new-password'"/>
      </el-form-item>

      <el-form-item v-if="!isLogin" label="重复密码" prop="password2" :rules="[
            { required: true, message: '请输入密码', trigger: 'blur'},
            { validator: passwordConfirmValidator, message: '重复密码不匹配,请重新输入', trigger: 'change'},
      ]">
        <el-input v-model="form.password2" type="password"/>
      </el-form-item>

      <el-form-item v-if="!isLogin" label="邀请码" prop="code" :rules="[
            { required: true, message: '请输入邀请码', trigger: 'blur'},
            { pattern: /[0-9]{6}/, message: '请输入正确邀请码', trigger: 'change'},
      ]">
        <span class="tip">邀请码为6位数字,请找微泽机器人(QQ1849301538)私聊"邀请码"获取,如不回复，可加好友后再试</span>
        <el-input v-model="form.code" type="number"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
        <span v-if="isLogin">还没账号,点击<el-button type="text" @click="isLogin=false">注册</el-button></span>
        <span v-else>已有账号,点击<el-button type="text" @click="isLogin=true">登录</el-button></span>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="tsx" setup>
import {computed, ref} from 'vue'
import {ElForm} from 'element-plus'
import {userStore} from '@/store/user'

const isLogin = ref(true)
const formRef = ref<typeof ElForm>()
const form = ref({
  user: '',
  password: '',
  password2: '',
  code: '',
})
const showDialog = computed(() => userStore.showDialog)

function passwordConfirmValidator(_, v) {
  return v === form.value.password
}

async function submit() {
  try {
    await formRef.value!!.validate()
    if (isLogin.value)
      await userStore.login(form.value)
    else
      await userStore.register(form.value)
  } catch (e) {
  }
}

function close(done) {
  userStore.showDialog = false
  done()
}
</script>

<style lang="stylus" scoped>
.tip
  display inline-block
  line-height normal
</style>