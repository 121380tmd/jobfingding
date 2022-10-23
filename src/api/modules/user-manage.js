import { METHOD } from "@/api/config"

export default {
  queryUser: {
    method: METHOD.POST,
    url: "/api/manager/user/queryUser",
  },
  deleteUsers: {
    method: METHOD.DELETE,
    url: "/api/manager/user/delUsers",
  },
  userSave: {
    method: METHOD.POST,
    url: "/api/manager/user/userSave",
  },
  userUpdate: {
    method: METHOD.PUT,
    url: "/api/manager/user/userUpdate",
  },
}
