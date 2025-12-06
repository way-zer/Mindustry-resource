<script lang="tsx" setup>
import { colorize } from "~/utils/mindustry"

const props = defineProps<{ text?: string; noColor?: boolean }>()
const colorized = computed(() => colorize(props.text ?? ""))
</script>

<template>
	<span
		v-for="it in colorized"
		:key="it.key"
		:style="props.noColor ? undefined : { color: it.color }"
	>
		{{ it.text }}
	</span>
</template>
