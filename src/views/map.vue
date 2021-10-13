<route lang="yaml">
meta:
  navName: 地图
  navIndex: 0
</route>

<template>
  <el-card>
    <template #header>
      <el-row type="flex" justify="space-between" align="center">
        <b style="font-size: large">地图分享</b>
        <el-space>
          <el-input v-model="searchKey" placeholder="查找地图" clearable @change="onSearch"/>
          <ActionUpload/>
        </el-space>
      </el-row>
    </template>
    <div class="filter">
      <b>按模式筛选: </b>
      <el-radio-group size="small"
                      :model-value="getTag('mode')"
                      @change="(v)=>{replaceTag('mode',v)}"
      >
        <el-radio-button v-for="mode in modes" :key="mode" :label="mode"/>
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

<script lang="tsx">
import {defineComponent, onBeforeUnmount, ref} from 'vue'
import {gameModes} from '@/store/maps/type'
import MapList from '@/views/map/components/MapList.vue'
import ActionUpload from '@/views/map/components/ActionUpload.vue'
import {mapsStore} from '@/store/maps'

function regexForTag(tag: string) {
  return new RegExp('@' + tag + ':(\\w+)')
}

export default defineComponent({
  components: {ActionUpload, MapList},
  setup() {
    const tmpSearch = ref(mapsStore.searchKey)
    const unwatch = mapsStore.$watch((it) => it.searchKey, (it) => {
      tmpSearch.value = it
    }) as () => any
    onBeforeUnmount(unwatch)
    const onSearch = (v: string) => {
      tmpSearch.value = v.replace('  ', ' ')//reduce space
      mapsStore.search(v).then()
    }
    return {
      modes: gameModes,
      searchKey: tmpSearch,
      onSearch,
      getTag(tag: string) {
        const match = tmpSearch.value.match(regexForTag(tag))
        return match ? match[1] : null
      },
      replaceTag(tag: string, value: string) {
        const regex = regexForTag(tag)
        if (tmpSearch.value.match(regex) === null)
          onSearch(tmpSearch.value + ` @${tag}:${value} `)
        else {
          const v = value == 'X' ? '' : `@${tag}:${value}`
          onSearch(tmpSearch.value.replace(regex, v))
        }
      },
    }
  },
})
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