// App 推送逻辑
export default {
  onLaunch: function() {
    // #ifdef APP-PLUS
    plus.push.addEventListener('click', this._handlePush)
    plus.push.addEventListener('receive', this._handlePush)
    // #endif
  },
  methods: {
    _handlePush(message) {}
  }
}
