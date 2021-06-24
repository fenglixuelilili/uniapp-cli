const path = require('path')
const { parsePath, createfile, setJSON } = require('./utils')
const { getpageTemplate } = require('./temp')
// 获取参数
let type = process.argv[2]
let name_content = process.argv[3]

// 获取项目相对根路径
const basepath = path.resolve('./')
if (!name_content) {
  console.log('请输入文件名称')
  return
}
// 将文件名称从大写转换为小写
let resultname = parsePath(name_content)
let page_path = `${basepath}/src/pages/${resultname}/${resultname}.vue`
let tempcont = getpageTemplate(resultname)
switch (type) {
  case 'page':
    // 写入文件
    createfile(page_path, tempcont)
    // 将配置写入JSON
    setJSON(`${basepath}/src/pages.json`, resultname)
    break
  case 'component':
    console.log('component')
    break
}
