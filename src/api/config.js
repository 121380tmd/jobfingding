import axios from "axios"
import { BASE_URL } from "@/constant/config"
import Message from "ant-design-vue/lib/message"
const { TOKEN_KEY } = require("@/constant/config")
import store from "@/store"
// http method
const METHOD = {
  GET: "get",
  POST: "post",
  DELETE: "delete",
  PUT: "PUT",
}

const REQUEST_DATA_TYPE = {
  DATA: "data",
  PARAMS: "params",
}

const instance = axios.create({
  baseURL: BASE_URL, // 请求基础地址
  headers: {
    "Content-Type": "application/json", // 默认请求头
  },
  timeout: 60 * 1000, // 默认请求超时时间
})
// 拦截器
instance.interceptors.request.use(config => {
  const token = store.getters.token
  if (token) {
    config.headers[TOKEN_KEY] = token
  }
  return config
}, err => {
  console.error(err)
})
instance.interceptors.response.use(({ config, data }) => {
  return new Promise((resolve, reject) => {
    // 是否使用拦截器处理异常
    if (config.userInterceptors === false) {
      return resolve(data)
    } else {
      if (data.code === 200 && data?.success === true) {
        // console.log(data)
        // Message.success(data.msg)
        return resolve(data) // 默认只返回数据字段
      }
      // 是否自动报错
      if (config.autoAlertErrorMessage !== false) {
        // Message.warning(data.msg, 5)
      }
      return reject(data)
    }
  })
}, (err) => {
  // Message.warning("网络繁忙,请稍后再试!")
  console.error(err.response)
  return Promise.reject(err)
})

export {
  instance,
  METHOD,
  REQUEST_DATA_TYPE,
}
