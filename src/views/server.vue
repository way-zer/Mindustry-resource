<route lang="yaml">
meta:
  navName: 服务器列表
  navIndex: 5
</route>
<template>
  <el-card>
    <template #header>
      <el-row id="header" type="flex" justify="space-between" align="middle">
        <b style="font-size: large">公共服务器列表</b>
        <el-space>
          <el-switch active-text="自动刷新" inactive-text="手动刷新" v-model="autoUpdate"/>
          <el-button size="small" round type="primary"
                     @click="showModal = true">
            <el-icon-plus/>
            添加服务器
          </el-button>
        </el-space>
      </el-row>
    </template>
    <el-table :data="store.data" v-loading="store.loading" row-key="address" id="table"
              :default-sort="{prop:'players',order:'descending'}">
      <el-table-column label="地址 (按版本筛选)" prop="address" fixed="left"
                       :filters="versionFilters" :filter-method="versionFilter">
        <template #default="scope">
          <tooltip>
            <template #content>
              <span v-if="i(scope).online">延迟{{ i(scope).timeMs }}ms</span>
              <span v-else>最后在线{{ ((Date.now() - i(scope).lastOnline) / 60000).toFixed(2) }}分钟前</span>
            </template>
            <div>
              <template v-if="i(scope).ext.sponsor">
                <span style="color: goldenrod;font-size: 1.2em;font-weight: bold">赞助置顶</span>
              </template>
              {{ i(scope).address }}
              <br/>
              <el-icon-orange v-if="i(scope).online" style="color: forestgreen"/>
              <el-icon-orange v-else style="color: orangered"/>
              版本 {{ i(scope).version }}
            </div>
          </tooltip>
        </template>
      </el-table-column>
      <el-table-column label="名字" prop="name">
        <template #default="scope">
          <ColorizeSpan :text="i(scope).name"/>
          <br/>
          <ColorizeSpan :text="i(scope).description"/>
        </template>
      </el-table-column>
      <el-table-column label="人数" prop="players" :sort-by="it=>it.ext.score" sortable>
        <template #default="scope">
          <b>{{ i(scope).players }}</b>/{{ i(scope).limit || '无限制' }}
          <template v-if="i(scope).ext.isHub">
            <br/>
            <el-icon-warning style="color: orangered"/>
            本服为大厅服,人数非真实
          </template>
        </template>
      </el-table-column>
      <el-table-column label="地图 (按模式筛选)" prop="map"
                       :filters="modeFilters" :filter-method="(f,v)=>(v.mode===f)">
        <template #default="scope">
          <ColorizeSpan :text="i(scope).mapName"/>
          <br/>
          模式: {{ modeMap[i(scope).mode] }}, 第{{ i(scope).wave }}波
        </template>
      </el-table-column>
    </el-table>
    <client-only>
      <el-dialog title="请输入服务器地址" v-model="showModal">
        <el-input type="text" v-model="address" @submit="check"/>
        <el-row type="flex" justify="end">
          <el-button type="primary" :loading="adding" @click="check">提交</el-button>
        </el-row>
      </el-dialog>
    </client-only>
  </el-card>
</template>

<script lang="ts" setup>
import {onMounted} from 'vue'
import {ServerInfo} from '@/store/server/type'
import {modeFilters, modeMap} from '@/util/mindustry'
import {useStore} from "pinia-class-store";
import {ServerStore} from "@/store/server";
import Tooltip from "@/components/Tooltip";
import ClientOnly from "@/components/ClientOnly";
import ColorizeSpan from "@/components/ColorizeSpan.vue";

const store = useStore(ServerStore)
onServerPrefetch(() => store.refresh())

const autoUpdate = ref(true)

let intervalId
onMounted(() => {
  if (store.data.length === 0)
    store.refresh().then()
  intervalId = setInterval(() => {
    if (autoUpdate.value) store.refresh().then()
  }, 60000)
})
onBeforeUnmount(() => {
  clearInterval(intervalId)
})

//for table view
const versionFilters = [
  {text: '5.0 正式版', value: '5', maxVersion: 104},
  {text: '6.0 版本', value: '6', maxVersion: 126},
  {text: '7.0 版本', value: '7', maxVersion: 1000},
  {text: 'BE测试版', value: 'BE', maxVersion: Number.MAX_VALUE},
]

function versionFilter(f, v: ServerInfo) {
  return f === versionFilters.find(it => v.version < it.maxVersion)?.value
}

function i(scope) {
  return scope.row as ServerInfo
}

//for modal
const showModal = ref(false)
const address = ref('')
const adding = ref(false)

async function check() {
  if (adding.value) return
  adding.value = true
  try {
    await store.add(address.value)
    //success
    address.value = ''
    showModal.value = false
  } catch (e) {
  } finally {
    adding.value = false
  }
}
</script>

<style lang="stylus" scoped>
#table
  white-space nowrap

.floatRight
  float right
  width auto
  display inline-block
</style>