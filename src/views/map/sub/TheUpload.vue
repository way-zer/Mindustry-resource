<template>
  <el-dialog model-value @close="close" :zIndex="100">
    <el-alert type="warning" :closable="false">更新地图请在地图详情页进行上传</el-alert>
    <el-upload :action="uploadUrl" drag :multiple="false" @before-upload="beforeUpload">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <span>只能上传.msav文件,且不超过100KB</span>
    </el-upload>
  </el-dialog>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import {useRouter} from "vue-router";

export default defineComponent({
  name: "TheUpload",
  setup() {
    const router = useRouter()
    const uploadUrl = ref<string>("404")
    return {
      uploadUrl,
      beforeUpload: () => {

      },
      close: () => {
        router.push({path: "/map"})
      }
    }
  }
})
</script>

<style scoped>

</style>