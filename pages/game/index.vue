<template>
  <PageHeader title="游戏下载与安装">
    <template #actions>
      <el-switch active-text="使用镜像加速" inactive-text="不使用镜像加速" v-model="store.useMirror" />
    </template>
    <el-card header="正式版">
      <ReleaseList :list="store.releases" :get-download-url="store.getDownloadUrl" />
      <details>
        <summary>
          apk等版本请前往
          <a href="https://anuke.itch.io/mindustry" target="_blank" rel="nofollow">
            官方itch下载站
          </a>
        </summary>
        点击Download Now,然后在弹出的对话框内点击No,Thanks即可免费下载
        <br />
        IOS版本仅可以在AppStore付费功能
        <br />
        <b>支持作者,可以选择付费,或者在Steam购买正版</b>
      </details>
    </el-card>
    <el-card header="BE 测试版">
      <ReleaseList :list="store.beReleases" :get-download-url="store.getDownloadUrl" />
    </el-card>
  </PageHeader>
</template>

<script lang="ts" setup>
import ReleaseList from './ReleaseList.vue'

const store = useGameStore()
useHead({
  title: '游戏下载',
  meta: [
    { name: 'description', content: '像素工厂资源站，最新游戏免费下载' },
    { name: 'keywords', content: 'Mindustry,像素工厂,资源站,游戏,最新,免费下载,微泽' },
  ],
})
</script>