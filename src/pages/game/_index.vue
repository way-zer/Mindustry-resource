<template>
  <el-card header="正式版">
    <ReleaseList :list="store.releases" />
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
    <ReleaseList :list="store.beReleases" />
  </el-card>
</template>

<script lang="ts" setup>
import 'element-plus/dist/index.css'
import ReleaseList from './_ReleaseList.vue'
import { useStore } from "pinia-class-store";
import { GameStore } from "../../store/game";
import { ElSwitch, ElCard } from 'element-plus';

const store = useStore(GameStore)
onBeforeMount(() => store.tryLoad())
</script>