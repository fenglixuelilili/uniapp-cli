<template>
  <view class="index">
    <!-- <xh-loading></xh-loading> -->
    <!-- 首次登陆弹框 -->
    <!-- <xh-model-login></xh-model-login> -->
    <!-- code 码登陆 -->
    <!-- <xh-authorization @callback="initApi"></xh-authorization> -->
    <!-- <xh-load-more
      @refresherrefresh="refresherrefresh"
      @scrolltolower="scrolltolower"
      :isenabled="true"
      :nodata="nodata"
      :end="end"
    >
      <view class="wraper" v-for="(item, index) in list" :key="index">
        你好，钉钉小程序{{ item }}
      </view>
    </xh-load-more> -->
    <!-- <text class="iconfont icon-shangchuan1"></text> -->
    <!-- 聊天列表 -->
    <view class="lists">
      <view
        class="list"
        v-for="(item, index) in list"
        :key="index"
        @click="readMessage(item)"
      >
        <view class="header_image">
          <image class="header" :src="item.imge" mode="" />
          <view class="notice" v-if="!item.read"></view>
        </view>
        <view class="message">
          <view class="name">
            <view class="name_text">{{ item.name }}</view>
            <view class="name_time">16:40</view>
          </view>
          <view class="message_child">
            <view class="message_list">{{ item.message }}</view>
            <view class="message_other">x</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import storeName from '../../utlis/storeSpaceName'
const { LISTINDEXMESSAGE } = storeName
export default {
  data() {
    return {
      list: [],
      nodata: false,
      end: false
    }
  },
  onLoad() {
    // uni.chooseChatForNormalMsg({
    //   isConfirm: true, //是否弹出确认窗口，默认为true
    //   success: res => {
    //     // 该cid和服务端开发文档-普通会话消息接口配合使用，而且只能使用一次，之后将失效
    //   },
    //   fail: err => {
    //     dd.alert({
    //       content: JSON.stringify(err)
    //     })
    //   }
    // })
    // this.$xh.showLoading()
    // setTimeout(() => {
    //   this.$xh.hideLoading()
    // }, 50)
    // 连接websocket
    if (this.$xh.getStorage(LISTINDEXMESSAGE)) {
      this.list = this.$xh.getStorage(LISTINDEXMESSAGE)
    }
    uni.connectSocket({
      url: 'ws://127.0.0.1:8181',
      fail(err) {
        console.log(err)
      }
    })
    uni.onSocketOpen(
      function(res) {
        console.log('WebSocket连接已打开！', res)
        // 发送消息
        uni.sendSocketMessage({
          data: JSON.stringify({
            name: '家具哦'
          })
        })
        // 接受消息
        uni.onSocketMessage(
          function(res) {
            this.handleMessage(res)
          }.bind(this)
        )
      }.bind(this)
    )
    uni.onSocketError(function(res) {
      console.log('WebSocket连接打开失败，请检查！')
    })
  },
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
    },
    handleMessage(res) {
      let list = JSON.parse(res.data)
      try {
        list.forEach(item => {
          if (!item) {
            return
          }
          let flag = false
          this.list.forEach(_item => {
            if (item.id === _item.id) {
              flag = true
            }
          })
          if (!flag) {
            // 来消息了
            uni.showToast({
              title: '来消息了',
              duration: 2000
            })
            item.read = false
            this.list.unshift(item)
            this.$xh.setStorage(LISTINDEXMESSAGE, this.list)
          }
        })
      } catch (err) {
        console.log('返回错误', err)
      }
    },
    readMessage(messageinfo) {
      // console.log(messageinfo)
      this.list = this.list.map(item => {
        if (messageinfo.id === item.id) {
          messageinfo.read = true
        }
        return item
      })
      this.$xh.setStorage(LISTINDEXMESSAGE, this.list)
    }
  },
  computed: {}
}
</script>
<style scoped lang="scss">
.lists {
  .list {
    height: r(50);
    border-bottom: 1px solid #ccc;
    padding: r(5) r(8);
    display: flex;
    align-items: center;
    font-size: r(12);
    .header_image {
      position: relative;
      width: r(30);
      height: r(30);
      margin-right: r(10);
      .header {
        width: r(30);
        height: r(30);
        border-radius: 5px;
      }
      .notice {
        position: absolute;
        right: -4px;
        top: -4px;
        background-color: red;
        width: 10px;
        height: 10px;
        border-radius: 50%;
      }
    }
    .message {
      flex: 1;
      .name {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .name_text {
          font-size: r(14);
          // font-weight: 800;
          color: #000;
        }
        .name_time {
          font-size: r(10);
          color: #ccc;
        }
      }
      .message_child {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .message_list {
          width: 70%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
