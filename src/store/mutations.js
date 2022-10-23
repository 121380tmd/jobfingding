import { setLocalStorage } from "@/utils/tools.local-storage"

export default {
  setUserInfo(state, payload) {
    const { LOCAL_STORAGE_USER_INFO_KEY } = require("@/constant/config")
    setLocalStorage(LOCAL_STORAGE_USER_INFO_KEY, payload)
    state.userInfo = payload
  },
}
