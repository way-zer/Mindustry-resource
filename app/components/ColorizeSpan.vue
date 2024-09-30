<script lang="tsx" setup>
import {colorize} from '~/utils/mindustry';

const props = defineProps<{ text?: string, noColor?: boolean }>()
const colorized = computed(() => colorize(props.text))
</script>

<template>
  <span v-for="it in colorized" :style="props.noColor ? undefined : { color: it.color }" :key="it.key">
    {{ it.text }}
  </span>
</template>