<template>
  <el-button v-if="circle" :icon="icon" circle @click="click"/>
  <i v-else class="el-link el-link--default" :class="[icon]" @click="click"/>
</template>

<script lang="tsx">
import {defineComponent} from "vue";

export default defineComponent({
  name: "IconButton",
  props: {
    circle: Boolean,
    icon: String,
  },
  emits: ["click"],
  methods: {
    click(e: any){
      this.$emit("click",e)
    }
  }
})
</script>

<style scoped>
i {
  font-size: 18px;
}
</style>