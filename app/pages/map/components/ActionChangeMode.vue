<template>
	<div>
		<el-dialog
			v-model="show"
			title="设置游戏模式"
			append-to-body
			destroy-on-close
		>
			<label>模式: </label>
			<el-select v-model="selectMode">
				<el-option v-for="mode in gameModes" :key="mode" :value="mode" />
			</el-select>
			<template #footer>
				<el-button type="primary" @click="submit">确定</el-button>
			</template>
		</el-dialog>
		<app-tooltip content="设置游戏模式">
			<el-button
				circle
				@click="
					selectMode = now
					show = true
				"
			>
				<Icon name="ep:edit" />
			</el-button>
		</app-tooltip>
	</div>
</template>

<script lang="tsx" setup>
import { MapApi } from "@/backendApi/maps"
import { gameModes } from "@/backendApi/maps/type"

const props = defineProps<{
	thread: number
	now: (typeof gameModes)[number]
}>()

const show = ref(false)
const selectMode = ref("")

async function submit() {
	await MapApi.editMode("" + props.thread, selectMode.value)
	history.back()
}
</script>
