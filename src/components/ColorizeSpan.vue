<template>
<span v-for="it in colorized" :style="{color: it.color}" :key="it.key">
  {{ it.text }}
</span>
</template>

<script lang="tsx" setup>
import {colorize} from "../util/mindustry";

const props = defineProps<{ text: string }>()
const colorized = computed(() => colorize(props.text))
</script>