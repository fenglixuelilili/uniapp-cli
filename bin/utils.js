const fs = require('fs')
function parsePath(pathname) {
  let resultname = pathname.replace(/[A-Z]/g, '-$&')

  if (resultname.indexOf('-') === 0) {
    resultname = resultname.slice(1)
  }
  return resultname.toLocaleLowerCase()
}
function createfile(path, content) {
  console.log(content)
  let resultpath = path
  // 在这里需要一层一层创建
  const dirarr = resultpath.split('/')
  let createpath = dirarr.shift()

  for (let pa_th of dirarr) {
    createpath = createpath + '/' + pa_th
    // 判断是否有.vue文件
    if (createpath.indexOf('.vue') !== -1) {
      if (fs.existsSync(createpath)) {
        throw new Error('文件已经存在')
      } else {
        // 创建文件
        console.log('创建文件')
        fs.writeFileSync(createpath, content, {
          encoding: 'utf-8'
        })
      }
    } else {
      if (!fs.existsSync(createpath)) {
        fs.mkdirSync(createpath)
      }
    }
  }
  // console.log(dirarr)
  // 将路径中的所有文件都要进行判断是否存在，不存在就立即创建
}
function setJSON(path, resultname) {
  let jsonpage = fs.readFileSync(path, { encoding: 'utf-8' })
  jsonpage = JSON.parse(jsonpage)
  let newjsonpage = {
    ...jsonpage,
    pages: [
      ...jsonpage.pages,
      {
        path: 'pages/' + resultname + '/' + resultname
      }
    ]
  }
  fs.writeFileSync(path, JSON.stringify(newjsonpage, null, 4), {
    encoding: 'utf-8'
  })
}
module.exports = {
  parsePath,
  createfile,
  setJSON
}
