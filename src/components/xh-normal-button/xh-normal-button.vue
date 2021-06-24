<template>
  <view class="xh-button" @click="$emit('click')">
    <view class="content">
      <slot>
        <text class="title">登录</text>
      </slot>
    </view>
  </view>
</template>
<script>
export default {
  props: ['openType'],
  methods: {
    getuserInfo(e) {
      this.$emit('getuserinfo', e)
    },
    errorfn(e) {
      this.$emit('error', e)
    }
  }
}
</script>

<style lang="scss" scoped>
.xh-button {
  position: relative;
  .content {
    background: url('~@/static/bntsbgm.png') no-repeat;
    background-size: contain;
    width: r(214);
    height: r(58);
    line-height: r(58);
    margin: 0 auto;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: r(18);
    .title {
      font-size: r(18);
      font-weight: 600;
      color: #fff;
    }
  }
  .btn {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
}
</style>
