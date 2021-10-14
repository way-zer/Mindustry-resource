<template>
  <a-tooltip title="地图详情" destroy-tooltip-on-hide>
    <router-link :to="`/map/${$props.thread}/${$props.hash}`"/>
    <icon-button icon="el-icon-more-outline" :circle="$props.circle" @click="click"/>
  </a-tooltip>
</template>

<script lang="ts">
import IconButton from '@/components/IconButton.vue'
import {defineComponent} from 'vue'
import {useRouter} from 'vue-router'

export default defineComponent({
  name: 'ActionDetail',
  components: {IconButton},
  props: {
    thread: Number,
    hash: {
      type: String,
      default: 'latest',
    },
    circle: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const router = useRouter()
    return {
      click: async () => {
        await router.push({path: `/map/${props.thread}/${props.hash}`})
      },
    }
  },
})
</script>