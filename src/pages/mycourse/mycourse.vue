<template>
  <!-- <xh-load-more> -->
  <view class="mycourse">
    <xh-loading></xh-loading>
    <!-- 首次登陆弹框 -->
    <xh-model-login></xh-model-login>
    <!-- code 码登陆 -->
    <xh-authorization @callback="initApi"></xh-authorization>
    <xh-run-out></xh-run-out>
    <xh-load-more @refresherrefresh="refresherrefresh">
      <view class="wapper">
        xxxxxxxxx
      </view>
    </xh-load-more>
  </view>
  <!-- </xh-load-more> -->
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {
    goSelectCouse() {
      // this.$store.commit('showNoCourse') 您的课时已用完
      uni.switchTab({
        url: '/pages/index/index'
      })
    },
    refresherrefresh(reload) {
      this.initApi(reload)
    }
  },
  onLoad() {
    // this.$store.commit('showNoCourse')
    // setTimeout(() => {
    //   this.$store.commit('hideNoCourse')
    // }, 1000)
  },
  onShareAppMessage() {},
  onShow() {}
}
</script>
<style lang="scss" scoped>
.mycourse {
  width: 100vw;
  height: 100vh;
  // background-color: #4ec3ff;
  background: url('https://naughty-kid-system.oss-cn-beijing.aliyuncs.com/image/public/wxApp/%E6%A4%AD%E5%9C%86%E5%BD%A2%20%2B%20%E6%A4%AD%E5%9C%86%E5%BD%A2%E5%A4%87%E4%BB%BD%2011%20%2B%20%E6%A4%AD%E5%9C%86%E5%BD%A2%E5%A4%87%E4%BB%BD%2012%20%2B%20%E6%A4%AD%E5%9C%86%E5%BD%A2%E5%A4%87%E4%BB%BD%2013%20%2B%20%E6%A4%AD%E5%9C%86%E5%BD%A2%E5%A4%87%E4%BB%BD%2013%20%E8%92%99%E7%89%88%20%2B%20%E7%BC%96%E7%BB%84%203%20%2B%20%E7%9F%A9%E5%BD%A2%20%E8%92%99%E7%89%88.png')
    no-repeat;
  background-size: cover;
}
.wapper {
  // position: fixed;
  // left: 0;
  // top: 0;
  width: 100vw;
  // height: 100vh;
  // overflow-y: scroll;
  // background-color: #4ec3ff;
  color: #fff;

  padding: r(20);
  padding-bottom: r(50);
  .wapper-tip {
    margin: 0 auto;
    width: r(335);
    height: r(70);
    background: url('https://naughty-kid-system.oss-cn-beijing.aliyuncs.com/image/public/wxApp/%E8%B4%AD%E8%AF%BE%E6%B6%88%E6%81%AF%E9%80%9A%E7%9F%A5.png')
      no-repeat;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: r(11) r(70);
    position: relative;
    margin-bottom: r(16);
    text {
      font-size: r(14);
      color: #fff;
    }
    .img {
      width: r(50);
      height: r(50);
      position: absolute;
      right: r(18);
      top: 0;
      bottom: 0;
      margin: auto 0;
    }
  }
  .wapper-mycurse {
    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left-title {
        font-size: r(20);
        font-weight: 500;
        // letter-spacing: 2px;
        color: #fff;
      }
      .coursor-img {
        width: r(26);
        height: r(26);
      }
    }
    .data {
      // width: r(143);
      display: inline-flex;
      height: r(38);
      background-color: #00a9ff;
      border: 1px solid #b3e5ff;
      text-align: center;
      font-size: r(14);
      color: #fff;
      line-height: r(38);
      margin-top: r(15);
      margin-bottom: r(15);
      border-radius: r(20);
      opacity: 0.8;
      padding: 0 r(15);
      font-weight: 800;
      .week {
        margin-left: r(5);
      }
    }
    .wrapper-card {
      border-radius: r(15);
      background-color: #fff;
      width: r(335);
      // height: r(277);
      padding: r(14) r(16);
      margin-bottom: r(15);

      box-shadow: 0px r(7) r(12) 0px rgba(4, 87, 130, 0.17),
        0px r(5) 0px 0px #c7e3fb;
      .wrapper-card-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #333;
        // margin-bottom: r(30);
        .wrapper-card-title-left {
          font-weight: 800;
          font-size: r(18);
        }
        .wrapper-card-title-age {
          padding: 0 r(10);
          height: r(27);
          line-height: r(27);
          text-align: center;
          border: 1px solid #4ec3ff;
          color: #4ec3ff;
          font-size: r(13);
          border-radius: r(15);
        }
      }
      .line {
        width: 100%;
        height: r(1);
        background-color: #dedede;
        margin: r(15) 0;
      }
      .wrapper-card-adventure {
        width: r(305);
        margin: 0 auto;
        height: r(153);
        border-radius: r(14);
        // border-bottom-left-radius: r(0);
        // border-bottom-right-radius: r(0);
        overflow: hidden;
        position: relative;
        .wrapper-card-adventureimg {
          width: 100%;
          // height: 100%;
          border-radius: r(14);
        }
        .wrapper-card-mask {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          .wrapper-card-lock {
            width: r(48);
            height: r(48);
          }
        }
      }
      .evaluate {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: r(11);
        .evaluate-left {
          color: #666666;
          font-size: r(14);
        }
        .evaluate-right {
          display: flex;
          align-items: center;
          justify-content: center;
          .evaluate-start {
            width: r(26);
            height: r(26);
            background: url('https://naughty-kid-system.oss-cn-beijing.aliyuncs.com/image/public/wxApp/gray.png')
              no-repeat;
            background-size: 100% 100%;
            .evaluate-active-start {
              width: r(26);
              height: r(26);
            }
          }
        }
      }
    }
    .mb2 {
      margin-top: r(30);
    }
    .wrapper-card {
      .card-experience-class {
        display: flex;
        // justify-content: space-between;
        .left-icon {
          width: r(90);
          height: r(120);
          border-radius: r(10);
          overflow: hidden;
          margin-right: r(15);
          .left-icon-img {
            width: 100%;
            height: 100%;
          }
        }
        .card-experience-right-text {
          display: flex;
          flex-direction: column;
          align-items: left;
          justify-content: center;
          .text {
            color: #333333;
            font-size: r(18);
            font-weight: 600;
          }
          .card-experience-bottom {
            display: flex;
            align-items: center;
            margin-top: r(11);
            .alarm-clock {
              width: r(24);
              height: r(24);
              margin-right: r(8);
            }
            .time-course {
              font-size: r(14);
              color: #666;
            }
          }
        }
      }
    }
  }
  .nocourse-box {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    left: 0;
    top: 0;
  }
  .nocourse {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    image {
      width: r(160);
      height: r(160);
      margin-bottom: r(18);
    }
    text {
      text-align: center;
      font-size: r(18);
      color: #fff;
      margin-bottom: r(60);
    }
    .nocourse-button {
      color: #4ec3ff;
      border-radius: r(27);
      width: r(240);
      height: r(54);
      // text-align: ce;
      line-height: r(54);
      font-size: r(18);
    }
  }
}
</style>
