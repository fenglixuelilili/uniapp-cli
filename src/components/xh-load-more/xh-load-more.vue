<template>
  <view class="scroll-Y" @touchend="touchend">
    <view class="refresh" :style="{ opacity: opacity, zIndex: zIndex }">
      <!-- 自定义 -->
      <!-- <view
        class="cricel rotate"
        :style="{ transform: `rotate(${rotate}deg)` }"
      ></view> -->
      <!-- 图片 -->
      <image
        src="./loading.png"
        :style="{ transform: `rotate(${rotate}deg)` }"
        mode="aspectFit"
      />
    </view>
    <scroll-view
      scroll-y="true"
      class="scroll-Y"
      :refresher-enabled="enabled && isenabled"
      :scroll-with-animation="true"
      refresher-default-style="none"
      :refresher-threshold="refresherThreshold"
      :refresher-triggered="triggered"
      :enable-back-to-top="true"
      @refresherrefresh="refresherrefresh"
      @scrolltolower="scrolltolower"
      @refresherrestore="refresherrestore"
      @refresherpulling="refresherpulling"
      @scroll="scroll"
    >
      <slot></slot>
      <view class="end" v-if="end">
        到底啦，没有更多数据喽~~
      </view>
      <view class="nodata" v-if="nodata">
        无任何数据哦
      </view>
    </scroll-view>
  </view>
</template>
<script>
export default {
  props: ['nodata', 'end', 'isenabled'],
  data() {
    return {
      triggered: false,
      enabled: true,
      opacity: 0,
      zIndex: 0,
      rotate: 0,
      currentTop: 0,
      // 距离多少触发下拉刷新
      refresherThreshold: 60,
      scrollTop: 0
    }
  },
  methods: {
    refresherrefresh() {
      this.triggered = true
      this.$emit('refresherrefresh', () => {
        this.triggered = false
        this.enabled = false
        setTimeout(() => {
          this.enabled = true
        }, 200)
      })
      // setTimeout(() => {
      //   this.triggered = false
      // }, 500)
    },
    scrolltolower() {
      if (this.end || this.nodata) {
        return
      }
      this.$emit('scrolltolower')
    },
    refresherrestore() {
      this.resetParams()
    },
    refresherpulling(e) {
      if (this.scrollTop > 0) {
        return
      }
      this.zIndex = 2
      this.opacity = e.detail.deltaY / 100
      this.rotate = (e.detail.deltaY / 100) * 360
      this.currentTop = e.detail.deltaY
    },
    touchend() {
      if (this.currentTop < this.refresherThreshold) {
        this.resetParams()
      }
    },
    resetParams(callback) {
      this.zIndex = 0
      this.opacity = 0
      this.rotate = 0
      callback && callback()
    },
    scroll(e) {
      // console.log()
      // this.resetParams()
      this.scrollTop = e.detail.scrollTop <= 10 ? 0 : e.detail.scrollTop
    }
  }
}
</script>
<style lang="scss" scoped>
.scroll-Y {
  height: 100%;
  position: relative;
  z-index: 1;
  background-color: #fff;
}
.end,
.nodata {
  text-align: center;
  color: #ccc;
  margin: r(30) auto;
  font-size: r(13);
}
.refresh {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  right: 0;
  top: r(10);
  margin: 0 auto;
  z-index: 0;
  image {
    width: r(40);
    height: r(40);
  }
  .cricel {
    border: 2px solid #ecce85;
    width: r(40);
    height: r(40);
    border-radius: 50%;
    position: relative;
  }
  .cricel:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 70%;
    height: 70%;
    background-color: #ecce85;
  }
}
</style>
