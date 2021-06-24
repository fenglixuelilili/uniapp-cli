import $xh from './index'
const TOKEN = 'token'
const EXPIRATIONTIME = 'expiration_time'
const USERINFO = 'userinfo'
const UID = 'uid'

export const getToken = () => {
  return $xh.getStorage(TOKEN)
}
export const setToken = value => {
  return $xh.setStorage(TOKEN, value)
}
export const getExpirationTime = () => {
  return $xh.getStorage(EXPIRATIONTIME)
}
export const setExpirationTime = value => {
  return $xh.setStorage(EXPIRATIONTIME, value)
}
export const getUserInfo = () => {
  return $xh.getStorage(USERINFO)
}
export const setUserInfo = value => {
  return $xh.setStorage(USERINFO, value)
}
export const setUid = value => {
  return $xh.setStorage(UID, value)
}
export const getUid = () => {
  return $xh.getStorage(UID)
}
