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
  <el-tooltip content="设置游戏模式">
    <el-button circle @click="mode = now;show = true">
      <el-icon-edit/>
    </el-button>
  </el-tooltip>
</template>

<script lang="tsx">
import {gameModes} from '@/store/maps/type'
import {MapApi} from '@/store/maps/api'

export default defineComponent({
  name: 'ActionChangeMode',
  props: {
    thread: Number,
    now: {
      type: String,
      enums: gameModes,
      default: 'UnKnown',
    },
  },
  data: () => ({
    show: false,
    mode: '',
    modes: gameModes
  }),
  methods: {
    async submit() {
      await MapApi.edit(this.$props.thread, 'mode', this.mode);
      this.$router.go(0)
    }
  }
})
</script>