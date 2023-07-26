<script setup lang="ts">
import {useStore} from "pinia-class-store";
import {ServerStore} from "@/store/server";

const store = useStore(ServerStore)
</script>

<template>
  <el-switch active-text="自动刷新" inactive-text="手动刷新" v-model="store.autoRefresh"/>
</template>