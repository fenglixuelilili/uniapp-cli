export default {
  initStore(that) {
    that.$store.commit('getPhoneType')
    console.log(process.env)
  }
}
