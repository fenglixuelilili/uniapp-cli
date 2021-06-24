<template>
  <view
    class="wrapper fadeIn animated"
    v-if="visableAuthorization"
    @click="$store.state.visableAuthorization = false"
  >
    <view class="bottom animated fadeInUpBig" @click.stop="stop">
      <button
        type="primary"
        open-type="getUserInfo"
        @getuserinfo.stop="getUserinfo"
      >
        微信登陆
      </button>
    </view>
  </view>
</template>
<script>
import { isLoginarr } from '@/api/httpRequestConfig'
export default {
  computed: {
    visableAuthorization() {
      if (!this.$store.state.login.token) {
        let routes = getCurrentPages() // 获取当前打开过的页面路由数组
        let curRoute = routes[routes.length - 1].route // 获取当前页面路由，也就是最后一个打开的页面路由
        if (isLoginarr.includes(curRoute)) {
          // 显示登陆框
          this.$store.commit('showLoginMask')
          return false
        } else {
          uni.redirectTo({
            url: '/pages/login/login'
          })
        }
        return false
      }
      return this.$store.state.visableAuthorization
    }
  },
  methods: {
    login() {
      wx.login({
        success(e) {
          console.log(e)
        }
      })
    },
    stop() {},
    getUserinfo(e) {
      if (e.detail.userInfo) {
        // 用户点击了授权
        // 将用户信息存储到本地
        this.$store.commit('setUserInfo', e.detail.userInfo)
      } else {
        // 用户没有点击授权
      }
      // 登陆验证
      // 进行二次登陆 使用code 码 获取token 以及 token日期
      this.$store
        .dispatch('codeLogin')
        .then(data => {
          console.log('使用code码登陆成功')
          this.$emit('callback')
          this.$store.state.visableAuthorization = false
        })
        .catch(err => {
          console.log(err)
          this.$xh.Toast('登陆失败，请重试！')
          // this.$store.state.visableAuthorization = false
        })
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
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10001;
  display: flex;
  // align-items: ce;
  align-items: flex-end;
  .bottom {
    width: 100vw;
    height: r(110);
    background-color: #fff;
    box-sizing: border-box;
    // padding: ;
    display: flex;
    align-items: center;
    justify-content: center;
    button {
      width: 60%;
    }
  }
}
</style>
