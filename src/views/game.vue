<route lang="yaml">
meta:
  navName: 游戏下载
  navIndex: 10
</route>
<template>
  <PageHeader title="游戏下载与安装">
    <template #actions>
      <el-switch active-text="使用镜像加速" inactive-text="不使用镜像加速" v-model="useMirror"/>
    </template>
    <el-card header="正式版">
      <ReleaseList :list="store.releases" :get-download-url="getDownloadUrl"/>
      <details>
        <summary>
          apk等版本请前往
          <a href="https://anuke.itch.io/mindustry" target="_blank" rel="nofollow">
            官方itch下载站
          </a>
        </summary>
        点击Download Now,然后在弹出的对话框内点击No,Thanks即可免费下载
        <br/>
        IOS版本仅可以在AppStore付费功能
        <br/>
        <b>支持作者,可以选择付费,或者在Steam购买正版</b>
      </details>
    </el-card>
    <el-card header="BE 测试版">
      <ReleaseList :list="store.beReleases" :get-download-url="getDownloadUrl"/>
    </el-card>
  </PageHeader>
</template>

<script lang="ts">
import PageHeader from '@/components/PageHeader.vue'
import ReleaseList from './game/_ReleaseList.vue'
import {ref} from 'vue'
import {useStore} from "pinia-class-store";
import {GameStore} from "@/store/game";

export default {
  name: 'index',
  components: {ReleaseList, PageHeader},
  setup() {
    const store = useStore(GameStore)
    const useMirror = ref(true)
    onServerPrefetch(() => store.tryLoad())
    onBeforeMount(() => store.tryLoad())
    return {
      store,
      useMirror,
      getDownloadUrl(url: string) {
        if (!useMirror.value) return url
        return 'https://gh.tinylake.tk/' + url
      },
    }
  },
}
</script>

<style scoped>

</style>