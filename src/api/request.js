import { timeout } from './httpRequestConfig'
import { baseUrl } from './httpRequestConfig'
import { errMessage, noToastUrl } from './httpRequestConfig'
import $xh from '../utlis/index'
import store from '../store'
// 不需要tokne 白名单
const whiteList = ['/api/auth/send_msg']
let showLoading = function() {
  // uni.showLoading({
  //   title: '疯狂加载中..'
  // })
  store.state.loading = true
}
let hideLoading = function() {
  // uni.hideLoading()
  store.state.loading = false
}
function request({ method = 'GET', url, header = {}, data = {} }) {
  if (!noToastUrl.includes(url)) {
    // uni.showLoading({
    //   title: '疯狂加载中..'
    // })
    showLoading()
  }
  return new Promise((resolve, reject) => {
    const _url = baseUrl + url
    let _header = {
      ...header
    }
    if (method === 'POST' || method === 'PUT') {
      _header['content-type'] = 'application/json'
    } else {
      _header['content-type'] = 'application/text'
    }
    // 白名单中的不加token 不校验token的过期时间
    if (!whiteList.includes(url)) {
      // 不在白名单中
      // 校验过期token时间
      if ($xh.verificationExpired()) {
        // 过期了
        // 弹框手动授权登陆
        if (store.state.login.token === '') {
          store.commit('showLoginMask')
        } else {
          store.commit('showAuthorization')
        }
        // uni.hideLoading()
        hideLoading()
        return resolve({ errmasg: '登陆过期' })
      } else {
        // 未过期
        _header['Authorization'] = 'JWT ' + store.state.login.token
        store.commit('hideLoginMask')
        store.commit('hideAuthorization')
      }
    }
    uni.request({
      url: _url,
      method,
      header: _header,
      data,
      timeout,
      success(res) {
        // uni.hideLoading()
        hideLoading()
        if (res.statusCode !== 200 && res.statusCode !== 201) {
          // 处理当获取code码的时候 是否跳转到登陆页
          if (
            url === '/api/authwechat/login?auth_type=applets' &&
            res.statusCode === 406
          ) {
            // 清除信息
            try {
              uni.clearStorageSync()
            } catch (e) {
              // error
              console.log(e, '清除全部数据失败')
            }
            // uni.hideLoading()
            hideLoading()
            // 跳转登录页
            uni.redirectTo({
              url: '/pages/login/login',
              fail(e) {
                console.log(e)
              }
            })
            return reject(res)
          }
          let flag = true
          errMessage.forEach(item => {
            if (url === item.url && res.statusCode === item.code) {
              flag = false
              if (!noToastUrl.includes(url)) {
                $xh.Toast(item.msg)
              }
            }
          })
          if (flag) {
            if (!noToastUrl.includes(url)) {
              $xh.Toast('哎呦，出错啦~~')
            }
          }
          // uni.hideLoading()
          hideLoading()
          reject(res)
        } else {
          // uni.hideLoading()
          hideLoading()
          resolve(res.data)
        }
      },
      fail(err) {
        // uni.hideLoading()
        hideLoading()
        if (!noToastUrl.includes(url)) {
          $xh.Toast('哎呦，出错啦~~')
        }
        reject(err)
      }
    })
  })
}
export default request
