<script setup lang="ts">
import {useStore} from "pinia-class-store";
import {ElSwitch} from "element-plus";
import {GameStore} from "@/store/game";

const store = useStore(GameStore)
</script>

<template>
  <el-switch active-text="使用镜像加速" inactive-text="不使用镜像加速" v-model="store.useMirror" />
</template>