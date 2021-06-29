# uniapp-上拉加载下拉刷新组件
------
# 简介
本插件基于uniapp的原生组件scroll-view封装的，可自定下拉图片文字等信息的 “下拉刷新 上拉加载 组件”，如果需要高性能的下拉刷新请使用原生下拉刷新
 
## 引入组件即可使用（如果不自定义熟悉组件，请先熟读文档）

### 使用
<pre>
    <code>
      <template>
        <view class="index">
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
              if (this.list.length > 80) {
                this.end = true
                return
              }
              this.list = [...this.list, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
            }
          }
        }
      </script>
    </code>
</pre>

## 核心属性
1. nodata: Boolen
<pre>
    <code>
      表示是否有数据
    </code>
</pre>

2. end: Boolen &emsp;

<pre>
  <code>
    表示数据接口是否已经到最后一页或者完成
  </code>
</pre>

## 核心回调函数
1. refresherrefresh: Function 
```
  当下拉刷新触发的回调，参数为一个回调函数，调用回调函数表示停止下拉动画，注意，此回调函数在接口请求回来必须调用
  如果需要配置上拉加载的触发距离，请到组件内修改相关参数即可
```
<pre>
  <code>
    <!-- 例如 -->
    refresherrefresh(stop) {
      uni.showLoading({
        title: '下拉加载中'
      })
      setTimeout(() => {
        stop()
        uni.hideLoading()
      }, 500)
    }
  </code>
</pre>

2. scrolltolower: Function
```
  当列表滚动触底时候触发的事件
```
<pre>
  <code>
    <!-- 例如 -->
   scrolltolower() {
      // console.log('上拉架子啊')
      // console.log(this.list.length > 40)
      if (this.list.length > 80) {
        this.end = true
        return
      }
      this.list = [...this.list, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    }
  </code>
</pre>

## 下拉加载图形图片的修改
```
  进入到组件内部，修改image路径即可
```
  
    <!-- 在这块修改即可 -->
    <view class="refresh" :style="{ opacity: opacity, zIndex: zIndex }">
      <!-- 自定义的图形 -->
      <view
        class="cricel rotate"
        :style="{ transform: `rotate(${rotate}deg)` }"
      ></view>
      <!-- 图片图形 -->
      <!-- <image
        src="xxx"
        :style="{ transform: `rotate(${rotate}deg)` }"
        mode="aspectFit"
      /> -->
    </view>
  

## 注意事项
```
  该组件的外侧需要加上固定高度
```
### 嘿嘿，在最后插播一下，我最近开源了一个快速搭建uni-app模板架子，如果有需要的同学可以看下啦！ 如果有用记得start，略略略！！！ [附git地址](https://github.com/fenglixuelilili/uniapp-cli)
