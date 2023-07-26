<script setup lang="ts">
import {useStore} from "pinia-class-store";
import {MapsStore} from "../../../store/maps";
import {useMapsRouter} from "../_clientRouter";

const router = useMapsRouter()
const mapsStore = useStore(MapsStore)
const tmpSearch = ref(mapsStore.searchKey)
watchPostEffect(() => {
  tmpSearch.value = mapsStore.searchKey
})
async function onSearch(v:string){
  if (v.match(/^\d{5}$/))
    return router.push(`/${v}/latest`)
  await mapsStore.search(v)
}
</script>

<template>
  <el-input v-model="tmpSearch" placeholder="查找地图" clearable @change="onSearch"/>
</template>

<style scoped lang="stylus">

</style>