<template>
  <scroll-view
    scroll-y="true"
    class="scroll-Y"
    :refresher-enabled="true"
    :scroll-with-animation="true"
    refresher-default-style="none"
    :refresher-threshold="60"
    :refresher-triggered="triggered"
    @refresherrefresh="refresherrefresh"
    @scrolltolower="scrolltolower"
  >
    <slot></slot>
    <view class="end" v-if="end">
      到底啦，没有更多数据喽~~
    </view>
    <view class="nodata" v-if="nodata">
      无任何数据哦
    </view>
  </scroll-view>
</template>
<script>
export default {
  props: ['nodata', 'end'],
  data() {
    return {
      triggered: false
    }
  },
  methods: {
    refresherrefresh() {
      this.triggered = true
      this.$emit('refresherrefresh', () => {
        this.triggered = false
      })
      // setTimeout(() => {
      //   this.triggered = false
      // }, 500)
    },
    scrolltolower() {
      if (this.end) {
        return
      }
      this.$emit('scrolltolower')
    }
  }
}
</script>
<style lang="scss" scoped>
.scroll-Y {
  height: 100%;
}
.end,
.nodata {
  text-align: center;
  color: #ccc;
  margin: r(30) auto;
  font-size: r(13);
}
.nodata {
}
</style>
