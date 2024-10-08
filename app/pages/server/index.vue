<template>
  <PageHeader title="公共服务器列表">
    <template #actions>
      <el-switch active-text="自动刷新" inactive-text="手动刷新" v-model="store.autoRefresh"/>
      <AddServerButton/>
    </template>
    <el-table :data="store.data" v-loading="store.pending" row-key="address" id="table"
              :default-sort="{ prop: 'players', order: 'descending' }">
      <el-table-column label="地址 (按版本筛选)" prop="address" min-width="200">
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
              <el-icon-orange class="inline h-4 color-error" :class="{ 'color-success': i(scope).online }"/>
              版本 {{ i(scope).version }}
            </div>
          </tooltip>
        </template>
      </el-table-column>
      <el-table-column label="名字" prop="name" min-width="300">
        <template #default="scope">
          <ColorizeSpan :text="i(scope).name"/>
          <br/>
          <ColorizeSpan :text="i(scope).description"/>
        </template>
      </el-table-column>
      <el-table-column label="人数" prop="players" min-width="100" :sort-by="it => it.ext.score" sortable>
        <template #default="scope">
          <b>{{ i(scope).players }}</b>/{{ i(scope).limit || '无限制' }}
          <template v-if="i(scope).ext.isHub">
            <br/>
            <el-icon-warning style="color: orangered;height: 16;"/>
            本服为大厅服,人数非真实
          </template>
        </template>
      </el-table-column>
      <el-table-column label="地图 (按模式筛选)" prop="map" min-width="150" :filters="modeFilters"
                       :filter-method="(f, v) => (v.mode === f)">
        <template #default="scope">
          <ColorizeSpan :text="i(scope).mapName"/>
          <br/>
          模式: {{ modeMap[i(scope).mode] }}, 第{{ i(scope).wave }}波
        </template>
      </el-table-column>
    </el-table>
  </PageHeader>
</template>

<script lang="ts" setup>
import AddServerButton from "./AddServerButton.vue";
import type {ServerInfo} from '~/backendApi/server';

useHead({
  title: '服务器列表',
  meta: [
    {name: 'description', content: '像素工厂资源站，中文公共服务器排行榜'},
    {name: 'keywords', content: 'Mindustry,像素工厂,资源站,服务器,多人,联机,微泽'},
  ],
})
const store = useServerStore()

watchPostEffect((cleanFn) => {
  if (!store.autoRefresh || import.meta.server) return
  const intervalId = setInterval(() => {
    store.refresh().then()
  }, 60000)
  cleanFn(() => clearInterval(intervalId))
})

function i(scope: any) {
  return scope.row as ServerInfo
}
</script>