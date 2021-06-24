<template>
  <view class="calendar-box">
    <view class="month">
      <view @click="lastMonth">上月</view>
      <view>{{ year }}年{{ month }}月</view>
      <view @click="nextMonth">下月</view>
    </view>
    <view class="week">
      <view
        :key="index"
        :class="{ checkweek: weeks == weeked }"
        v-for="(weeks, index) in weekArr"
      >
        {{ weeks }}
      </view>
    </view>
    <view class="day">
      <view
        :class="[
          days.date == '' ? 'checkday' : days.date == localDate ? 'choose' : ''
        ]"
        v-for="(days, i) in dayArr"
        :key="i"
      >
        {{ days.day }}
      </view>
    </view>
  </view>
</template>

<script>
export default {
  // uni 日历插件
  name: 'xh-zwy-calendar',
  data() {
    return {
      weeked: '', //今天周几
      dayArr: [], // 当前月每日
      localDate: '', //今日日期
      year: new Date().getFullYear(), // 当前年
      month: new Date().getMonth() + 1, // 当前月
      weekArr: ['日', '一', '二', '三', '四', '五', '六'] // 周
    }
  },
  mounted() {
    let that = this
    that.initDate()
    that.weeked = '日一二三四五六'.charAt(new Date().getDay())
    that.localDate =
      that.year +
      '-' +
      that.formatNum(that.month) +
      '-' +
      that.formatNum(new Date().getDate())
  },
  methods: {
    // 初始化日期
    initDate() {
      let that = this
      that.dayArr = []
      // 当前月总天数
      let totalDay = new Date(that.year, that.month, 0).getDate()
      // 遍历总天数将日期逐个添加至数组
      for (let i = 1; i <= totalDay; i++) {
        // 得到需补充天数
        let value = new Date(that.year, that.month - 1, i).getDay()
        // 补充前面空白日期
        if (i == 1 && value != 0) that.addBefore(value)
        // 添加本月日期
        let obj = {}
        obj.date =
          that.year + '-' + that.formatNum(that.month) + '-' + that.formatNum(i)
        obj.day = i
        that.dayArr.push(obj)
        // 补充后面空白日期
        if (i == totalDay && value != 6) that.addAfter(value)
      }
    },
    // 补充前面空白日期
    addBefore(value) {
      let that = this
      let totalDay = new Date(that.year, that.month - 1, 0).getDate()
      for (let i = 0; i < value; i++) {
        let obj = {}
        obj.date = ''
        obj.day = totalDay - (value - i) + 1
        that.dayArr.push(obj)
      }
    },
    // 补充后空白日期
    addAfter(value) {
      let that = this
      for (let i = 0; i < 6 - value; i++) {
        let obj = {}
        obj.date = ''
        obj.day = i + 1
        that.dayArr.push(obj)
      }
    },
    // 格式化日期位数
    formatNum(num) {
      return num < 10 ? '0' + num : num
    },
    // 上一个月
    lastMonth() {
      let that = this
      if (that.month == 1) {
        that.year -= 1
        that.month = 12
      } else {
        that.month -= 1
      }
      that.initDate()
    },
    // 下一个月
    nextMonth() {
      let that = this
      if (that.month == 12) {
        that.year += 1
        that.month = 1
      } else {
        that.month += 1
      }
      that.initDate()
    }
  }
}
</script>

<style scoped>
.calendar-box {
  width: 100%;
  flex-direction: column;
  justify-content: center;
}

.calendar-box,
.month,
.week,
.day {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.month,
.week,
.day {
  width: 700rpx;
}

.month {
  margin: 30rpx 0;
}

.day {
  flex-wrap: wrap;
}

.week > view,
.day > view {
  width: 100rpx;
  height: 100rpx;
  text-align: center;
  line-height: 100rpx;
}

.checkweek {
  color: #ff8f22;
}

.checkday {
  color: #999;
}

.choose {
  color: #ffffff;
  border-radius: 50%;
  background: #ff8f22;
}
</style>
