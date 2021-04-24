<template>
  <div class="outer1">
    <div class="outer2">
      <img :src="$props.src" alt="map preview">
    </div>
  </div>
</template>

<script>
export default {
  name: "SquaredImage",
  props: {
    src: String
  },
}
</script>

<style lang="stylus" scoped>
.outer1
  padding 2%

.outer2
  width 100%
  height 0
  padding-bottom 100%
  position relative

img
  object-fit contain
  width 100%
  height 100%
  position absolute
  image-rendering pixelated
</style>