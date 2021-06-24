import { isPad } from '../utlis'
// import {  } from '../api'

import {
  getToken,
  setToken,
  getExpirationTime,
  setExpirationTime,
  getUserInfo,
  setUserInfo,
  getUid,
  setUid
} from '../utlis/login'

import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    phoneType: '',
    loading: false,
    // 登陆相关
    login: {
      expiration_time: getExpirationTime() || '', //时间过期 拉起授权
      token: getToken() || '',
      uid: getUid() || ''
    },
    // 用户信息
    userinfo: getUserInfo() || {}
  },
  mutations: {
    getPhoneType(state) {
      isPad().then(data => {
        state.phoneType = data
      })
    },
    // 全局的loading
    showLoading(state) {
      state.loading = true
    },
    hideLoading(state) {
      state.loading = false
    },
    // 登陆相关
    setlogin(state, data) {
      const { expiration_time, token, user } = data
      const { uid } = user
      state.login.expiration_time = expiration_time
      state.login.token = token
      state.login.uid = uid
      setToken(token)
      setExpirationTime(expiration_time)
      setUid(uid)
    },
    // 设置用户微信信息
    setUserInfo(state, userinfo) {
      state.userinfo = userinfo
      setUserInfo(userinfo)
    },
    // 显示二次授权弹框
    showAuthorization(state) {
      state.visableAuthorization = true
    },
    hideAuthorization(state) {
      state.visableAuthorization = false
    },
    // 显示首次登陆模态框mask
    showLoginMask(state) {
      state.loginMask = true
    },
    hideLoginMask(state) {
      state.loginMask = false
    }
  },
  actions: {
    xhlogin({ commit }, formLoginData) {
      // return Login(formLoginData).then(data => {
      //   wx.login({
      //     success(e) {
      //       const { code } = e
      //       authorizeCode({
      //         code,
      //         auth_type: 'applets'
      //       })
      //     }
      //   })
      //   commit('setlogin', data)
      // })
    },
    // 使用code码登陆
    codeLogin({ commit }) {
      return new Promise((resolve, reject) => {
        uni.login({
          success(e) {
            const { code } = e
            codeLogin({
              code,
              auth_type: 'applets'
            })
              .then(data => {
                commit('setlogin', data)
                resolve(data)
              })
              .catch(err => {
                reject(err)
              })
          },
          fail(err) {
            reject(err)
          }
        })
      })
    }
  }
})
export default store
