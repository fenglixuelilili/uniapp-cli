export const timeout = 6000 * 5
export const baseUrl = 'https://dhsw.xwsxedu.com' //正式地址
// if( process.env.NODE_ENV === 'development' ){

// } else if (process.env.NODE_ENV === 'production'){

// }
export const errMessage = [
  {
    url: '/api/auth/login',
    msg: '验证码或者手机号不匹配',
    code: 401
  }
]
// 不需要做提醒的url列表
export const noToastUrl = ['/api/report/app']
// 需要弹让你登陆框的页面
export const isLoginarr = ['pages/mycourse/mycourse']
