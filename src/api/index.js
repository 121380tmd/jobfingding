import service from "@/api/merge-api"
import { METHOD, instance } from "@/api/config"
const api = {}

for (const i in service) {
  const config = service[i]
  api[i] = function(formData, apiConfig) {
    const requestConfig = {
      ...config,
      ...apiConfig,
    }
    if (config?.requestDataType) { // 若配置了 requestDataType 使用 requestDataType 作为参数方式
      requestConfig[config.requestDataType.toLowerCase()] = formData
    } else {
      switch (config.method.toLowerCase()) {
        case METHOD.GET: // 默认get使用 params 参数方式
          requestConfig.params = formData
          break
        default: // 其他使用 data 参数方式
          requestConfig.data = formData
      }
    }
    return instance(requestConfig)
  }
}

export default api
