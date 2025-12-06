<template>
	<el-card>
		<SquaredImage :src="map.preview" alt="preview" />
		<div>
			<div>
				<el-space size="small">
					<el-tag
						v-for="tag in map.tags"
						:key="tag"
						size="small"
						effect="plain"
						:color="tag.split('§')[1] || 'default'"
					>
						<ColorizeSpan :text="tag.split('§')[0]" />
					</el-tag>
				</el-space>
			</div>
			<b>
				<ColorizeSpan :text="map.name" no-color />
			</b>
			<p class="line-clamp-3 h-16 overflow-hidden">
				<ColorizeSpan :text="map.desc" no-color />
			</p>
			<div class="divider" />
			<el-row justify="space-around" type="flex">
				<ActionCopy :thread="map.id" />
				<el-divider direction="vertical" />
				<ActionDownload :thread="map.id" :map-name="map.name" />
				<el-divider direction="vertical" />
				<NuxtLink
					v-slot="{ href, navigate }"
					:to="`/map/${map.id}/latest`"
					custom
				>
					<app-tooltip content="地图详情">
						<el-button link tag="a" :href="href" @click="navigate">
							<Icon name="ep:more" />
						</el-button>
					</app-tooltip>
				</NuxtLink>
			</el-row>
		</div>
	</el-card>
</template>

<script lang="tsx" setup>
import type { MapInfo } from "~/backendApi/maps/type"
import ActionCopy from "./ActionCopy.vue"
import ActionDownload from "./ActionDownload.vue"

const { map } = defineProps<{
	map: MapInfo
}>()
</script>

<style scoped>
.divider {
	--divider-m: 0;
}
</style>
