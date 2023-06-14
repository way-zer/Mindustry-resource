<route lang="yaml">
meta:
  navName: 地图
  navIndex: 0
</route>

<template>
  <el-card>
    <template #header>
      <el-row type="flex" justify="space-between" align="middle">
        <b style="font-size: large">地图分享</b>
        <el-space>
          <el-input v-model="tmpSearch" placeholder="查找地图" clearable @change="onSearch"/>
          <ActionUpload/>
        </el-space>
      </el-row>
    </template>
    <el-alert type="info">你知道吗? 在搜索栏输入地图id可以直接打开详情了。</el-alert>
    <div class="filter">
      <b>按模式筛选: </b>
      <el-radio-group size="small"
                      :model-value="getTag('mode')"
                      @change="(v)=>{replaceTag('mode',v)}"
      >
        <el-radio-button v-for="mode in gameModes" :key="mode" :label="mode"/>
        <el-radio-button label="X"/>
      </el-radio-group>
    </div>
    <div class="filter">
      <b>按游戏版本筛选: </b>
      <el-radio-group size="small"
                      :model-value="getTag('version')"
                      @change="(v)=>{replaceTag('version',v)}"
      >
        <el-radio-button label="3">v5(104)</el-radio-button>
        <el-radio-button label="4">v6(126)</el-radio-button>
        <el-radio-button label="5">v7(135)</el-radio-button>
        <el-radio-button label="7">v7.5(136/be)</el-radio-button>
        <el-radio-button label="X"/>
      </el-radio-group>
    </div>
    <div class="filter">
      <b>排序方式: </b>
      <el-radio-group size="small"
                      :model-value="getTag('sort')||'X'"
                      @change="(v)=>{replaceTag('sort',v)}"
      >
        <el-radio-button label="X">热度</el-radio-button>
        <el-radio-button label="updateTime">更新时间</el-radio-button>
        <el-radio-button label="createTime">发布时间</el-radio-button>
        <el-radio-button label="download">下载量</el-radio-button>
        <el-radio-button label="rating">评分</el-radio-button>
        <el-radio-button label="like">点赞数</el-radio-button>
      </el-radio-group>
    </div>
    <MapList/>
    <router-view/>
  </el-card>
</template>

<script lang="tsx" setup>
import {ref} from 'vue'
import {gameModes} from '@/store/maps/type'
import MapList from '@/views/map/components/MapList.vue'
import ActionUpload from '@/views/map/components/ActionUpload.vue'
import {useStore} from "pinia-class-store";
import {MapsStore} from "@/store/maps";
import {useRouter} from "vue-router";

const router = useRouter()
const mapsStore = useStore(MapsStore)
const tmpSearch = ref(mapsStore.searchKey)
watch(() => mapsStore.searchKey, (it) => tmpSearch.value = it)
const onSearch = async (v: string) => {
    tmpSearch.value = v.replace('  ', ' ')//reduce space
    if (v.match(/^\d{5}$/))
        return await router.push({path: `/map/${v}/latest`})
    return mapsStore.search(v)
}

function regexForTag(tag: string) {
  return new RegExp('@' + tag + ':(\\w+)')
}

function getTag(tag: string) {
  const match = tmpSearch.value.match(regexForTag(tag))
  return match ? match[1] : null
}

function replaceTag(tag: string, value: string) {
    const regex = regexForTag(tag)
    const search = tmpSearch.value
    if (!search.match(regex))
        onSearch(search + ` @${tag}:${value} `)
    else {
        const v = value == 'X' ? '' : `@${tag}:${value}`
        onSearch(search.replace(regex, v))
    }
}

</script>

<style lang="stylus" scoped>
.floatRight
  float right

  div
    width auto
    display inline-block

.filter
  margin 8px

  b
    font-size 16px
    line-height 32px

  .el-radio-group
    display inline-block
    vertical-align top

  .el-radio-button :deep(span)
    @media only screen and (max-width: 768px)
      padding 9px 6px
</style>