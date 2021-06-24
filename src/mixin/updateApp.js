// APP更新安装包逻辑
export default {
  data() {
    return {
      version: ''
    }
  },
  onload() {
    // #ifdef APP-PLUS
    uni.getSystemInfo({
      success: res => {
        var _this = this
        //检测当前平台，如果是安卓则启动安卓更新
        if (res.platform == 'android') {
          //  获取manifest.json里的配置信息
          plus.runtime.getProperty(plus.runtime.appid, function(wgtinfo) {
            // 可以根据manifest.json里的应用名称来进行针对性的APP升级
            if (wgtinfo.name == 'xxx') {
              // 获取manifest.json里的版本号
              _this.version = wgtinfo.version
              _this.AndroidCheckUpdate()
            }
          })
        } else if (res.platform == 'ios') {
          //在App Store Connect中的App Store下的app信息，可找到appleId
          let appleId = 111111111
          plus.runtime.launchApplication(
            {
              action: `itms-apps://itunes.apple.com/cn/app/id${appleId}?mt=8`
            },
            function(e) {
              console.log('Open system default browser failed: ' + e.message)
            }
          )
        }
      }
    })
    // #endif
  },
  methods: {
    AndroidCheckUpdate: function() {
      var _this = this
      uni.request({
        //请求地址，设置为自己的服务器链接
        url: '******************************',
        //method: 'GET',
        data: {},
        success: resMz => {
          var server_version = resMz.data.data
          var currTimeStamp = resMz.data.time
          _this.checkVersionToLoadUpdate(server_version, _this.version)
          // 判断缓存时间
          // uni.getStorage({
          // 	key: 'tip_version_update_time',
          // 	success: function(res) {
          // 		var lastTimeStamp = res.data
          // 		//定义提醒的时间间隔，避免烦人的一直提示，一个小时：3600；一天：86400
          // 		var tipTimeLength = 3600
          // 		if ((lastTimeStamp + tipTimeLength) > currTimeStamp) {
          // 			//避免多次提醒，不要更新
          // 			console.log("避免多次提醒，不要更新")
          // 		} else {
          // 			//重新设置时间戳
          // 			_this.setStorageForAppVersion(currTimeStamp)
          // 			//进行版本型号的比对 以及下载更新请求
          // 			_this.checkVersionToLoadUpdate(server_version, _this.version)
          // 		}
          // 	},
          // 	fail: function(res) {
          // 		_this.setStorageForAppVersion(currTimeStamp)
          // 	}
          // })
        },
        fail: () => {},
        complete: () => {}
      })
    },
    /**
     * //设置应用版本号对应的缓存信息
     * @param {Object} currTimeStamp 当前获取的时间戳
     */
    // setStorageForAppVersion: function(currTimeStamp) {
    // 	uni.setStorage({
    // 		key: 'tip_version_update_time',
    // 		data: currTimeStamp,
    // 		success: function() {
    // 			console.log('setStorage-success')
    // 		}
    // 	})
    // },
    /**
     * 进行版本型号的比对 以及下载更新请求
     * @param {Object} server_version 服务器最新 应用版本号
     * @param {Object} curr_version 当前应用版本号
     */
    checkVersionToLoadUpdate: function(server_version, curr_version) {
      if (server_version > curr_version) {
        //TODO 此处判断是否为 WIFI连接状态
        if (plus.networkinfo.getCurrentType() != 3) {
          uni.showToast({
            title:
              '有新的版本发布，检测到您目前非Wifi连接，为节约您的流量，程序已停止自动更新，将在您连接WIFI之后重新检测更新',
            mask: true,
            duration: 5000,
            icon: 'none'
          })
          return
        } else {
          uni.showModal({
            title: '版本更新',
            content:
              '有新的版本发布，检测到您当前为Wifi连接，是否立即进行新版本下载？',
            confirmText: '立即更新',
            cancelText: '稍后进行',
            success: function(res) {
              if (res.confirm) {
                uni.showToast({
                  icon: 'none',
                  mask: true,
                  // title: '有新的版本发布，检测到您目前为Wifi连接，程序已启动自动更新。新版本下载完成后将自动 弹出安装程序',
                  title: '新版本下载完成后，将自动弹出安装程序',
                  duration: 5000
                })
                //设置 最新版本apk的下载链接
                var downloadApkUrl = '*******'
                var dtask = plus.downloader.createDownload(
                  downloadApkUrl,
                  {},
                  function(d, status) {
                    // 下载完成
                    if (status == 200) {
                      // 安装包
                      plus.runtime.install(
                        plus.io.convertLocalFileSystemURL(d.filename),
                        {},
                        {},
                        function(error) {
                          uni.showToast({
                            title: '安装失败',
                            duration: 1500,
                            icon: 'none'
                          })
                        }
                      )
                    } else {
                      uni.showToast({
                        title: '更新失败',
                        duration: 1500,
                        icon: 'none'
                      })
                    }
                  }
                )
                dtask.start()
              } else if (res.cancel) {
                // console.log('稍后更新')
              }
            }
          })
        }
      }
    }
  }
}
