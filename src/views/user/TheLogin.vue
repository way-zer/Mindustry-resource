<template>
  <el-dialog :model-value="userModel.showDialog" :before-close="close" :title="isLogin?'登录':'注册'" center>
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

<script lang="tsx">
import {ref} from "vue";
import {default as defineComponent} from "@/store/mobxObserver";
import userModel from "@/store/user/model";
import {ElForm} from "element-plus";

export default defineComponent({
  name: "TheLogin",
  setup() {
    const isLogin = ref(true)
    const formRef = ref<ElForm>(null)
    const form = ref({
      user: '',
      password: '',
      password2: '',
      code: '',
    })
    return {
      userModel, isLogin, formRef, form,
      passwordConfirmValidator(_, v) {
        console.log(v, form.value.password)
        return v === form.value.password
      },
      async submit() {
        try {
          await formRef.value.validate()
          if (isLogin)
            await userModel.login(form.value.user, form.value.password)
          else
            await userModel.register(form.value.user, form.value.password, form.value.code)
        } catch (e) {
        }
      },
      close(done) {
        userModel.setDialog(false)
        done()
      }
    }
  }
})
</script>

<style scoped>

</style>