<template>
  <el-dialog v-model="show" title="设置游戏模式" append-to-body destroy-on-close>
    <label>模式: </label>
    <el-select v-model="selectMode">
      <el-option v-for="mode in gameModes" :key="mode" :value="mode"/>
    </el-select>
    <template #footer>
      <el-button type="primary" @click="submit">确定</el-button>
    </template>
  </el-dialog>
  <tooltip content="设置游戏模式">
    <el-button circle @click="selectMode = now;show = true">
      <el-icon-edit class="h-4"/>
    </el-button>
  </tooltip>
</template>

<script lang="tsx" setup>
import {gameModes} from '@/store/maps/type'
import {MapApi} from '@/store/maps/api'

const props = defineProps({
  thread: Number,
  now: {
    type: String,
    enums: gameModes,
    default: 'UnKnown',
  },
})

const show = ref(false)
const selectMode = ref('')

async function submit() {
  await MapApi.edit('' + props.thread, 'mode', selectMode.value);
  history.back()
}
</script>