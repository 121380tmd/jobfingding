// 本地化存储相关工具函数

/**
 * 存localStorage,并加上逻辑时间
 * @param key
 * @param value
 * @param duration 秒 0 表示一直有效
 */
function setLocalStorage(key, value, duration = 0) {
  const data = {
    value: value,
    expiryTime: !duration || isNaN(duration) ? 0 : new Date().getTime() + duration * 1000,
  }
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (e) {
    console.error(e)
  }
}
/**
 * 取localStorage,并根据逻辑时间附上有效性
 * @param key
 * @returns {*}
 */
function getLocalStorage(key) {
  const data = localStorage.getItem(key)
  if (!data || data === "null") {
    return null
  }
  const now = new Date().getTime()
  let obj
  try {
    obj = JSON.parse(data)
  } catch (e) {
    return null
  }
  if (obj.expiryTime === 0 || obj.expiryTime > now) {
    return obj.value
  }
  return null
}
/**
 * 删除LocalStorage
 * @param key
 */
function removeLocalStorage(key) {
  localStorage.removeItem(key)
}

function setCookie(cname, cValue, expiresDays = 365 * 100) {
  const d = new Date()
  d.setTime(d.getTime() + (expiresDays * 24 * 60 * 60 * 1000))
  const expires = "expires=" + d.toGMTString()
  document.cookie = cname + "=" + cValue + "; " + expires
}

function getCookie(cname) {
  const name = cname + "="
  const ca = document.cookie.split(";")
  for (let i = 0; i < ca.length; i++) {
    const c = ca[i].trim()
    if (c.indexOf(name) === 0) return c.substring(name.length, c.length)
  }
  return ""
}

function removeCookie(cname) {
  setCookie(cname, "", -1)
}

export {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
  setCookie,
  getCookie,
  removeCookie,
}
