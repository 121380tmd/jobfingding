import api from "@/api"
import { removeLocalStorage } from "@/utils/tools.local-storage"
import router from "@/router"
import { LOCAL_STORAGE_USER_INFO_KEY } from "@/constant/config"
import { Message, Modal } from "ant-design-vue"

export default {
  logout({ state, getters }, { confirm = true, promptMessage = true } = {}) {
    const out = () => {
      const clearUserInfo = () => {
        state.userInfo = null
        removeLocalStorage(LOCAL_STORAGE_USER_INFO_KEY)
      }
      const token = getters.token
      if (token) {
        api.logout().then(({ msg }) => {
          if (promptMessage) {
            Message.success(msg)
          }
          clearUserInfo()
          router.push({ name: "login" })
        }).catch(e => {
          console.error(e)
          clearUserInfo()
          router.push({ name: "login" })
        })
      } else {
        clearUserInfo()
        router.push({ name: "login" })
      }
    }
    if (confirm) {
      Modal.confirm({
        title: "退出登录",
        content: "确认登出",
        okText: "确认",
        cancelText: "取消",
        onOk() {
          out()
        },
      })
    } else {
      out()
    }
  }
}
