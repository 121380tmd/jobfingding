import { getLocalStorage } from "@/utils/tools.local-storage"
const { LOCAL_STORAGE_USER_INFO_KEY } = require("@/constant/config")

export default {
  userInfo: getLocalStorage(LOCAL_STORAGE_USER_INFO_KEY) || null,
}
