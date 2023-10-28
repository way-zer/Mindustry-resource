<template>
    <Dialog @close="() => navigateTo('/map')" maxWidth="1200px">
        <el-row type="flex" justify="center">
            <el-col :md="10" :xs="18">
                <SquaredImage :src="detail.preview" />
                <el-row :gutter="24" justify="center" type="flex">
                    <ActionCopy :thread="detail.thread" :hash="detail.hash" circle />
                    <ActionDownload :hash="detail.hash" circle />
                    <ActionChangeMode v-if="admin" :thread="detail.thread" :now="detail.mode" />
                    <ActionUpload v-if="admin" :thread="detail.thread" circle />
                    <el-popconfirm title="确认删除地图？该操作不可恢复" @confirm="doDelete">
                        <template #reference>
                            <el-button circle>
                                <el-icon-delete class="h-4" />
                            </el-button>
                        </template>
                    </el-popconfirm>
                </el-row>
            </el-col>
            <el-col :md="10" :xs="18">
                <h2><b>{{ tags.name }}</b></h2>
                <h4><b>宽高:</b> {{ tags.width }}x{{ tags.height }} <b>游戏版本:</b> {{ tags.build }} <b>作者:</b> {{
                    tags.author }}
                </h4>
                <h4><b>地图编号:</b> {{ detail.thread }} <b>游戏模式:</b> {{ detail.mode }} <b>上传者:</b>
                    <el-tooltip content="点击查看该用户更多地图">
                        <router-link to="/map" @click="mapStore.search('@user:' + detail.user).then()">
                            {{ detail.user }}
                        </router-link>
                    </el-tooltip>
                </h4>
                <h4><b>描述:</b> {{ tags.description }}</h4>
                <h5><b>识别码:</b> {{ detail.hash }}</h5>
                <h5><b>所需Mod:</b> {{ tags.mods }}</h5>
                <h4><b>规则:</b></h4>
                <ul>
                    <li>刷怪: {{ rules.waves ? '开' : '关' }} 进攻模式: {{ rules.attackMode ? '开' : '关' }}</li>
                    <li v-if="version >= 6">爆炸伤害: {{ rules.damageExplosions ? '开' : '关' }} 火焰: {{ rules.fire ? '开' : '关'
                    }} 弹药:
                        {{ rules.unitAmmo ? '开' : '关' }}
                    </li>
                    <li v-if="version === 5">单位血量: {{ rulesOld.unitHealthMultiplier || '1' }}倍</li>
                    <li>单位伤害: {{ rules.unitDamageMultiplier || '1' }}倍</li>
                    <li v-if="version >= 6">单位生产速度: {{ rules.unitBuildSpeedMultiplier || '1' }}倍</li>
                    <li v-if="version >= 6">单位上限: {{ rules.unitCap || 0 }}{{ rules.unitCapVariable ? '+核心加成' : '(固定)' }}
                    </li>
                    <li v-if="version === 5">玩家血量: {{ rulesOld.playerHealthMultiplier || '1' }}倍</li>
                    <li v-if="version === 5">玩家伤害: {{ rulesOld.playerDamageMultiplier || '1' }}倍</li>
                    <li>建筑资源消耗: {{ rules.buildCostMultiplier || '1' }}倍</li>
                    <li>建筑速度: {{ rules.buildSpeedMultiplier || '1' }}倍</li>
                    <li>建筑拆除返还: {{ rules.deconstructRefundMultiplier || '0.5' }}倍</li>
                    <li>建筑血量: {{ rules.blockHealthMultiplier || '1' }}倍</li>
                    <li>炮塔伤害: {{ rules.blockDamageMultiplier || '1' }}倍</li>
                    <li>核心保护: {{ rules.enemyCoreBuildRadius / 8 || 50 }}格</li>
                    <li v-if="version === 5">重生时间: {{ rulesOld.respawnTime / 60 }}秒</li>
                    <li>每波间隔: {{ rules.waveSpacing / 60 || 120 }}秒</li>
                    <li>
                        <details>
                            <summary>禁用建筑:</summary>
                            <ul>
                                <li v-for="d in (rules.bannedBlocks?.values || [])" :key="d">{{ d }}</li>
                            </ul>
                        </details>
                    </li>
                    <li>
                        <details>
                            <summary>初始物资:</summary>
                            <ul>
                                <li v-for="d in rules.loadout || []" :key="d.item">{{ d.item }}: {{ d.amount }}</li>
                            </ul>
                        </details>
                    </li>
                    <li>
                        <details>
                            <summary>波次刷怪:</summary>
                            <ul>
                                <li v-for="(d, i) in rules.spawns" :key="i">
                                    {{ d.type }}{{ d.effect ? '(BOSS)' : '' }}:
                                    从{{ d.begin || 1 }}{{ d.end ? '到' + d.end : '开始' }}
                                    每{{ d.spacing ? 1 + d.spacing : 1 }}波
                                    生成{{ d.amount || 1 }}{{ d.scaling ? `+${d.scaling}T` : '' }}只
                                </li>
                            </ul>
                        </details>
                    </li>
                    <li>
                        <details>
                            <summary>地形筛选器</summary>
                            <ol>
                                <li v-for="(d, i) in tags.genfilters" :key="i">{{ JSON.stringify(d) }}</li>
                            </ol>
                        </details>
                    </li>
                    <li>太阳能发电: {{ rules.solarPowerMultiplier || '1' }}倍</li>
                </ul>
                <b>原始数据:</b>
                <json-viewer :value="tags" :expandDepth="0" style="padding: 0" />
            </el-col>
        </el-row>
        <div id="footer">
            <span>可以直接分享该页链接给他人</span><br />
            <pre>{{ path }}</pre>
        </div>
    </Dialog>
</template>

<script lang="tsx" setup>
import { JsonViewer } from 'vue3-json-viewer'
import { MapApi } from '@/backendApi/maps'
import type { MapDetail, Rules, RulesV5, Tags } from '@/backendApi/maps/type'
import ActionCopy from '../components/ActionCopy.vue'
import ActionDownload from '../components/ActionDownload.vue'
import ActionUpload from '../components/ActionUpload.vue'
import ActionChangeMode from '../components/ActionChangeMode.vue'

const userStore = useUserStore()
const mapStore = useMapStore()
const route = useRoute()
const router = useRouter()
const path = computed(() => import.meta.server ? useRequestURL() : location.toString())

const { data, pending } = useMapDetail(route.params.thread as string, route.params.id as string || 'latest')
const detail = computed(() => data.value || {} as MapDetail)
const tags = computed(() => ((detail.value.tags || {}) as Tags))
const rules = computed(() => ((detail.value.tags?.rules || {}) as Rules))
const rulesOld = computed(() => ((detail.value.tags?.rules || {}) as RulesV5))
const version = computed(() => {
    let build = (detail.value?.tags?.build || -1)
    if (build > 104) return 6
    if (build > 0) return 5
    return 0
})
const admin = computed(() => {
    if (!userStore.logged) return false
    return userStore.admin || userStore.info.name == detail.value.user
})

async function doDelete() {
    await MapApi.edit('' + detail.value.thread, "delete", "")
    mapStore.data = mapStore.data.filter(it => it.id != detail.value.thread)
    await router.replace({ path: '/map' })
}
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