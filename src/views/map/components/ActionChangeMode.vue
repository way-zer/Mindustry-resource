<template>
  <el-dialog v-model="show" title="设置游戏模式" append-to-body destroy-on-close>
    <label>模式: </label>
    <el-select v-model="mode">
      <el-option v-for="mode in modes" :key="mode" :value="mode"/>
    </el-select>
    <template #footer>
      <el-button type="primary" @click="submit">确定</el-button>
    </template>
  </el-dialog>
  <a-tooltip title="设置游戏模式" destroy-tooltip-on-hide>
    <icon-button icon="el-icon-edit" circle @click="mode = $props.now.toString();show = true"/>
  </a-tooltip>
</template>

<script lang="tsx">
import IconButton from "@/components/IconButton.vue";
import {gameModes} from "@/store/maps/type";
import {defineComponent} from "vue";
import {MapApi} from "@/store/maps/api";

export default defineComponent({
  name: "ActionChangeMode",
  components: {IconButton},
  props: {
    thread: Number,
    now: {
      type: String,
      enums: gameModes
    }
  },
  data: () => ({
    show: false,
    mode: '',
    modes: gameModes
  }),
  methods: {
    async submit() {
      await MapApi.edit(this.$props.thread,'mode',this.mode);
      this.$router.go(0)
    }
  }
})
</script>