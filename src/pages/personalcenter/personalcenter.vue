<template>
  <view class="wapper">
    <xh-loading></xh-loading>
    <!-- 首次登陆弹框 -->
    <xh-model-login></xh-model-login>
    <!-- code 码登陆 -->
    <xh-authorization></xh-authorization>
    <xh-load-more @refresherrefresh="upper" @scrolltolower="lower" :end="end">
      <view class="wapper-box">xxxxxxxxx </view>
    </xh-load-more>
  </view>
</template>
<script>
import { getPersonInfo, getStatis } from '@/api'
export default {
  data() {
    return {
      end: false,
      menus: [],
      info: {},
      static: {}
    }
  },
  onLoad() {
    this.init()
  },
  onShareAppMessage() {},
  methods: {
    init() {
      return this.getData()
    },
    upper(reset) {
      // console.log('重新加载')
      this.init()
        .then(data => {
          reset()
        })
        .catch(e => {
          this.$xh.Toast('哎呀 出错啦~~')
          reset()
        })
    },
    lower() {
      setTimeout(() => {
        console.log('加载更多')
        // this.end = true
      }, 500)
    },
    goDetail(item) {
      if (!this.$store.state.login.token) {
        this.$store.commit('showLoginMask')
        return
      }
      uni.navigateTo({
        url: item.router
      })
    },
    getData() {
      this.getStaticDay()
      return getPersonInfo().then(data => {
        this.info = data
      })
    },
    getStaticDay() {
      getStatis().then(data => {
        // console.log(data, 'data')
        this.static = data
      })
    },
    gobabyinfo() {
      uni.navigateTo({
        url: '/pages/babyinfo/babyinfo?type=info'
      })
    },
    goVip() {
      uni.switchTab({
        url: '/pages/index/index'
      })
    },
    getAge(year) {
      if (!year) return 1
      let time = new Date(year)
      let currenttime = new Date()
      let age = currenttime.getFullYear() - time.getFullYear() + 1
      return age
    }
  }
}
</script>
<style lang="scss" scoped>
.wapper {
  width: 100vw;
  height: 100vh;

  background-color: #f7f8fa;
  .wapper-box {
    width: 100%;
    height: 100%;
    background: url('https://naughty-kid-system.oss-cn-beijing.aliyuncs.com/image/public/wxApp/banbgm.png')
      no-repeat top center;
    background-size: 100%;
  }
  .wapper-content {
    padding: 0 r(20);
    padding-top: r(10);
    padding-bottom: r(10);
    .info {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      .avag {
        width: r(82);
        height: r(82);
        // border: r(4) solid #ffc802;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        image {
          width: 100%;
          height: 100%;
        }
      }
      .name {
        margin-left: r(16);
        .name-top-info {
          display: flex;
          align-items: center;
          .top-name {
            font-size: r(20);
            color: #fff;
            font-weight: 600;
            margin-bottom: r(6);
            margin-right: r(10);
          }
          image {
            width: r(30);
            height: r(30);
          }
        }
        .age {
          color: #fff;
          font-size: r(15);
        }
      }
    }
    .day-data {
      margin: 0 auto;
      background-color: #fff;
      border-radius: r(15);
      padding: 0 r(18);
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: r(97);
      margin-top: r(20);
      .day-left {
        display: flex;
        align-items: center;
        image {
          width: r(34);
          height: auto;
          margin-right: r(8);
        }
        .data-info {
          view:first-child {
            font-size: r(20);
            color: #333;
            font-weight: 600;
          }
          view:last-child {
            font-size: r(14);
            color: #999;
            margin-top: r(5);
            // font-weight: 600;
          }
        }
      }
      .line-border {
        width: r(1);
        height: r(60);
        background-color: #f0f0f0;
      }
    }
    .vip {
      width: r(335);
      height: r(60);
      background: url('https://naughty-kid-system.oss-cn-beijing.aliyuncs.com/image/public/wxApp/vip.png')
        no-repeat;
      background-size: contain;
      border-radius: r(4);
      padding-left: r(62);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: r(15);
      box-shadow: 0px 4px 14px 0px rgba(34, 41, 44, 0.05);
      text {
        margin-right: r(11);
        color: #703008;
        font-size: r(14);
        font-weight: 800;
      }
      .vip-button {
        width: r(88);
        height: r(30);
        text-align: center;
        line-height: r(30);
        border-radius: r(15);
        background-color: #fff6c5;
        color: #703008;
        font-size: r(14);
        font-weight: 800;
      }
    }
    .orders-info {
      margin: 0 auto;
      background-color: #fff;
      padding: 0 r(16);
      border-radius: r(10);
      margin-top: r(15);
      box-shadow: 0px 4px 14px 0px rgba(34, 41, 44, 0.05);
      //   border-radius: r(5);
      .order {
        height: r(63);
        display: flex;
        align-items: center;
        justify-content: space-between;
        // margin-bottom: r(40);
        border-bottom: r(1) solid #ededed;
        .order-left {
          display: flex;
          align-items: center;
          justify-content: center;
          image {
            width: r(30);
            height: auto;
            margin-right: r(15);
          }
          view {
            font-size: r(16);
            color: #333;
            font-weight: 800;
          }
        }
        .order-right {
          display: flex;
          align-items: center;
          justify-content: center;
          text {
            font-size: r(13);
            color: #999;
            margin-right: r(8);
          }
          image {
            width: r(14);
            height: auto;
          }
        }
      }
      .order:last-child {
        margin-bottom: 0;
        border: 0 none;
      }
    }
  }
}
</style>
