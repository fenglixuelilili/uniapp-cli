import store from '../store/index'
import { baseUrl } from '../api/httpRequestConfig'
// var Base64 = require('./base64.js')
var sMD5 = require('./md5.js')
const week = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
export const isPad = () => {
  return new Promise((resolve, reject) => {
    uni.getSystemInfo({
      success(info) {
        if (info.windowWidth >= 768) {
          resolve('ipad')
        } else {
          resolve('iphone')
        }
      },
      fail() {
        reject()
      }
    })
  })
}
// 文件上传
export const upLoad = (put_type = 'image', _tempFilePath = '') => {
  return new Promise((resolve, reject) => {
    if (_tempFilePath) {
      const tempFilePaths = _tempFilePath
      let name = tempFilePaths.slice(tempFilePaths.lastIndexOf('.'))
      name = name.toLowerCase()
      let imgtypes = ['.git', '.jpg', '.jpeg', '.png', '.tiff']
      if (!imgtypes.includes(name)) {
        this.$xh.Toast('请上传图片格式哦')
        reject('格式错误')
        return
      }
      uni.getFileSystemManager().readFile({
        filePath: tempFilePaths,
        success: res => {
          //成功的回调
          uni.showLoading({
            title: '正在上传，请耐心等待...',
            mask: true
          })
          var spark = new sMD5.ArrayBuffer()
          spark.append(res.data)
          var hexHash = spark.end(false)
          uni.request({
            url: baseUrl + '/api/oss/put',
            method: 'POST',
            header: {
              Authorization: 'JWT ' + store.state.login.token
            },
            data: {
              put_type,
              // content_md5: Base64.encode(hexHash),
              filename: hexHash + name
            },
            timeout: 60 * 1000 * 1000,
            success(uploadFileRes) {
              let result = uploadFileRes.data
              const host = 'https://image.xwsxedu.com'
              const signature = result.signature // 签名 - 后端给
              const ossAccessKeyId = result.access_id // OSS ID - 后端给
              const policy = result.policy // 上传限制 - 后端给
              const key = hexHash + name // 上传 Object 名称(OSS 上文件名称) 32位字符串文件MD5 值.文件后缀 (MD5 spark-md5.js end(flase))
              let cal = result.callback // 回调地址 - 后端给出
              uni.uploadFile({
                url: host, // 开发者服务器的URL。
                filePath: tempFilePaths,
                name: 'file', // 必须填file。
                formData: {
                  key: key,
                  policy: policy,
                  OSSAccessKeyId: ossAccessKeyId,
                  Signature: signature,
                  success_action_status: 200,
                  callback: cal
                },
                success: res => {
                  if (res.statusCode === 200) {
                    let _res = JSON.parse(res.data)
                    uni.hideLoading()
                    resolve(_res)
                  }
                },
                fail: err => {
                  uni.showToast({
                    title: '上传失败，请重试',
                    icon: 'none'
                  })
                  uni.hideLoading()
                  reject(err)
                }
              })
            },
            fail(err) {
              uni.showToast({
                title: '上传失败，请重试',
                icon: 'none'
              })
              uni.hideLoading()
              reject(err)
            }
          })
        },
        fail(e) {
          uni.hideLoading()
          uni.showToast({
            title: '上传失败，请重试',
            icon: 'none'
          })
          reject(e)
        }
      })

      // formData.append('put_type', put_type)
      // formData.append('content_md5', md5)
      // formData.append('filename', filename)
    } else {
      uni.chooseImage({
        success: chooseImageRes => {
          const tempFilePaths = _tempFilePath
            ? _tempFilePath
            : chooseImageRes.tempFilePaths
          const name = tempFilePaths[0].slice(tempFilePaths[0].lastIndexOf('.'))
          // if(name)
          uni.getFileSystemManager().readFile({
            filePath: tempFilePaths[0],
            success: res => {
              //成功的回调
              var spark = new sMD5.ArrayBuffer()
              spark.append(res.data)
              var hexHash = spark.end(false)
              uni.request({
                url: baseUrl + '/api/oss/put',
                method: 'POST',
                header: {
                  Authorization: 'JWT ' + store.state.login.token
                },
                data: {
                  put_type,
                  // content_md5: Base64.encode(hexHash),
                  filename: hexHash + name
                },
                timeout: 60 * 1000 * 1000,
                success(uploadFileRes) {
                  let result = uploadFileRes.data
                  const host = 'https://image.xwsxedu.com'
                  const signature = result.signature // 签名 - 后端给
                  const ossAccessKeyId = result.access_id // OSS ID - 后端给
                  const policy = result.policy // 上传限制 - 后端给
                  const key = hexHash + name // 上传 Object 名称(OSS 上文件名称) 32位字符串文件MD5 值.文件后缀 (MD5 spark-md5.js end(flase))
                  let cal = result.callback // 回调地址 - 后端给出
                  uni.uploadFile({
                    url: host, // 开发者服务器的URL。
                    filePath: chooseImageRes.tempFilePaths[0],
                    name: 'file', // 必须填file。
                    formData: {
                      key: key,
                      policy: policy,
                      OSSAccessKeyId: ossAccessKeyId,
                      Signature: signature,
                      success_action_status: 200,
                      callback: cal
                    },
                    success: res => {
                      if (res.statusCode === 200) {
                        let _res = JSON.parse(res.data)
                        uni.hideLoading()
                        resolve(_res)
                      }
                    },
                    fail: err => {
                      uni.hideLoading()
                      reject(err)
                    }
                  })
                },
                fail(err) {
                  uni.hideLoading()
                  reject(err)
                }
              })
            },
            fail(e) {
              uni.hideLoading()
              console.log(e)
              reject(e)
            }
          })

          // formData.append('put_type', put_type)
          // formData.append('content_md5', md5)
          // formData.append('filename', filename)
        }
      })
    }
  })
}
function Toast(text, fn) {
  uni.showToast({
    icon: 'none',
    title: text,
    duration: 2000
  })
  setTimeout(() => {
    fn && fn()
  }, 200)
}
Toast.success = text => {
  uni.showToast({
    icon: 'success',
    title: text,
    duration: 2000
  })
}
Toast.loading = text => {
  uni.showToast({
    icon: 'loading',
    title: text,
    duration: 2000
  })
}
function caniUse(apistr, api) {
  function _null() {
    // throw new Error('api在该平台下不可用，请检查')
    console.log(apistr + ' api在该平台下不可用，请检查兼容性')
    return {}
  }
  if (uni.canIUse(apistr)) {
    return api
  } else {
    return _null
  }
}

// 隐藏/显示 tab栏
export default {
  tabBar(type, obj = {}) {
    if (type === 'show') {
      uni.showTabBar(obj)
    } else {
      uni.hideTabBar(obj)
    }
  },
  getplatform() {
    const platform = uni.getSystemInfoSync().platform
    return platform
  },
  // 本地缓存
  setStorage(key, data) {
    try {
      let _data = data
      if (_data === undefined || _data === null) {
        console.log('setStorage存储错误:key和value为', key, data)
        return
      }
      if (typeof data !== 'string' && typeof _data !== 'number') {
        _data = JSON.stringify(_data)
      }
      if (typeof _data === 'number') {
        _data = String(_data)
      }
      // console.log('最终版本', _data)
      uni.setStorageSync(key, _data)
    } catch (e) {
      // error
      console.error('同步缓存出错')
    }
  },
  setStorageSync_(key, data) {
    let _data = data
    if (_data === undefined || _data === null) {
      console.log('setStorage存储错误:key和value为', key, data)
      return
    }
    if (typeof data !== 'string' && typeof value !== 'number') {
      _data = JSON.stringify(_data)
    }
    uni.setStorage({
      key: key,
      data: _data,
      fail(err) {
        console.log(err)
      }
    })
  },
  getStorage(key) {
    try {
      let value = uni.getStorageSync(key)
      if (
        typeof value !== 'number' &&
        typeof value !== 'string' &&
        value !== undefined &&
        value !== null
      ) {
        value = JSON.parse(value)
      }
      if (value) {
        return value
      }
    } catch (e) {
      let value = uni.getStorageSync(key)
      console.log(e, 'getStorage获取出错，出错key 和 data为：', key, value)
      return value
    }
  },
  // 自定义loding
  showLoading() {
    store.commit('showLoading')
  },
  hideLoading() {
    store.commit('hideLoading')
  },
  Toast: Toast,
  // 视频相关的工具
  getVideoTime(currentTime) {
    let min = parseInt(currentTime / 60)
    min = min.toFixed(0)
    if (min < 10) {
      min = '0' + min
    }
    let second = currentTime % 60
    second = second.toFixed(0)
    if (second < 10) {
      second = '0' + second
    }
    return {
      min,
      second
    }
  },

  // // 全局音频播放
  // playAudio(src, fn = null, err = null) {
  //   // console.log(src, audiosrc, src === audiosrc)
  //   // if (audiosrc === src) return
  //   // audiosrc = src
  //   store.state.book.iscourse = false //将小手关闭
  //   innerAudioContext.stop()
  //   innerAudioContext.autoplay = false
  //   if (src) {
  //     innerAudioContext.src = src
  //   } else {
  //     return
  //   }
  //   innerAudioContext.play()
  //   innerAudioContext.onPlay(() => {
  //     // console.log('开始播放音频', src)
  //   })
  //   innerAudioContext.onError(res => {
  //     console.log(res.errMsg)
  //     console.log(res.errCode)
  //     err && err()
  //   })
  //   innerAudioContext.onEnded(res => {
  //     fn && fn()
  //   })
  // },
  // pauseAudio() {
  //   innerAudioContext.pause()
  // },
  // 全局配置时间的地方
  getbufferTime() {
    return {}
  },
  // 全局配置音频的地方
  getbufferAudioSrc() {
    return {}
  },
  // 监测数据对象是否有空值
  isNull(obj) {
    let flag = false
    for (let key in obj) {
      if (obj[key] === '') {
        flag = true
      }
    }
    return flag
  },
  // 校验登陆过期时间
  verificationExpired() {
    const { expiration_time } = store.state.login
    let _expiration_time = expiration_time * 1000 //转换毫秒
    // 计算当前时间
    let date = new Date()
    let datatime = date.getTime()
    return _expiration_time < datatime || !store.state.login.token
  },
  // 序列化时间
  parseTimeDay(time) {
    if (!time) {
      return '暂无'
    }
    const d = new Date(time * 1000)
    let mounth = d.getMonth() + 1
    mounth = mounth >= 10 ? mounth + '月' : '0' + mounth + '月'
    let day = d.getDate()
    day = day >= 10 ? day + '日' : '0' + day + '日'
    return mounth + day
  },
  // 序列化时间 2018.08.03
  parseTimeYear(time) {
    if (!time) {
      return '暂无'
    }
    const d = new Date(time * 1000)
    let year = d.getFullYear()
    let mounth = d.getMonth() + 1
    mounth = mounth >= 10 ? mounth : '0' + mounth
    let day = d.getDate()
    day = day >= 10 ? day : '0' + day
    return `${year}.${mounth}.${day}`
  },
  parseTimeMouth(time) {
    if (!time) {
      return '暂无'
    }
    const d = new Date(time * 1000)
    let year = d.getFullYear()
    let mounth = d.getMonth() + 1
    mounth = mounth >= 10 ? mounth : '0' + mounth
    let day = d.getDate()
    day = day >= 10 ? day : '0' + day
    return `${mounth}月${day}日`
  },
  // 序列化时间 获取周
  parseTimeWeek(time) {
    if (!time) {
      return '暂无'
    }
    const d = new Date(time * 1000)
    let index = d.getDay()
    return week[index - 1]
  },
  // 本地存储的命名在这里面
  getSpacename() {
    return {
      // 课程列表
      // COURSE: 'course'
    }
  },
  // 发起支付
  pay(data, success, fail) {
    uni.getProvider({
      service: 'payment',
      success(e) {
        const { provider } = e
        uni.requestPayment({
          provider,
          ...data,
          success(e) {
            success && success(e)
          },
          fail(err) {
            fail && fail(err)
          }
        })
      }
    })
  },
  caniUse: caniUse
}
