<template>
  <el-row type="flex" :gutter=16>
    <el-col :xs=24 :sm=12 :lg=6 v-for="map in maps" :key="map.latest">
      <el-card class="mapCard">
        <SquaredImage :src="map.preview" alt="preview"/>
        <div>
          <div>
            <el-space size="mini">
              <el-tag
                  v-for="tag in map.tags" :key="tag"
                  size="small" effect="plain" :color="tag.split('§')[1] || 'default'"
              >
                <ColorizeSpan :text="tag.split('§')[0]"/>
              </el-tag>
            </el-space>
          </div>
          <b>{{ map.name }}</b>
          <p>{{ map.desc }}</p>
          <el-divider/>
          <el-row justify="space-around" type="flex">
            <ActionCopy :thread="map.id" :hash="map.latest"/>
            <el-divider direction="vertical"/>
            <ActionDownload :hash="map.latest"/>
            <el-divider direction="vertical"/>
            <ActionDetail :thread="map.id"/>
          </el-row>
        </div>
      </el-card>
    </el-col>
    <el-empty v-if="maps.length===0" style="width: 100%" description="暂无数据，尝试切换关键词试试"/>
    <div class="center" v-if="loading">内容加载中..</div>
    <div class="center" v-if="noMore">没有更多了</div>
  </el-row>
  <el-backtop/>
</template>

<script type="tsx">
import SquaredImage from '@/components/SquaredImage.vue'
import ColorizeSpan from '@/components/ColorizeSpan.vue'
import {computed, defineComponent} from 'vue'
import ActionDownload from '@/views/map/components/ActionDownload.vue'
import ActionCopy from '@/views/map/components/ActionCopy.vue'
import ActionDetail from '@/views/map/components/ActionDetail.vue'
import infiniteScroll from '@/util/infiniteScroll'
import {mapsStore} from '@/store/maps'
import {ElMessage} from 'element-plus'

export default defineComponent({
  components: {ActionDetail, ActionCopy, ActionDownload, ColorizeSpan, SquaredImage},
  setup() {
    infiniteScroll(200, 10, () => (mapsStore.loading || mapsStore.noMore), mapsStore.pullMore)
    setTimeout(() => {
      ElMessage.success('拷贝到剪切板成功')
    }, 1000)
    return {
      maps: computed(() => mapsStore.data),
      loading: computed(() => mapsStore.loading),
      noMore: computed(() => mapsStore.noMore),
    }
  },
})
</script>

<style lang="stylus" scoped>
.center
  width 100%
  text-align center
</style>