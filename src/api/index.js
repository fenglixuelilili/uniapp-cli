import request from './request.js'
// 登陆相关
// ---------------------------------------------
// 获取验证码
export const getCode = data => {
  return request({
    method: 'POST',
    url: '/api/auth/send_msg',
    data: data
  })
}
// -------Banner相关--------------------------------------------------------------
export const getBanner = (data = {}) => {
  return request({
    method: 'GET',
    url: '/api/banner',
    data: data
  })
}
