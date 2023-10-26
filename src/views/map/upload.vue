<template>
  <client-only>
    <el-dialog model-value center class="upload-dialog"
               @close="close" :title="update?'更新地图':'上传地图'">
      <el-alert v-if="!update" type="warning" :closable="false" show-icon center id="alert">
        <ol>
          <li class="important" style="font-size: 6em">更新地图请在地图详情页进行上传</li>
          <li>禁止上传像素画直接转地图</li>
          <li>搬运地图禁止修改, 魔改地图需备注内容及原作者</li>
          <li>上传地图前建议先单机游玩进行(评估难度和可玩性)</li>
          <li>上传即代表你授予资源站展示和分发的权力,以及同意玩家使用和服务器网络换图</li>
          <li>地图上传完成后,请在详情页设置正确的游戏模式</li>
        </ol>
        <span>(违反规定,被封号别怪我没提醒)</span>
      </el-alert>
      <el-row align="middle">
        <el-upload id="upload" action="ohno" drag :multiple="false" :http-request="upload">
          <el-icon class="el-icon--upload">
            <el-icon-upload-filled/>
          </el-icon>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <span>只能上传.msav文件,且不超过200KB</span>
        </el-upload>
      </el-row>
    </el-dialog>
  </client-only>
</template>

<script lang="ts" setup>
import {useRoute, useRouter} from 'vue-router'
import {ElMessage} from 'element-plus'
import {MapApi} from '@/store/maps/api'
import {useStore} from "pinia-class-store";
import {UserStore} from "@/store/user";
import ClientOnly from "@/components/ClientOnly";


const userStore = useStore(UserStore)
const router = useRouter()
const update = useRoute().query.update?.toString()

async function upload(info: { file: File }) {
  if (!userStore.logged) {
    userStore.showDialog = true
    ElMessage.error({message: '请先登录后再进行上传', duration: 10_000})
    return Promise.reject()
  }
  const hash = await MapApi.upload(info.file)
  if (update) {
    await MapApi.updateThread(update, hash)
    router.back()
  } else {
    const thread = await MapApi.newThread(hash)
    await router.replace({path: `/${thread}/latest`})
  }
}

function close() {
  router.push({path: '/'})
}
</script>

<style lang="stylus" scoped>
:global(.upload-dialog)
  width 80%
  max-width fit-content
  margin 0 auto

#upload
  margin 0 auto

#alert span
  font-size 16px

.important
  color orangered
  font-size 24px
</style>