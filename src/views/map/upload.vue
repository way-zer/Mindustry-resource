<template>
  <el-dialog model-value :zIndex="100" center custom-class="upload-dialog"
             @close="close" :title="update?'更新地图':'上传地图'">
    <el-alert v-if="!update" type="warning" :closable="false" show-icon center id="alert">
      <span class="important">更新地图请在地图详情页进行上传</span><br/>
      <span class="important">更新地图请在地图详情页进行上传</span><br/>
      <span class="important">更新地图请在地图详情页进行上传</span><br/>
      <span>地图上传完成后,请在详情页设置正确的游戏模式</span>
    </el-alert>
    <el-row align="center">
      <el-upload id="upload" action="ohno" drag :multiple="false" :http-request="upload">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <span>只能上传.msav文件,且不超过100KB</span>
      </el-upload>
    </el-row>
  </el-dialog>
</template>

<script lang="ts">
import {isMobile} from '@/util/uiHelper'
import {defineComponent, ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {ElMessage} from 'element-plus'
import {MapApi} from '@/store/maps/api'
import {ElUploadRequestOptions} from 'element-plus/es/components/upload/src/upload.type'
import {userStore} from '@/store/user'

export default defineComponent({
  name: 'TheUpload',
  data: () => ({
    isMobile,
  }),
  setup() {
    const router = useRouter()
    const update = useRoute().query.update?.toString()
    const uploadUrl = ref<string>('404')
    return {
      uploadUrl,
      update,
      upload: async (info: ElUploadRequestOptions) => {
        if (!userStore.logged) {
          userStore.showDialog = true
          ElMessage.error('请先登录后再进行上传')
          return Promise.reject()
        }
        const hash = await MapApi.upload(info.file)
        if (update) {
          await MapApi.updateThread(update, hash)
          router.back()
        } else {
          const thread = await MapApi.newThread(hash)
          await router.replace({path: `/map/${thread}/latest`})
        }
      },
      close: () => {
        router.push({path: '/map'})
      },
    }
  },
})
</script>

<style lang="stylus" scoped>
:global(.upload-dialog)
  width 80% !important
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