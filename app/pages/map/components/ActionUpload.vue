<template>
	<el-button v-if="!circle" type="primary" @click="click">
		上传地图
		<Icon name="ep:upload" />
	</el-button>
	<app-tooltip v-else content="更新地图">
		<el-button circle @click="click">
			<Icon name="ep:upload" />
		</el-button>
	</app-tooltip>
</template>

<script lang="ts" setup>
const props = withDefaults(
	defineProps<{
		thread?: number
		circle?: boolean
	}>(),
	{ circle: false, thread: undefined },
)

function click() {
	navigateTo({
		path: "/map/upload",
		query: props.thread ? { update: props.thread } : {},
		state: { backWhenClose: true },
	})
}
</script>
