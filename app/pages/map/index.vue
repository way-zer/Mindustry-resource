<template>
  <PageHeader title="地图分享">
    <template #actions>
      <el-input v-model="tmpSearch" placeholder="查找地图" clearable @change="store.search"/>
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
        <el-radio-button value="7">v7.5(136-146)</el-radio-button>
        <el-radio-button value="8">v8a(147-149)</el-radio-button>
        <el-radio-button value="9">v8b(150+)</el-radio-button>
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
import MapList from './components/MapList.vue'
import ActionUpload from './components/ActionUpload.vue'

useHead({
  title: '地图分享',
  meta: [
    {name: 'description', content: '像素工厂资源站，丰富的地图资源下载'},
    {name: 'keywords', content: 'Mindustry,像素工厂,资源站,地图,服务器,微泽'},
  ],
})
const store = useMapStore()
const tmpSearch = ref(store.searchKey)
watchEffect(() => tmpSearch.value = store.searchKey)
await callOnce(() => store.pullMore())

function regexForTag(tag: string) {
  return new RegExp('@' + tag + ':(\\w+)')
}

function getTag(tag: string) {
  return store.searchKey.match(regexForTag(tag))?.[1]
}

function replaceTag(tag: string, value: string | number | boolean | undefined) {
  const regex = regexForTag(tag)
  const search = store.searchKey
  if (!search.match(regex)) {
    if (!value) return
    store.search(search + ` @${tag}:${value} `)
  } else {
    const v = !value ? '' : `@${tag}:${value}`
    store.search(search.replace(regex, v))
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