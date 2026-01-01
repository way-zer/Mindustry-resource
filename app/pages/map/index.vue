<template>
	<PageHeader title="地图分享">
		<template #actions>
			<el-input
				v-model="tmpSearch"
				placeholder="查找地图"
				clearable
				@change="search"
			/>
			<ActionUpload />
		</template>
		<el-alert type="info"
			>你知道吗? 在搜索栏输入地图id可以直接打开详情了。</el-alert
		>
		<div class="filter">
			<b class="text-base">游戏模式: </b>
			<el-radio-group
				size="small"
				class="inline-block"
				:model-value="getTag('mode')"
				@change="
					(v) => {
						replaceTag('mode', v)
					}
				"
			>
				<el-radio-button v-for="mode in gameModes" :key="mode" :value="mode">{{
					mode
				}}</el-radio-button>
				<el-radio-button :value="false">X</el-radio-button>
			</el-radio-group>
		</div>
		<div class="filter">
			<b class="text-base">游戏版本: </b>
			<el-radio-group
				size="small"
				class="inline-block"
				:model-value="getTag('version')"
				@change="
					(v) => {
						replaceTag('version', v)
					}
				"
			>
				<el-radio-button value="3">v5(104)</el-radio-button>
				<el-radio-button value="4">v6(126)</el-radio-button>
				<el-radio-button value="5">v7(135)</el-radio-button>
				<el-radio-button value="7">v7.5(136-146)</el-radio-button>
				<el-radio-button value="8">v8a(147-149)</el-radio-button>
				<el-radio-button value="9">v8b(150+)</el-radio-button>
				<el-radio-button :value="false">X</el-radio-button>
			</el-radio-group>
		</div>
		<div class="filter">
			<b class="text-base">排序方式: </b>
			<el-radio-group
				size="small"
				class="inline-block"
				:model-value="getTag('sort') || 'X'"
				@change="
					(v) => {
						replaceTag('sort', v)
					}
				"
			>
				<el-radio-button :value="false">热度</el-radio-button>
				<el-radio-button value="updateTime">更新时间</el-radio-button>
				<el-radio-button value="createTime">发布时间</el-radio-button>
				<el-radio-button value="download">下载量</el-radio-button>
				<el-radio-button value="rating">评分</el-radio-button>
				<el-radio-button value="like">点赞数</el-radio-button>
			</el-radio-group>
		</div>

		<el-row type="flex" :gutter="16">
			<el-col v-for="map in data" :key="map.id" :xs="24" :sm="12" :lg="6">
				<MapCard :map="map" :detail="detailRoute('' + map.id)" />
			</el-col>
			<el-empty
				v-if="data.length === 0"
				style="width: 100%"
				description="暂无数据，尝试切换关键词试试"
			/>
		</el-row>

		<div ref="loadMoreTrigger" style="height: 10px"></div>
		<div v-if="query.isFetching" class="text-center">内容加载中..</div>
		<el-button v-else-if="query.hasNextPage" @click="query.fetchNextPage()"
			>加载更多</el-button
		>
		<div v-else class="text-center">没有更多了</div>
		<el-backtop />
	</PageHeader>
	<NuxtPage />
</template>

<script lang="tsx" setup>
import { gameModes } from "@/backendApi/maps/type"
import MapCard from "~/pages/map/components/MapCard.vue"
import ActionUpload from "./components/ActionUpload.vue"
import type { TypedRouteLocationRaw } from "@typed-router/__router"

useHead({
	title: "地图分享",
	meta: [
		{ name: "description", content: "像素工厂资源站，丰富的地图资源下载" },
		{ name: "keywords", content: "Mindustry,像素工厂,资源站,地图,服务器,微泽" },
	],
})

const { searchKey, data, query } = useMapsList()

const tmpSearch = ref(searchKey.value)
watchEffect(() => (tmpSearch.value = searchKey.value))
const loadMoreTrigger = ref(null)
useIntersectionObserver(loadMoreTrigger, ([state]) => {
	if (
		state?.isIntersecting &&
		query.hasNextPage.value &&
		!query.isFetching.value
	) {
		query.fetchNextPage()
	}
})

function regexForTag(tag: string) {
	return new RegExp("@" + tag + ":(\\w+)")
}

function getTag(tag: string) {
	return searchKey.value.match(regexForTag(tag))?.[1]
}

function replaceTag(tag: string, value: string | number | boolean | undefined) {
	const regex = regexForTag(tag)
	const key = searchKey.value
	if (!key.match(regex)) {
		if (!value) return
		searchKey.value = key + ` @${tag}:${value} `
	} else {
		const v = !value ? "" : `@${tag}:${value}`
		searchKey.value = key.replace(regex, v)
	}
}

function detailRoute(thread: string) {
	return {
		path: `/map/${thread}/latest`,
		state: { backWhenClose: true },
	} satisfies TypedRouteLocationRaw
}

function search(key: string) {
	while (key.includes("  ")) key = key.replace("  ", " ")
	key = key.trim() //reduce space
	if (key.match(/^\d{5}$/)) {
		navigateTo(detailRoute(key))
		return
	}
	searchKey.value = key
}
</script>

<style scoped>
.el-radio-button :deep(span) {
	@media only screen and (max-width: 768px) {
		padding: 9px 6px;
	}
}
</style>
