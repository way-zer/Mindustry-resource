<template>
  <el-dialog :model-value="showDialog" :before-close="close" :title="isLogin?'登录':'注册'" center>
    <el-form ref="formRef" :model="form" @submit="submit">
      <el-form-item label="用户名" prop="user" :rules="[
            { required: true, message: '请输入用户名', trigger: 'blur'},
            { pattern: /[-_a-zA-Z0-9]{6,16}/, message: '用户名需要6-16位字母数字下划线构成', trigger: 'change'},
      ]">
        <el-input v-model.trim="form.user" autocomplete="username"/>
        <span class="tip" v-if="isLogin">忘记账号?可以翻看已上传的地图，或者使用"qq+号码"代替，例"qq123456"</span>
      </el-form-item>

      <el-form-item label="密码" prop="password" :rules="[
            { required: true, message: '请输入密码', trigger: 'blur'},
            { min: 6, message: '密码需要至少6个字符', trigger: 'change'},
      ]">
        <el-input v-model="form.password" type="password"
                  :autocomplete="isLogin ? 'current-password' : 'new-password'"/>
        <span class="tip" v-if="isLogin">忘记密码?可以使用相同用户名和qq重新注册，更新密码</span>
      </el-form-item>

      <el-form-item v-if="!isLogin" label="重复密码" prop="password2" :rules="[
            { required: true, message: '请输入密码', trigger: 'blur'},
            { validator: passwordConfirmValidator, message: '重复密码不匹配,请重新输入', trigger: 'change'},
      ]">
        <el-input v-model="form.password2" type="password"/>
      </el-form-item>

      <el-form-item v-if="!isLogin" label="QQ号验证" prop="code">
        <el-input v-model="form.code" disabled>
          <template #append>
            <el-button v-if="genCodeCoolDown<=0" @click="genCode">点击获取验证码</el-button>
            <el-button v-else disabled>重新获取验证码({{ genCodeCoolDown }})</el-button>
          </template>
        </el-input>
        <el-alert v-if="form.code" type="warning" :closable="false">
          请在资源站交流群(722163668)发送消息"资源站验证 {{ form.code }}"进行验证。<br/>
          也可私聊机器人(QQ1849301538)发送消息，因为技术限制，私聊不会回复确认。<br/>
          <b>资源站会记录你的QQ号备用,继续注册即同意该条款</b>
        </el-alert>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
        <span v-if="isLogin">还没账号,点击<el-button link type="primary" @click="isLogin=false">注册</el-button></span>
        <span v-else>已有账号,点击<el-button link type="primary" @click="isLogin=true">登录</el-button></span>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="tsx" setup>
import {computed, ref} from 'vue'
import {ElForm} from 'element-plus'
import {UserApi} from "@/store/user/api";
import {useStore} from "@/store";

const userStore = useStore("user")
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
  color gray
</style>