<template>
	<div class="p-6 max-w-screen-lg mx-auto">
		<!-- 居中标题 -->
		<h1 class="text-xl font-bold text-center">微泽服-赤潮RANK记录</h1>

		<!-- 顶部筛选框 -->
		<el-row class="mb-6" justify="center">
			<el-col :span="8">
				<el-input
					v-model="filterQQ"
					placeholder="输入玩家 QQ 号"
					clearable
					size="large"
					class="w-full"
				>
					<template #prepend>筛选 QQ</template>
				</el-input>
			</el-col>
		</el-row>

		<!-- 玩家统计信息块 -->
		<el-card class="mb-6">
			<template #header>
				<div class="text-lg font-bold">统计信息</div>
			</template>

			<el-descriptions v-if="playerStats" :column="6" border>
				<el-descriptions-item label="QQ号" span="3">{{
					playerStats.qq
				}}</el-descriptions-item>
				<el-descriptions-item label="最终得分" span="3">{{
					playerStats.finalScore
				}}</el-descriptions-item>
				<el-descriptions-item label="比赛次数" span="2">{{
					playerStats.matchCount
				}}</el-descriptions-item>
				<el-descriptions-item label="胜场数" span="2">{{
					playerStats.winCount
				}}</el-descriptions-item>
				<el-descriptions-item label="胜率" span="2"
					>{{ playerStats.winRate }}%</el-descriptions-item
				>
			</el-descriptions>
			<div v-else class="text-center text-gray-500">
				请输入有效的 QQ 号以查看统计信息
			</div>
		</el-card>

		<el-card class="mb-6">
			<template #header>
				<!-- 分页控制 -->
				<div class="flex justify-between items-center">
					<div class="text-lg font-bold">
						比赛记录 (共 {{ filteredMatches.length }} 场)
					</div>
					<el-pagination
						v-model:current-page="currentPage"
						:page-size="pageSize"
						:total="filteredMatches.length"
						layout="prev, pager, next"
						background
						size="large"
					/>
				</div>
			</template>

			<!-- 比赛卡片列表 -->
			<el-card
				v-for="(match, index) in paginatedMatches"
				:key="match.time"
				shadow="hover"
				class="mb-4"
			>
				<!-- 卡片头部：比赛编号 + 时间 + 地图信息 -->
				<div class="flex justify-between items-center mb-2">
					<div class="text-base font-bold">
						比赛 {{ currentStart + index + 1 }}
					</div>
					<div class="flex gap-2">
						<el-tag type="info">地图 {{ match.map }}</el-tag>
						<el-tag type="warning"
							>时长 {{ (match.duration / 60).toFixed(2) }} 分钟</el-tag
						>
						<el-tag type="success">{{ formatTime(match.time) }}</el-tag>
					</div>
				</div>

				<!-- 对战信息区域 -->
				<div class="flex justify-between items-center gap-4">
					<!-- 左侧玩家 -->
					<div
						class="flex-1 rounded p-3 relative border"
						:class="
							match.users[0].rank === 1
								? 'border-green-500 bg-green-50'
								: 'border-gray-200'
						"
					>
						<el-tag
							class="absolute -top-2 -right-2"
							:type="match.users[0].rank === 1 ? 'success' : 'danger'"
							size="small"
						>
							{{ match.users[0].rank === 1 ? "胜" : "负" }}
						</el-tag>
						<div class="font-medium">QQ：{{ match.users[0].qq }}</div>
						<div>
							分数：{{ match.users[0].before }} → {{ match.users[0].after }}
						</div>
					</div>

					<!-- VS 标签 -->
					<el-tag type="info" size="large">VS</el-tag>

					<!-- 右侧玩家 -->
					<div
						class="flex-1 rounded p-3 relative border"
						:class="
							match.users[1].rank === 1
								? 'border-green-500 bg-green-50'
								: 'border-gray-200'
						"
					>
						<el-tag
							class="absolute -top-2 -left-2"
							:type="match.users[1].rank === 1 ? 'success' : 'danger'"
							size="small"
						>
							{{ match.users[1].rank === 1 ? "胜" : "负" }}
						</el-tag>
						<div class="font-medium">QQ：{{ match.users[1].qq }}</div>
						<div>
							分数：{{ match.users[1].before }} → {{ match.users[1].after }}
						</div>
					</div>
				</div>
			</el-card>
		</el-card>
	</div>
</template>

<script setup lang="ts">
import data from "~/assets/rank_14690.jsonl?raw"

interface User {
	qq: number
	rank: number
	before: number
	after: number
}

const allMatches = (data as string)
	.trim()
	.split("\n")
	.map((line) => {
		return JSON.parse(line) as {
			map: number
			duration: number
			time: number
			users: User[]
		}
	})
	.reverse()

const filterQQ = useRouteQuery("q", "")
const currentPage = ref(1)
const pageSize = 10

// 筛选逻辑
const filteredMatches = computed(() => {
	if (!filterQQ.value) return allMatches
	return allMatches.filter((match) =>
		match.users.some((user) => user.qq.toString().includes(filterQQ.value)),
	)
})

const playerStats = computed(() => {
	const qq = filterQQ.value.trim()
	const matches = allMatches.filter((match) =>
		match.users.some((user) => user.qq.toString() === qq),
	)
	if (matches.length == 0) return null

	const matchCount = matches.length
	const winCount = matches.filter(
		(match) => match.users.find((u) => u.qq.toString() === qq)?.rank === 1,
	).length

	const winRate = matchCount
		? ((winCount / matchCount) * 100).toFixed(1)
		: "0.0"

	const lastMatch = [...matches].find((match) =>
		match.users.some((u) => u.qq.toString() === qq),
	)
	const finalScore =
		lastMatch?.users.find((u) => u.qq.toString() === qq)?.after ?? "-"

	return {
		qq,
		matchCount,
		winCount,
		winRate,
		finalScore,
	}
})

const currentStart = computed(() => (currentPage.value - 1) * pageSize)

const paginatedMatches = computed(() =>
	filteredMatches.value.slice(
		currentStart.value,
		currentStart.value + pageSize,
	),
)

// 时间格式化
function formatTime(timestamp) {
	return new Date(timestamp).toLocaleString()
}
</script>
