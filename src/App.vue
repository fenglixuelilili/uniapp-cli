<script>
import onLaunch from './utlis/onLaunch.js'
import store from './store'
import updateApp from './mixin/updateApp.js'
import uniPush from './mixin/uniPush.js'
export default {
  mixins: [updateApp, uniPush],
  onShow: function() {
    for (let fn in onLaunch) {
      onLaunch[fn](this)
    }
    // 计算屏幕长宽比 更新到全局
    try {
      const res = uni.getSystemInfoSync()
      let proportion =
        res.screenHeight > res.screenWidth
          ? res.screenHeight / res.screenWidth
          : res.screenWidth / res.screenHeight
      store.state.proportion = proportion
    } catch (e) {
      // error
    }
  }
}
</script>
