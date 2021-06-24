<template>
  <view class="xh-button" @click="$emit('click')">
    <view class="content" :class="{ active: active }">
      <slot>
        <text class="title">登录</text>
      </slot>
    </view>
    <button
      class="btn"
      :open-type="openType"
      @getuserinfo="getuserInfo"
      @error="errorfn"
    >
      name
    </button>
  </view>
</template>
<script>
export default {
  // props: ['openType','active'],
  props: {
    openType: {},
    active: {
      type: Boolean,
      default: false
    }
  },
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
    background: url('~@/static/button.png') no-repeat;
    background-size: cover;
    width: 85%;
    height: r(60);
    margin: 0 auto;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    .title {
      font-size: r(18);
      font-weight: 600;
      color: #fff;
    }
  }
  .active {
    background: url('https://naughty-kid-system.oss-cn-beijing.aliyuncs.com/image/public/wxApp/login/activeLogin.png')
      no-repeat;
    background-size: cover;
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
