import store from "@/store"

function checkPermission(role, roles = store.getters.roles) {
  let hasPermission = false
  if (roles) {
    hasPermission = role.some(item => roles.includes(item))
  }
  return hasPermission
}
// 自定义之类
const permission = {
  install(Vue) {
    Vue.directive("permission", {
      inserted: function(el, binding) {
        const { value } = binding
        if (value && value instanceof Array) {
          if (value.length > 0) {
            const hasPermission = checkPermission(value)
            if (!hasPermission) {
              el.parentNode && el.parentNode.removeChild(el)
            }
          }
        } else {
          throw new Error(`need roles! Like v-permission="['admin','editor']"`)
        }
      },
    })
    Vue.prototype.$permission = checkPermission
  },
}

export { permission, checkPermission }
