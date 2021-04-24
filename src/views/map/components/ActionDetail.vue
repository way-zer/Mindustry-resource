<template>
  <a-tooltip title="地图详情" destroy-tooltip-on-hide>
    <icon-button icon="el-icon-more-outline" :circle="$props.circle" @click="click"/>
  </a-tooltip>
</template>

<script lang="ts">
import IconButton from "@/components/IconButton.vue";
import {useRouter} from "vue-router";
import {defineComponent} from "vue";

export default defineComponent({
  name: "ActionDetail",
  components: {IconButton},
  props: {
    thread: Number,
    hash: {
      type: String,
      default: "latest"
    },
    circle: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const router = useRouter()
    return {
      click: async () => {
        await router.push({path: `/map/${props.thread}/${props.hash}`})
      }
    }
  }
})
</script>