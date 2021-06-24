<template>
  <view class="wrapper" v-if="isshowLogin">
    <view class="model fadeIn animated">
      <view class="title">
        您还未登录
      </view>
      <view class="desc">
        请您先登陆在进行操作
      </view>
      <view class="image">
        <image
          src="https://naughty-kid-system.oss-cn-beijing.aliyuncs.com/image/public/wxApp/nocourse.png"
          mode="widthFix"
        />
        <!-- 图片 -->
      </view>
      <view class="login">
        <view class="button" @click="noLogin">暂不登陆</view>
        <view class="button" @click="Login">登陆</view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {
    noLogin() {
      this.$store.commit('hideLoginMask')
    },
    Login() {
      this.$store.commit('hideLoginMask')
      uni.navigateTo({
        url: '/pages/login/login'
      })
    }
  },
  computed: {
    isshowLogin() {
      console.log(this.$store.state.loginMask, 'this.$store.state.loginMask')
      return this.$store.state.loginMask
    }
  }
}
</script>
<style lang="scss">
.wrapper {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  .model {
    width: r(250);
    // height: r(300);
    border-radius: r(20);
    background-color: #fff;
    padding: r(30) r(10);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .title {
      font-size: r(18);
      font-weight: 800;
      margin-bottom: r(10);
    }
    .desc {
      color: #ccc;
      font-size: r(12);
      margin-bottom: r(15);
    }
    .image {
      margin-bottom: r(20);
      image {
        width: r(100);
      }
    }
    .login {
      display: flex;
      align-items: center;
      justify-content: center;
      .button {
        width: r(100);
        height: r(40);
        text-align: center;
        line-height: r(40);
        text-align: center;
        border: 1px solid #4ec3ff;
        color: #4ec3ff;
        // margin-right: r(15);
        border-radius: r(10);
        margin: 0 r(10);
      }
      .button:last-child {
        background-color: #4ec3ff;
        color: #fff;
      }
    }
  }
}
</style>
