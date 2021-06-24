function canIplatform() {
  // 平台差异
  try {
    const res = uni.getSystemInfoSync()
    const { app } = res
    return app
  } catch (e) {
    return null
  }
}
// 不同平台兼容-----目前未使用，可能是很鸡肋的兼容方案
uni['chooseChatForNormalMsg'] = function(params) {
  if (canIplatform() === 'DingTalk') {
    // 钉钉平台特有
    return dd.chooseChatForNormalMsg(params)
  }
  console.error(
    '该api-chooseChatForNormalMsg只在钉钉平台可用, 使用该api前应判断兼容,详情请到官网查询: https://developers.dingtalk.com/document/app/obtain-session-information'
  )
  return false
}
export default {
  // 判斷哪一个平台
  canIplatform
}
