export default {
  userInfo: (state) => {
    console.log(state.userInfo)
    return state.userInfo || {}
  },
  token: (state, getters) => {
    return getters.userInfo?.token
  },
  // 是否已登录
  logged: (state, getters) => {
    return !!getters.token
  },
}
