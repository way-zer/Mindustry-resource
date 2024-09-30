<template>
  <el-collapse accordion v-model="v">
    <el-collapse-item v-for="item in list" :name="item.tag_name" :key="item.tag_name">
      <template #title>
        <a :href="item.html_url" target="_blank" rel="nofollow">{{ item.tag_name }}</a>
      </template>
      <el-col style="width: 100%">
        <el-row v-for="asset in item.assets" :key="asset.name" type="flex" justify="space-between">
          <el-space>
            <strong>{{ asset.name }}</strong>
            <small>{{ (asset.size / 1024 / 1024).toFixed(2) }} MB</small>
          </el-space>
          <a :href="getDownloadUrl(asset.browser_download_url)" rel="nofollow">下载</a>
        </el-row>
      </el-col>
    </el-collapse-item>
  </el-collapse>
  <el-empty v-if="list.length === 0"/>
</template>

<script lang="ts" setup>
const v = ref('1')//default open first one
const props = defineProps<{
  list: ReleaseType[]
  getDownloadUrl: (url: string) => string
}>()
</script>

<style scoped></style>