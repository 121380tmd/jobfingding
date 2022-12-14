// 跨域代理前缀
const VUE_APP_API_PROXY_PREFIX = process.env.VUE_APP_API_PROXY_PREFIX
const VUE_APP_API_BASE_URL = process.env.VUE_APP_API_BASE_URL
const VUE_APP_TOKEN_KEY = process.env.VUE_APP_TOKEN_KEY
const VUE_APP_LOCAL_STORAGE_USER_INFO_KEY = process.env.VUE_APP_LOCAL_STORAGE_USER_INFO_KEY
const BASE_URL = process.env.NODE_ENV === "production" ? VUE_APP_API_BASE_URL : VUE_APP_API_PROXY_PREFIX

// console.log("BASE_URL = ", BASE_URL)
module.exports = Object.freeze({
  BASE_URL,
  TOKEN_KEY: VUE_APP_TOKEN_KEY,
  LOCAL_STORAGE_USER_INFO_KEY: VUE_APP_LOCAL_STORAGE_USER_INFO_KEY,
})
