<template>
  <el-button v-if="!circle" size="medium" type="primary" @click="click">
    上传地图<i class="el-icon-upload el-icon--right"/>
  </el-button>
  <a-tooltip v-else title="更新地图" destroy-tooltip-on-hide>
    <icon-button icon="el-icon-upload" circle @click="click"/>
  </a-tooltip>
</template>

<script lang="ts">
import IconButton from "@/components/IconButton.vue";

export default {
  name: "ActionUpload",
  components: {IconButton},
  props: {
    thread: {//如果用于更新地图，不为空
      type: Number,
      require: false
    },
    circle: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    click() {
      const thread = this.thread
      this.$router.push("/map/upload" + (thread ? `?update=${thread}` : ''))
    }
  }
}
</script>