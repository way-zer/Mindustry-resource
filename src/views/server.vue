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
          <el-switch active-text="自动刷新" inactive-value="手动刷新" v-model="autoUpdate"/>
          <el-button size="small" round type="primary"
                     @click="showModal = true">
            <el-icon-plus/>
            添加服务器
          </el-button>
        </el-space>
      </el-row>
    </template>
    <el-table :data="data" v-loading="loading" row-key="address" id="table"
              :default-sort="{prop:'players',order:'descending'}">
      <el-table-column label="地址" prop="address" fixed="left"
                       :filters="versionFilters" :filter-method="versionFilter">
        <template #default="scope">
          <el-tooltip>
            <template #content>
              <span v-if="i(scope).online">延迟{{ i(scope).timeMs }}ms</span>
              <span v-else>最后在线{{ ((Date.now() - i(scope).lastOnline) / 60000).toFixed(2) }}分钟前</span>
            </template>
            <div>
              {{ i(scope).address }}
              <br/>
              <el-icon-orange v-if="i(scope).online" style="color: forestgreen"/>
              <el-icon-orange v-else style="color: orangered"/>
              版本 {{ i(scope).version }}
            </div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="名字" prop="name">
        <template #default="scope">
          <ColorizeSpan :text="i(scope).name"/>
          <br/>
          <ColorizeSpan :text="i(scope).description"/>
        </template>
      </el-table-column>
      <el-table-column label="人数" prop="players" :sort-by="score" sortable>
        <template #default="scope">
          <b>{{ i(scope).players }}</b>/{{ i(scope).limit || '无限制' }}
          <template v-if="i(scope).type === 'hub'">
            <br/>
            <el-icon-warning style="color: orangered"/>
            本服为大厅服,人数非真实
          </template>
        </template>
      </el-table-column>
      <el-table-column label="地图" prop="map"
                       :filters="modeFilters" :filter-method="(f,v)=>(v.mode===f)">
        <template #default="scope">
          <ColorizeSpan :text="i(scope).mapName"/>
          <br/>
          模式: {{ modeMap[i(scope).mode] }}, 第{{ i(scope).wave }}波
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="请输入服务器地址" v-model="showModal">
      <el-input type="text" v-model="address" @submit="check"/>
      <el-row type="flex" justify="end">
        <el-button type="primary" :loading="adding" @click="check">提交</el-button>
      </el-row>
    </el-dialog>
  </el-card>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {ServerInfo} from '@/store/server/type'
import {modeFilters, modeMap} from '@/util/mindustry'
import {serverStore} from '@/store/server'

export default defineComponent({
  data: () => ({
    intervalId: -1,
    modeMap, modeFilters,
    autoUpdate: true,
    showModal: false,
    adding: false,
    address: '',
    versionFilters: [
      {text: '5.0 正式版', value: 5},
      {text: '6.0 版本', value: 6},
      {text: 'BE测试版', value: 'BE'},
    ],
    versionFilter: (f, v: ServerInfo) => {
      if (f == 5) return v.version <= 104
      if (f == 6) return v.version > 104 && v.version <= 1000
      if (f == 'BE') return v.version > 1000
    },
    i: (scope) => (scope.row as ServerInfo),
  }),
  computed: {
    loading: () => (serverStore.loading),
    data: () => (serverStore.data),
  },
  methods: {
    async check() {
      if (this.adding) return
      this.adding = true
      try {
        await serverStore.add(this.address)
        //success
        this.address = ''
        this.showModal = false
      } catch (e) {
      } finally {
        this.adding = false
      }
    },
    score(v: ServerInfo) {
      if (!v.online) return -1 + v.players / 1000
      if (v.type == 'hub') return v.players / 1000
      return v.players
    },
  },
  mounted() {
    serverStore.refresh().then()
    this.intervalId = setInterval(() => {
      serverStore.refresh().then()
    }, 60000)
  },
  unmounted() {
    clearInterval(this.intervalId)
  },
})
</script>

<style lang="stylus" scoped>

#table
  white-space nowrap

.floatRight
  float right
  width auto
  display inline-block
</style>