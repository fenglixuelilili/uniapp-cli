const webpack = require('webpack')

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        localStorage: ['mp-storage', 'localStorage'],
        'window.localStorage': ['mp-storage', 'localStorage'],
        'test-globle': '测试全局变量'
      })
    ]
  },
  chainWebpack: config => {
    config.plugin('define').tap(args => {
      // 配置全局环境变量 例如：
      args[0]['process.env'].VUE_APP_TEST = '"test"'
      return args
    })
  }
}
