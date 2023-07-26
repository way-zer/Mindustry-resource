<template>
  <el-table :data="store.data" v-loading="store.loading" row-key="address" style="white-space: nowrap"
            :default-sort="{prop:'players',order:'descending'}">
    <el-table-column label="地址" prop="address" fixed="left">
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
            <el-icon-orange class="inline h-4 color-error" :class="{'color-success':i(scope).online}"/>
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
    <el-table-column label="人数" prop="players" :sort-by="it => it.ext.score" sortable>
      <template #default="scope">
        <b>{{ i(scope).players }}</b>/{{ i(scope).limit || '无限制' }}
        <template v-if="i(scope).ext.isHub">
          <br/>
          <!-- <el-icon-warning style="color: orangered"/> -->
          本服为大厅服,人数非真实
        </template>
      </template>
    </el-table-column>
    <el-table-column label="地图" prop="map">
      <template #default="scope">
        <ColorizeSpan :text="i(scope).mapName"/>
        <br/>
        模式: {{ modeMap[i(scope).mode] }}, 第{{ i(scope).wave }}波
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import type {ServerInfo} from '../../store/server/type'
import {modeMap} from '../../util/mindustry'
import {useStore} from "pinia-class-store";
import {ServerStore} from "../../store/server";
import Tooltip from "@components/Tooltip";
import ColorizeSpan from "@components/ColorizeSpan.vue";

const store = useStore(ServerStore)
// onServerPrefetch(() => store.refresh())

if (!import.meta.env.SSR)
  watchPostEffect((cleanFn) => {
    if (!store.autoRefresh) return
    const intervalId = setInterval(() => {
      store.refresh().then()
    }, 60000)
    cleanFn(() => clearInterval(intervalId))
  })

function i(scope) {
  return scope.row as ServerInfo
}
</script>