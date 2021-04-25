<template>
  <el-dialog model-value @close="close" width="100%" :zIndex="100">
    <el-skeleton :loading="data === {}">
      <el-row type="flex" justify="center">
        <el-col :md="10" :xs="18">
          <SquaredImage :src="data.preview"/>
          <el-row :gutter="24" justify="center" type="flex">
            <ActionCopy :thread="data.thread" :hash="data.hash" circle/>
            <ActionDownload :hash="data.hash" circle/>
            <ActionChangeMode v-if="admin" :thread="data.thread" :now="data.mode"/>
            <ActionUpload v-if="admin" :thread="data.thread"/>
          </el-row>
        </el-col>
        <el-col :md="10" :xs="18">
          <h4>地图名: {{ tags.name }}</h4>
          <h5>地图编号: {{ data.thread }}</h5>
          <h5>宽高: {{ tags.width }}x{{ tags.height }} 游戏版本: {{ tags.build }} 游戏模式: {{ data.mode }}</h5>
          <h5>识别码: {{ data.hash }}</h5>
          <h5>上传者:
            <el-tooltip content="点击查看该用户更多地图">
              <a :href="'/maps?' + encodeURI('@user:' + data.user)">{{ data.user }}</a>
            </el-tooltip>
          </h5>
          <h5>作者: {{ tags.author }}</h5>
          <h5>描述: {{ tags.description }}</h5>
          <h5>所需Mod: {{ tags.mods }}</h5>
          <h5>规则:</h5>
          <ul>
            <li>刷怪: {{ rules.waves ? '开' : '关' }} 进攻模式: {{ rules.attackMode ? '开' : '关' }}</li>
            <li>单位血量: {{ rules.unitHealthMultiplier || '1' }}倍</li>
            <li>单位伤害: {{ rules.unitDamageMultiplier || '1' }}倍</li>
            <li>玩家血量: {{ rules.playerHealthMultiplier || '1' }}倍</li>
            <li>玩家伤害: {{ rules.playerDamageMultiplier || '1' }}倍</li>
            <li>建筑血量: {{ rules.blockHealthMultiplier || '1' }}倍</li>
            <li>核心保护: {{ rules.enemyCoreBuildRadius / 8 }}格</li>
            <li>重生时间: {{ rules.respawnTime / 60 }}秒</li>
            <li>每波间隔: {{ rules.waveSpacing / 60 }}秒</li>
            <li>
              <details>
                <summary>禁用建筑:</summary>
                <ul>
                  <li v-for="d in (rules.bannedBlocks?.values||[])" :key="d">{{ d }}</li>
                </ul>
              </details>
            </li>
            <li>
              <details>
                <summary>初始物资:</summary>
                <ul>
                  <li v-for="d in rules.loadout||[]" :key="d.item">{{ d.item }}: {{ d.amount }}</li>
                </ul>
              </details>
            </li>
            <li>
              <details>
                <summary>波次刷怪:</summary>
                <ul>
                  <li v-for="(d,i) in rules.spawns" :key="i">
                    {{ d.type }}{{ d.effect ? '(BOSS)' : '' }}:
                    从{{ d.begin || 1 }}{{ d.end ? '到' + d.end : '开始' }}
                    每{{ d.spacing ? 1 + d.spacing : 1 }}波
                    生成{{ d.amount || 1 }}{{ d.scaling ? `+${d.scaling}T` : '' }}只
                  </li>
                </ul>
              </details>
            </li>
            <li>太阳能发电: {{ rules.solarPowerMultiplier || '1' }}倍</li>
          </ul>
        </el-col>
      </el-row>
      <p id="footer">
        <span>可以直接分享该页链接给他人</span><br/>
        <pre>{{ path }}</pre>
      </p>
    </el-skeleton>
  </el-dialog>
</template>

<script lang="tsx">
import {computed, defineComponent, ref, watch} from "vue";
import SquaredImage from "@/components/SquaredImage.vue";
import {MapApi} from "@/store/maps/api";
import {MapDetail} from "@/store/maps/type";
import {useRoute, useRouter} from "vue-router";
import ActionCopy from "@/views/map/components/ActionCopy.vue";
import ActionDownload from "@/views/map/components/ActionDownload.vue";
import ActionUpload from "@/views/map/components/ActionUpload.vue";
import ActionChangeMode from "@/views/map/components/ActionChangeMode.vue";

export default defineComponent({
  name: "Detail",
  components: {
    ActionChangeMode,
    ActionUpload,
    ActionDownload,
    ActionCopy,
    SquaredImage
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const ret = ref<MapDetail>({})
    watch(() => route.params, async (p) => {
      if (p.thread)
        ret.value = await MapApi.detail(p.thread, p.id || 'latest')
    }, {immediate: true})
    return {
      data: ret,
      tags: computed(() => ret.value.tags || {}),
      rules: computed(() => ret.value.tags?.rules || {}),
      admin: computed(() => true),
      path: computed(() => location.toString()),
      close: () => {
        router.push({path: "/map"})
      }
    }
  }
})
</script>

<style scoped lang="stylus">
h1, h2, h3, h4, h5, h6
  margin-top: 0;
  margin-bottom: .5em;
  color: rgba(0, 0, 0, .85);
  font-weight: 500;

#footer
  text-align center
</style>