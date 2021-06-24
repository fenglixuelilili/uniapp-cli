function getpageTemplate(name) {
  const pagestr = `
  <template>
    <view class="${name}"> </view>
  </template>
  <script>
  export default {
    data() {
      return {}
    },
    methods: {}
  }
  </script>
  <style lang="scss" scoped></style>`
  return pagestr
}
module.exports = {
  getpageTemplate
}
