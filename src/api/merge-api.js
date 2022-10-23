// 自动合并 @/led/api/modules/ 中的api配置
const importAll = context => {
  const map = {}

  for (const key of context.keys()) {
    const exportValue = context(key)
    for (const module in exportValue) {
      const apis = exportValue[module]
      for (const key in apis) {
        if (key in map) {
          console.error(new Error(`存在重复api键值: ${ key }`))
        }
        map[key] = apis[key]
      }
    }
  }
  return map
}

export default importAll(require.context("@/api/modules/", true, /\.js$/))
