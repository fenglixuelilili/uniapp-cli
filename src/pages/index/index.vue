<template>
  <view class="index">
    <xh-loading></xh-loading>
    <!-- code 码登陆 -->
    <!-- <xh-authorization @callback="initApi"></xh-authorization> -->
    <xh-load-more
      @refresherrefresh="refresherrefresh"
      @scrolltolower="scrolltolower"
      :isenabled="true"
      :nodata="nodata"
      :end="end"
    >
      <view class="wraper" v-for="(item, index) in list" :key="index">
        你好，钉钉小程序{{ item }}
      </view>
    </xh-load-more>
  </view>
</template>

<script>
export default {
  data() {
    return {
      list: [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      nodata: false,
      end: false
    }
  },
  onLoad() {
    uni.chooseChatForNormalMsg({
      isConfirm: true, //是否弹出确认窗口，默认为true
      success: res => {
        // 该cid和服务端开发文档-普通会话消息接口配合使用，而且只能使用一次，之后将失效
      },
      fail: err => {
        dd.alert({
          content: JSON.stringify(err)
        })
      }
    })
    this.$xh.showLoading()
    setTimeout(() => {
      this.$xh.hideLoading()
    }, 50)
  },

  onShareAppMessage() {},
  methods: {
    refresherrefresh(stop) {
      uni.showLoading({
        title: '下拉加载中'
      })
      setTimeout(() => {
        stop()
        uni.hideLoading()
      }, 500)
    },
    scrolltolower() {
      // console.log('上拉架子啊')
      // console.log(this.list.length > 40)
      if (this.list.length > 80) {
        this.end = true
        return
      }
      this.list = [...this.list, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    }
  },
  computed: {}
}
</script>
<style scoped lang="scss">
.index {
  width: 100vw;
  height: 100vh;
}
.bottomLine {
  text-align: center;
  font-size: r(13);
  color: #ccc;
  // line-height: r(20);
  margin-top: r(20);
}
.wraper {
  padding: r(16);
  width: 100vw;
  // height: 100vh;
  // overflow-y: scroll;
  .wraper_rotation {
    position: relative;
    width: r(343);
    height: r(147);
    border-radius: 30px;
    .swiper {
      height: r(147);
    }
    .swiper-item {
      width: r(343);
      height: r(147);
      background-color: #ffca7d;
      border-radius: 16px;
      overflow: hidden;
      .swiper-img {
        width: 100%;
        height: 100%;
      }
    }
    .swiper_dot {
      position: absolute;
      left: 0;
      right: 0;
      margin: 0 auto;
      bottom: r(10);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: r(30);
      // background-color: red;
    }
  }
  .wraper_question {
    margin-top: r(20);
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: r(58);
    .wraper_question_commen {
      flex: 1;
      height: r(58);
      line-height: r(58);
      padding: 0 r(25);
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-radius: 15px;
      background: url('https://naughty-kid-system.oss-cn-beijing.aliyuncs.com/image/public/how.png')
        no-repeat;
      background-size: 100% 100%;
      width: r(166);
      text {
        color: #3cbffd;
        font-size: r(16);
        font-weight: 800;
      }
      image {
        width: r(36);
        height: r(36);
      }
    }
    .wraper_question_commen:last-child {
      margin-left: r(13);
      background: url('https://naughty-kid-system.oss-cn-beijing.aliyuncs.com/image/public/wen.png')
        no-repeat;
      background-size: 100% 100%;
      text {
        color: #ff6431;
      }
    }
  }
  .wraper_curriculum {
    margin-bottom: r(15);
    .title {
      font-size: r(22);
      font-weight: 800;
      margin-bottom: r(16);
      .min-text {
        font-size: r(18);
      }
    }
    .gallery {
      width: r(343);
      height: r(273);
      border-radius: 16px;
      background-color: #fff;
      overflow: hidden;
      // box-shadow: 0 0px 10px 1px rgba(0, 0, 0, 0.12);
      box-shadow: 0px 4px 20px 0px rgba(234, 234, 234, 0.5);
      border: 1px solid #eef2f6;

      .ad_img {
        width: 100%;
        height: r(193);
        background-color: #fff;
        position: relative;
        overflow: hidden;
        image {
          width: 100%;
          height: r(193);
          display: block;
          margin: 0 auto;
        }
        .qi_title {
          position: absolute;
          left: 0;
          top: 0;
          background: url('https://naughty-kid-system.oss-cn-beijing.aliyuncs.com/image/public/table%EF%BC%8F%E6%9C%9F%E6%95%B0.png')
            no-repeat;
          background-size: 100% 100%;
          width: r(70);
          height: r(24);
          text-align: center;
          line-height: r(24);
          color: #ffffff;
          font-size: r(12);
          top: r(19);
        }
      }
      .content {
        margin-top: r(16);
        padding: 0 r(13);
        .content_title {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          .content_title_left {
            font-size: r(18);
            color: #333;
            font-weight: 800;
          }
          .content_title_right {
            display: flex;
            align-items: flex-end;
            justify-content: flex-end;
            .content_old_price {
              color: #999999;
              font-size: r(12);
              text-decoration: line-through;
              margin-right: r(4);
            }
            .content_current_price {
              color: #ff605a;
              font-size: r(12);
              // font-weight: 800;
              text {
                font-size: r(18);
                font-weight: 800;
              }
              .content_current_mounth {
                font-size: r(12);
                margin-left: r(3);
              }
            }
          }
        }
        .content_presale {
          display: flex;
          font-size: r(11);
          color: #999999;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-top: r(7);
          .tip {
            background: rgba(255, 96, 90, 0.11);
            border-radius: 10px;
            color: #ff605a;
            padding: 0 r(8);
            height: r(18);
            line-height: r(18);
            display: inline-block;
            margin-left: r(4);
          }
          .dot {
            margin: 0 r(3);
          }
        }
      }
    }
  }
  .wraper_curriculum:first-child {
    margin-top: r(29);
  }
  .star_person {
    margin-top: r(29);
    .title {
      font-size: r(22);
      font-weight: 800;
      margin-bottom: r(16);
    }
    .star-person-all {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .start_person_show {
        width: r(166);
        padding: r(8);
        margin-bottom: r(16);
        box-shadow: 0 3px 20px -8px rgba(0, 0, 0, 0.12);
        image {
          width: r(150);
          height: r(113);
          border-radius: 20px;
        }
        .star_person_title {
          font-size: r(16);
          color: #333;
          margin-top: r(8);
          margin-bottom: r(4);
          font-weight: 800;
        }
        .start_person_content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .hearts {
            display: flex;
            align-items: center;
            justify-content: center;
            .heart {
              width: r(14);
              height: r(14);
              background: url('https://naughty-kid-system.oss-cn-beijing.aliyuncs.com/image/public/icon%EF%BC%8F%E9%A6%96%E9%A1%B5%EF%BC%8F%E7%82%B9%E8%B5%9E%EF%BC%8F%E9%BB%98%E8%AE%A4%E7%8A%B6%E6%80%81.png')
                no-repeat;
              background-size: 100% 100%;
              margin-right: r(5);
              display: flex;
              align-items: center;
              justify-content: center;
              image {
                width: 100%;
                height: 100%;
              }
            }
            text {
              font-size: r(11);
              color: #999;
            }
          }
          .dot {
            margin: 0 r(6);
          }
          .info {
            font-size: r(11);
            color: #999;
          }
        }
      }
    }
  }
}
</style>
