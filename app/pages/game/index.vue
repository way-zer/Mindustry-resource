<template>
  <PageHeader title="游戏下载与安装">
    <template #actions>
      <el-switch active-text="使用镜像加速" inactive-text="不使用镜像加速" v-model="useMirror"/>
    </template>
    <ReleaseList.define v-slot="{list}">
      <el-collapse accordion v-if="list.length>0">
        <el-collapse-item v-for="item in list" :name="item.tag_name" :key="item.tag_name">
          <template #title>
            <a :href="item.html_url" target="_blank" rel="nofollow">{{ item.tag_name }}</a>
          </template>
          <el-col style="width: 100%">
            <el-row v-for="asset in item.assets" :key="asset.name" type="flex" justify="space-between">
              <el-space>
                <strong>{{ asset.name }}</strong>
                <small>{{ (asset.size / 1024 / 1024).toFixed(2) }} MB</small>
              </el-space>
              <a :href="getDownloadUrl(asset.browser_download_url)" rel="nofollow">下载</a>
            </el-row>
          </el-col>
        </el-collapse-item>
      </el-collapse>
      <el-empty v-else/>
    </ReleaseList.define>
    <el-card header="官方 正式版">
      <div class="alert">
        <div class="col-span-full">数据源为官方<a class="link" href="https://github.com/Anuken/Mindustry">Github</a>，只提供电脑版(需Java)和服务端</div>
        <details class="col-span-full">
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
      </div>
      <ReleaseList.reuse :list="releases.releases"/>
    </el-card>
    <el-card header="国产第三方客户端 MindustryX">
      <div class="alert">
        <div class="col-span-full">其中APK为手机版，desktop为PC版(需java)，Loader为MOD(需原版)，server为服务端</div>
        <div class="col-span-full">开源地址: <a class="link" href="https://github.com/TinyLake/MindustryX">Github</a></div>
      </div>
      <ReleaseList.reuse :list="releases.mdtxReleases"/>
    </el-card>
    <el-card header="官方 BE预览版">
      <ReleaseList.reuse :list="releases.be"/>
    </el-card>
  </PageHeader>
</template>

<script lang="ts" setup>
const ReleaseList = createReusableTemplate<{ list: ReleaseType[] }>()

interface ReleaseType {
  html_url: string;
  tag_name: string;
  published_at: string;
  assets: { name: string; browser_download_url: string; size: number }[];
}

useHead({
  title: '游戏下载',
  meta: [
    {name: 'description', content: '像素工厂资源站，最新游戏免费下载'},
    {name: 'keywords', content: 'Mindustry,像素工厂,资源站,游戏,最新,免费下载,微泽'},
  ],
})

const useMirror = ref(true)

function getDownloadUrl(url: string) {
  if (!useMirror.value) return url
  return 'https://gh.tinylake.top/' + url
}


const {data: releases} = await useAsyncData(async () => {
  function fetchRelease(repo: string, perPage = 5) {
    return $fetch<ReleaseType[]>(`https://api.github.com/repos/${repo}/releases?per_page=${perPage}`)
  }

  const releases = fetchRelease('Anuken/Mindustry', 5)
  const mdtxReleases = fetchRelease('TinyLake/MindustryX', 5)
  const beReleases = fetchRelease('Anuken/MindustryBuilds', 15)

  return {
    releases: await releases,
    mdtxReleases: await mdtxReleases,
    be: await beReleases,
  }
}, {
  default: () => ({releases: [], mdtxRelease: [], be: []}),
  getCachedData: (k) => useNuxtApp().payload.data[k],
})
</script>