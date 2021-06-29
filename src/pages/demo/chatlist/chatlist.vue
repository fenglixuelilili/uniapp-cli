<template>
  <view class="index">
    <xh-loading></xh-loading>
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
      <view
        style="text-align:center;line-height:50px;font-size:14px;color:#ccc;"
        v-if="!list.length"
      >
        <text>无消息...</text>
      </view>
    </view>
  </view>
</template>
<script>
import storeName from '@utlis/storeSpaceName'
const { LISTINDEXMESSAGE } = storeName
export default {
  name: 'chatlist',
  data() {
    return {
      list: [],
      nodata: false,
      end: false
    }
  },
  onLoad() {
    // console.log(testGloble)
    // 连接websocket
    if (this.$xh.getStorage(LISTINDEXMESSAGE)) {
      this.list = this.$xh.getStorage(LISTINDEXMESSAGE)
    }
    this.$xh.showLoading()
    uni.connectSocket({
      url: 'ws://127.0.0.1:8181',
      fail(err) {
        console.log(err)
        this.$xh.hideLoading()
      }
    })
    uni.onSocketOpen(
      function(res) {
        // console.log('WebSocket连接已打开！', res)
        this.$xh.hideLoading()
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
    uni.onSocketError(
      function(res) {
        this.$xh.hideLoading()
        this.$xh.Toast('WebSocket连接打开失败，请检查node服务端！')
      }.bind(this)
    )
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
            this.$xh.Toast('来消息了')
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
      uni.showModal({
        title: '提示',
        content: '模拟进入聊天详情，并消除当前的消息红点',
        success: res => {
          if (res.confirm) {
            // console.log('用户点击确定')
            this.list = this.list.map(item => {
              if (messageinfo.id === item.id) {
                messageinfo.read = true
              }
              return item
            })
            this.$xh.setStorage(LISTINDEXMESSAGE, this.list)
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
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
