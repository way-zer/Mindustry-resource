<template>
  <PageHeader title="地图分享">
    <template #actions>
      <el-input v-model="tmpSearch" placeholder="查找地图" clearable @change="onSearch"/>
      <ActionUpload/>
    </template>
    <el-alert type="info">你知道吗? 在搜索栏输入地图id可以直接打开详情了。</el-alert>
    <div class="filter">
      <b>按模式筛选: </b>
      <el-radio-group size="small" :model-value="getTag('mode')" @change="(v) => { replaceTag('mode', v) }">
        <el-radio-button v-for="mode in gameModes" :key="mode" :value="mode">{{ mode }}</el-radio-button>
        <el-radio-button :value="false">X</el-radio-button>
      </el-radio-group>
    </div>
    <div class="filter">
      <b>按游戏版本筛选: </b>
      <el-radio-group size="small" :model-value="getTag('version')" @change="(v) => { replaceTag('version', v) }">
        <el-radio-button value="3">v5(104)</el-radio-button>
        <el-radio-button value="4">v6(126)</el-radio-button>
        <el-radio-button value="5">v7(135)</el-radio-button>
        <el-radio-button value="7">v7.5(136/be)</el-radio-button>
        <el-radio-button :value="false">X</el-radio-button>
      </el-radio-group>
    </div>
    <div class="filter">
      <b>排序方式: </b>
      <el-radio-group size="small" :model-value="getTag('sort') || 'X'" @change="(v) => { replaceTag('sort', v) }">
        <el-radio-button :value="false">热度</el-radio-button>
        <el-radio-button value="updateTime">更新时间</el-radio-button>
        <el-radio-button value="createTime">发布时间</el-radio-button>
        <el-radio-button value="download">下载量</el-radio-button>
        <el-radio-button value="rating">评分</el-radio-button>
        <el-radio-button value="like">点赞数</el-radio-button>
      </el-radio-group>
    </div>
    <MapList/>
  </PageHeader>
  <NuxtPage/>
</template>

<script lang="tsx" setup>
import {gameModes} from '@/backendApi/maps/type'
import MapList from './map/components/MapList.vue'
import ActionUpload from './map/components/ActionUpload.vue'

useHead({
  title: '地图分享',
  meta: [
    {name: 'description', content: '像素工厂资源站，丰富的地图资源下载'},
    {name: 'keywords', content: 'Mindustry,像素工厂,资源站,地图,服务器,微泽'},
  ],
})
const store = useMapStore()
const tmpSearch = ref(store.searchKey)
watch(() => store.searchKey, (it) => tmpSearch.value = store.searchKey)
const onSearch = async (v: string) => {
  tmpSearch.value = v.replace('  ', ' ')//reduce space
  if (v.match(/^\d{5}$/))
    return await navigateTo(`/map/${v}/latest`)
  return store.search(v)
}

function regexForTag(tag: string) {
  return new RegExp('@' + tag + ':(\\w+)')
}

function getTag(tag: string) {
  const match = tmpSearch.value.match(regexForTag(tag))
  return match ? match[1] : undefined
}

function replaceTag(tag: string, value: string | number | boolean | undefined) {
  const regex = regexForTag(tag)
  const search = tmpSearch.value
  if (!search.match(regex))
    onSearch(search + ` @${tag}:${value} `)
  else {
    const v = !value ? '' : `@${tag}:${value}`
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