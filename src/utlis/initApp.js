export default app => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(app.$mount())
      resolve(app)
    }, 5000)
  })
}
