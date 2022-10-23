/**
 * 裁切字符串
 * @param str 待裁切字符串
 * @param n 保留长度
 * @param ellipsis 裁切后添加后缀字符串
 */
function ellipsis(str, n, ellipsis = "...") {
  return str.length > n ? str.slice(0, n) + ellipsis : str
}

// 防抖
function debounce(fn, delay) {
  let timer
  return () => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(fn, delay) // 简化写法
  }
}

// 节流
function throttle(fn, delay) {
  let valid = true
  return () => {
    if (!valid) {
      // 休息时间 暂不接客
      return false
    }
    // 工作时间，执行函数并且在间隔期内把状态位设为无效
    valid = false
    setTimeout(() => {
      fn()
      valid = true
    }, delay)
  }
}

/**
 * 深拷贝 未考虑 Set Map Symbol RegExp Date  Error 等类型
 * @param target
 * @param map
 */
function deepClone(target, map = new WeakMap()) {
  if (typeof target === "object") {
    const cloneTarget = Array.isArray(target) ? [] : {}
    if (map.get(target)) { // 考虑循环引用和重复引用
      return target
    }
    map.set(target, cloneTarget)
    for (const key in target) {
      cloneTarget[key] = deepClone(target[key], map)
    }
    return cloneTarget
  } else {
    return target
  }
}

/**
 * 对对象数据进行初始化，数组、对象、数字、字符串、布尔值默认初始化后的值分别为 [], {}, 0, '', false
 * @param data { Object } 要初始化数据
 * @param customFormData { Object } 需要自定义初始化的表单数据
 */
function initObjData(data, customFormData) {
  for (const key in data) {
    const isCustom = key in customFormData
    if (![ undefined, null ].includes(data[key])) {
      switch (data[key].constructor) {
        case Array:
          if (isCustom && ![ undefined, null ].includes(customFormData[key])) {
            data[key] = [...customFormData[key]]
          } else {
            data[key] = []
          }
          break
        case Object:
          if (isCustom && ![ undefined, null ].includes(customFormData[key])) {
            data[key] = { ...customFormData[key] }
          } else {
            data[key] = {}
          }
          break
        case String:
          if (isCustom) {
            data[key] = customFormData[key]
          } else {
            data[key] = ""
          }
          break
        case Number:
          if (isCustom) {
            data[key] = customFormData[key]
          } else {
            data[key] = 0
          }
          break
        case Boolean:
          if (isCustom) {
            data[key] = customFormData[key]
          } else {
            data[key] = false
          }
          break
        default:
          if (isCustom) {
            data[key] = customFormData[key]
          } else {
            data[key] = null
          }
      }
    } else {
      if (isCustom) {
        data[key] = customFormData[key]
      }
    }
  }
}

function enumerateToSelectOptions(enumerate) {
  const options = []
  for (const key in enumerate) {
    options.push({
      label: enumerate[key].label,
      value: key
    })
  }
  return options
}

function getLabelFromEnumerate(enumerate, key) {
  if (key in enumerate) {
    return enumerate[key].label || ""
  } else {
    return ""
  }
}

export {
  ellipsis,
  debounce,
  throttle,
  deepClone,
  initObjData,
  enumerateToSelectOptions,
  getLabelFromEnumerate,
}
