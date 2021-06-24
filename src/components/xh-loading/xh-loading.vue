<template>
  <view class="wrapper fadeIn animated" v-if="loading">
    <image
      src="https://naughty-kid-system.oss-cn-beijing.aliyuncs.com/image/public/wxApp/gif/loading.gif"
      mode="widthFix"
    />
  </view>
</template>
<script>
export default {
  computed: {
    loading() {
      return this.$store.state.loading
    }
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.9);
  image {
    width: r(100);
    // width: 200rpx;
    height: auto;
  }
}
</style>
