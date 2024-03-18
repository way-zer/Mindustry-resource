<template>
  <el-row type="flex" :gutter=16>
    <el-col :xs=24 :sm=12 :lg=6 v-for="map in store.data" :key="map.latest">
      <el-card class="mapCard">
        <SquaredImage :src="map.preview" alt="preview" />
        <div>
          <div>
            <el-space size="small">
              <el-tag v-for="tag in map.tags" :key="tag" size="small" effect="plain"
                :color="tag.split('§')[1] || 'default'">
                <ColorizeSpan :text="tag.split('§')[0]" />
              </el-tag>
            </el-space>
          </div>
          <b><ColorizeSpan :text="map.name" no-color/></b>
          <p class="desc"><ColorizeSpan :text="map.desc" no-color/></p>
          <el-divider />
          <el-row justify="space-around" type="flex">
            <ActionCopy :thread="map.id" :hash="map.latest" />
            <el-divider direction="vertical" />
            <ActionDownload :hash="map.latest" :map-name="map.name"/>
            <el-divider direction="vertical" />
            <NuxtLink :to="`/map/${map.id}/latest`" custom v-slot="{ href, navigate }">
              <tooltip content="地图详情">
                <el-button link tag="a" :href="href" @click="navigate"><el-icon-more class="h-4" /></el-button>
              </tooltip>
            </NuxtLink>
          </el-row>
        </div>
      </el-card>
    </el-col>
    <el-empty v-if="store.data.length === 0" style="width: 100%" description="暂无数据，尝试切换关键词试试" />
    <div class="text-center" v-if="store.loading">内容加载中..</div>
    <div class="text-center" v-if="store.noMore">没有更多了</div>
  </el-row>
  <el-backtop />
</template>

<script lang="tsx" setup>
import type { ElButton } from "#build/components";
import ActionCopy from "./ActionCopy.vue";
import ActionDownload from "./ActionDownload.vue";

const store = useMapStore()
infiniteScroll(200, 10, () => (store.loading || store.noMore), store.pullMore)
</script>

<style lang="stylus" scoped>
.desc
  height 4em
  -webkit-line-clamp 3
  display -webkit-box
  -webkit-box-orient vertical
  overflow hidden
</style>