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
    <!--    <el-alert type="info" closable show-icon-->
    <!--              title='使用指令换图时,若模式不对,可在指令后面附加模式参数,例如"/vote map xxxx A"代表进攻模式 S生存,A进攻,P为PVP,C为沙盒'-->
    <!--    />-->
    <div id="filter">
      <b>按模式筛选: </b>
      <el-radio-group size="small"
                      :model-value="(searchKey.match('@mode:([a-zA-Z]+) ') || [])[1]"
                      @change="(v)=>{
            if(v!=='X') onSearch('@mode:'+v+' ')
            else onSearch('')
          }"
      >
        <el-radio-button v-for="mode in modes" :key="mode" :label="mode"/>
        <el-radio-button label="X"/>
      </el-radio-group>
    </div>
    <MapList/>
    <router-view/>
  </el-card>
</template>

<script lang="tsx">
import {defineComponent, onBeforeUnmount, ref} from 'vue'
import MapList from '@/views/map/sub/MapList.vue'
import {gameModes} from '@/store/maps/type'
import ActionUpload from '@/views/map/components/ActionUpload.vue'
import {mapsStore} from '@/store/maps'

export default defineComponent({
  components: {ActionUpload, MapList},
  setup() {
    const tmpSearch = ref(mapsStore.searchKey)
    const unwatch = mapsStore.$watch((it) => it.searchKey, (it) => {
      tmpSearch.value = it
    }) as () => any
    onBeforeUnmount(unwatch)
    return {
      modes: gameModes,
      searchKey: tmpSearch,
      onSearch: (v: string) => {
        tmpSearch.value = v
        mapsStore.search(v).then()
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

#filter
  margin 8px

  b
    font-size 16px
    line-height 32px
</style>