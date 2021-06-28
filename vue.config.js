const webpack = require('webpack')
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        // 对库做全局别名处理
        localStorage: ['mp-storage', 'localStorage'],
        'window.localStorage': ['mp-storage', 'localStorage']
      })
    ]
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@utlis', resolve('/src/utlis'))
      .set('@api', resolve('/src/api'))
      .set('@components', resolve('/src/components'))
    config.plugin('define').tap(args => {
      // 配置全局环境变量 例如：
      args[0]['process.env'].VUE_APP_TEST = '"test"'
      return args
    })
  }
}
