<template>
<span v-for="it in colorize(text)" :style="{color: it.color}" :key="it.key">
  {{ it.text }}
</span>
</template>

<script lang="tsx">
import {colorize} from "@/util/mindustry";
import {defineComponent} from "vue";

export default defineComponent({
  name: "ColorizeSpan",
  props: {
    text: String
  },
  setup(props) {
    return {
      text: props.text,
      colorize
    }
  }
})
</script>

<style scoped>

</style>