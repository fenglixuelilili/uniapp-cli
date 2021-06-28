var WebSocketServer = require('ws').Server,
  wss = new WebSocketServer({
    port: 8181
  }) //服务端口8181
var message = [
  {
    name: '小明',
    imge:
      'https://img0.baidu.com/it/u=3101694723,748884042&fm=26&fmt=auto&gp=0.jpg',
    id: 0,
    message: '我是最后一条新消息，不信你看哦' + Math.random()
  },
  {
    name: '小红',
    imge:
      'https://img0.baidu.com/it/u=3870964477,3746012709&fm=26&fmt=auto&gp=0.jpg',
    id: 1,
    message: '我是最后一条新消息，不信你看哦' + Math.random()
  },
  {
    name: '小胖',
    imge:
      'https://img1.baidu.com/it/u=1361135963,570304265&fm=26&fmt=auto&gp=0.jpg',
    id: 2,
    message: '我是最后一条新消息，不信你看哦' + Math.random()
  },
  {
    name: '小明2',
    imge:
      'https://img0.baidu.com/it/u=3101694723,748884042&fm=26&fmt=auto&gp=0.jpg',
    id: 3,
    message: '我是最后一条新消息，不信你看哦' + Math.random()
  },
  {
    name: '小红2',
    imge:
      'https://img0.baidu.com/it/u=3870964477,3746012709&fm=26&fmt=auto&gp=0.jpg',
    id: 4,
    message: '我是最后一条新消息，不信你看哦' + Math.random()
  },
  {
    name: '小胖2',
    imge:
      'https://img1.baidu.com/it/u=1361135963,570304265&fm=26&fmt=auto&gp=0.jpg',
    id: 5,
    message: '我是最后一条新消息，不信你看哦' + Math.random()
  },
  {
    name: '命名',
    imge:
      'https://img0.baidu.com/it/u=3101694723,748884042&fm=26&fmt=auto&gp=0.jpg',
    id: 6,
    message: '我是最后一条新消息，不信你看哦' + Math.random()
  },
  {
    name: '红红',
    imge:
      'https://img0.baidu.com/it/u=3870964477,3746012709&fm=26&fmt=auto&gp=0.jpg',
    id: 7,
    message: '我是最后一条新消息，不信你看哦' + Math.random()
  },
  {
    name: '小胖胖胖',
    imge:
      'https://img1.baidu.com/it/u=1361135963,570304265&fm=26&fmt=auto&gp=0.jpg',
    id: 8,
    message: '我是最后一条新消息，不信你看哦' + Math.random()
  },
  {
    name: '小小',
    imge:
      'https://img0.baidu.com/it/u=3101694723,748884042&fm=26&fmt=auto&gp=0.jpg',
    id: 9,
    message: '我是最后一条新消息，不信你看哦' + Math.random()
  },
  {
    name: '红2',
    imge:
      'https://img0.baidu.com/it/u=3870964477,3746012709&fm=26&fmt=auto&gp=0.jpg',
    id: 10,
    message: '我是最后一条新消息，不信你看哦' + Math.random()
  },
  {
    name: '小子',
    imge:
      'https://img1.baidu.com/it/u=1361135963,570304265&fm=26&fmt=auto&gp=0.jpg',
    id: 11,
    message: '我是最后一条新消息，不信你看哦' + Math.random()
  }
]
function random(start, end) {
  return Math.round(start + Math.random() * (end - start))
}
function sendMessage(ws) {
  let i = 2
  // ws.send(JSON.stringify(message))
  // 一次随机发送两条数据 在客户端缓存
  let res = []
  while (i > 0) {
    let j = random(0, message.length)
    res.push(message[j])
    i--
  }
  res = JSON.stringify(res)
  ws.send(res)
}
wss.on('connection', function(ws) {
  function sendMessageTime() {
    sendMessage(ws)
    setTimeout(() => {
      sendMessageTime()
    }, 30000)
  }
  sendMessageTime()
  ws.on('message', function(message) {
    // 监听消息
  })
  ws.on('close', function() {})
})
