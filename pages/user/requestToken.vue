<script lang="ts" setup>
import { UserApi } from '~/backendApi/user';

const user = useUserStore()
const code = useRoute().query.code as string
const { data } = useAsyncData(() => UserApi.tokenInfo(code), { immediate: Boolean(code) })
const clientName = computed(() => {
    switch (data.value?.type) {
        case 'CLIENT': return 'Mindustry客户端'
        case 'WEB': return '网页/' + data.value.name
        case 'SERVER': return '服务端/' + data.value.name
        default: return data.value?.type
    }
})

const success = ref(false)
async function submit(op: 'confirm' | 'reject') {
    if (!user.logged) return user.showDialog = true
    await UserApi.tokenConfirm(code, op)
    success.value = true
}

</script>
<template>
    <el-result v-if="success" icon="success" title="操作成功" sub-title="你可以关闭当前页面，返回应用继续操作" />
    <div v-else-if="data" class="w-full max-w-400px m-auto p-4 text-center">
        <h2 class="text-center w-full">API登录授权</h2>
        <el-descriptions :column="1" border>
            <el-descriptions-item label="请求ID">{{ code }}</el-descriptions-item>
            <el-descriptions-item label="请求设备">{{ clientName }}</el-descriptions-item>
            <el-descriptions-item label="请求IP">{{ data.ip }}</el-descriptions-item>
        </el-descriptions>
        <el-row class="relative mt-4 p-4 justify-evenly">
            <el-button type="warning" @click="() => submit('confirm')">同意</el-button>
            <el-button type="info" @click="() => submit('reject')">拒绝</el-button>
            <div v-if="!user.logged" class="mask flex items-center justify-center rounded">
                <el-button type="primary" @click="user.showDialog = true">请先登录</el-button>
            </div>
        </el-row>
    </div>
    <el-result v-else icon="error" title="找不到授权请求,或请求已过期" />
</template>
<style lang="stylus" scoped>
.mask
    position absolute
    width 100%
    height 100%
    left 0
    top 0
    background-color rgba(0,0,0,0.8)
</style>
