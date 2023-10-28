<script setup lang="ts">
const props = defineProps<{
    onClose: () => void,
    maxWidth?: number | string,
    title?: string,
    contentClass?: string,
}>()
</script>

<template>
    <dialog class="modal modal-open" @click.self="props.onClose">
        <PageHeader class="modal-box w-full" :title="props.title" :class="props.contentClass"
            :style="{ maxWidth: props.maxWidth ?? '600' }">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click="props.onClose">
                <el-icon-close class="w-4 absolute right-2 top-2" />
            </button>
            <slot />
        </PageHeader>
    </dialog>
</template>

<style lang="stylus" scoped>
</style>