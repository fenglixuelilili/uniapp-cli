import Vue from 'vue'
import App from './App'
import store from './store'
import './commen.scss'
import './static/css/animate.css'
import xhutlis from './utlis'
// import myApp from './utlis/initApp'
// 处理各个平台的专属api
import './utlis/patformCompatibility.js'
// import lodash from 'lodash'
Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.$store = store
// Vue.prototype._ = lodash
// 全局公共方法
Vue.prototype.$xh = {}
for (let fn in xhutlis) {
  Vue.prototype.$xh[fn] = xhutlis[fn]
}
const app = new Vue({
  ...App
})
app.$mount()
// myApp(app).then(() => app.$mount())
