<template>
  <div class="p-6 max-w-screen-lg mx-auto">
    <!-- 居中标题 -->
    <h1 class="text-xl font-bold text-center">赤潮RANK比赛记录</h1>

    <!-- 控制区：筛选 + 分页 -->
    <el-row class="my-6" justify="center" align="middle" :gutter="20">
      <el-col :span="8">
        <el-input
            v-model="filterQQ"
            placeholder="输入玩家 QQ 号"
            clearable
            class="w-full"
        >
          <template #prepend>筛选 QQ</template>
        </el-input>
      </el-col>

      <el-col :span="8" class="text-center">
        <el-pagination
            v-model:current-page="currentPage"
            :page-size="pageSize"
            :total="filteredMatches.length"
            layout="prev, pager, next"
            class="w-full"
            background
        />
      </el-col>
    </el-row>
    <!-- 比赛卡片区域 -->
    <el-col
        v-for="(match, index) in paginatedMatches"
        :key="match.time"
    >
      <el-card shadow="hover" :body-style="{ padding: '8px'}">
        <template #header>
          <div class="flex justify-between items-center">
            <div>比赛 {{ currentStart + index + 1 }}</div>
            <div class="flex gap-2">
              <el-tag type="info">地图 {{ match.map }}</el-tag>
              <el-tag type="warning">时长 {{ match.duration.toFixed(2) }} 秒</el-tag>
              <el-tag type="success">{{ formatTime(match.time) }}</el-tag>
            </div>
          </div>
        </template>

        <el-row justify="space-around" align="middle">
          <!-- 左侧玩家 -->
          <el-col :span="10">
            <el-card
                :body-style="{ padding: '4px', position: 'relative' }"
                class="player-card"
                :class="{ winner: match.users[0].rank === 1 }"
            >
              <div class="absolute top-1 right-1">
                <el-tag :type="match.users[0].rank === 1 ? 'success' : 'danger'" size="small">
                  {{ match.users[0].rank === 1 ? '胜' : '负' }}
                </el-tag>
              </div>
              <div class="font-medium">QQ：{{ match.users[0].qq }}</div>
              <div>分数：{{ match.users[0].before }} → {{ match.users[0].after }}</div>
            </el-card>
          </el-col>

          <!-- VS 标签 -->
          <el-col :span="2" class="text-center">
            <el-tag type="info" size="large">VS</el-tag>
          </el-col>

          <!-- 右侧玩家 -->
          <el-col :span="10">
            <el-card
                :body-style="{ padding: '4px', position: 'relative' }"
                class="player-card"
                :class="{ winner: match.users[1].rank === 1 }"
            >
              <div class="absolute top-1 left-1">
                <el-tag :type="match.users[1].rank === 1 ? 'success' : 'danger'" size="small">
                  {{ match.users[1].rank === 1 ? '胜' : '负' }}
                </el-tag>
              </div>
              <div class="font-medium">QQ：{{ match.users[1].qq }}</div>
              <div>分数：{{ match.users[1].before }} → {{ match.users[1].after }}</div>
            </el-card>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
  </div>
</template>


<script setup lang="ts">
import data from '~/assets/rank_14690.jsonl?raw'

interface User {
  qq: number
  rank: number
  before: number
  after: number
}

const matches = (data as string).trim().split("\n").map(line => {
  return JSON.parse(line) as {
    map: number
    duration: number
    time: number
    users: User[]
  }
}).reverse()

const filterQQ = useRouteQuery("q", "")
const currentPage = ref(1)
const pageSize = 10

// 筛选逻辑
const filteredMatches = computed(() => {
  if (!filterQQ.value) return matches
  return matches.filter(match =>
      match.users.some(user => user.qq.toString().includes(filterQQ.value))
  )
})


const currentStart = computed(() => (currentPage.value - 1) * pageSize)

const paginatedMatches = computed(() =>
    filteredMatches.value.slice(currentStart.value, currentStart.value + pageSize)
)

// 时间格式化
function formatTime(timestamp) {
  return new Date(timestamp).toLocaleString()
}

</script>
<style scoped>
.player-card {
  text-align: center;
  border-radius: 6px;
  padding: 8px 12px;
}

.player-card.winner {
  border: 2px solid #67c23a;
  background: #f0f9eb;
}
</style>