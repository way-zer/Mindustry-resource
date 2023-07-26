<script setup lang="ts">
import ClientOnly from "@components/ClientOnly";
import { useStore } from "pinia-class-store";
import {ServerStore} from "@/store/server";

const store = useStore(ServerStore)
const showModal = ref(false)
const address = ref('')
const adding = ref(false)

async function check() {
  if (adding.value) return
  adding.value = true
  try {
    await store.add(address.value)
    //success
    address.value = ''
    showModal.value = false
  } catch (e) {
  } finally {
    adding.value = false
  }
}
</script>

<template>
  <el-button size="small" round type="primary" @click="showModal = true">
    <el-icon-plus />
    添加服务器
  </el-button>
  <client-only>
    <el-dialog title="请输入服务器地址" v-model="showModal">
      <el-input type="text" v-model="address" @submit="check"/>
      <el-row type="flex" justify="end">
        <el-button type="primary" :loading="adding" @click="check">提交</el-button>
      </el-row>
    </el-dialog>
  </client-only>
</template>