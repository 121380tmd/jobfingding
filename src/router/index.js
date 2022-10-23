import Vue from "vue"
import Router from "vue-router"
import routes from "./routes"
import store from "../store"
import { createRouterLayout } from "vue-router-layout"
import { checkPermission } from "@/utils/permission"

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

/**
 * 路由文件 ./routers.js 通过pages文件夹中文件结构自动生成，在路由组件中添加以下内容即可配置路由额外参数
 * <route>
 * {
 *   "name": "test", // 路由名，会覆盖掉默认路由名
 *   "meta": {
 *     "requiresAuth": true, // 是否需要验证权限
 *     "invisible": true,   // 是否显示在菜单栏
 *     // icon 值优先于 svgIcon， 两个都设置只取 icon 忽略 svgIcon
 *     "icon": "home",   // a-icon 图标 type 值， antd自带默认图标
 *     "svgIcon": "home"  // svg-icon 组件 name 值, 自定义svg图标，相关svg文件存放在 icons/svg 中，通过 vue.config.js 配置后自动引入，直接使用即可
 *   }
 * }
 * </route>
 */

Vue.use(Router)


// //解决vue路由重复导航错误
// //获取原型对象上的push函数
// const originalPush = Router.prototype.push
// //修改原型对象中的push方法
// Router.prototype.push = function push(location) {
//    return originalPush.call(this, location).catch(err => err)
// }



const RouterLayout = createRouterLayout(layout => {
  return import("@/layouts/" + layout + ".vue")
})



const router = new Router({
  mode: "hash",
  base: process.env.VUE_APP_PUBLIC_PATH,
  routes: [
    {
      path: "*",
      redirect: {
        name: "not-found",
      },
    },
    {
      path: "/",
      name: "formdate",
      component: () => import("@/pages/__form__/formdate"),
    },

    {
      path: "/admin",
      name: "admin",
      component: RouterLayout,
      children: routes,
    },


  ],
})

// 白名单
const whiteList = [
  "login",
  "not-found",
  "svg",
  "formdate",
]

const devRoutes = [
  {
    path: "/svg",
    name: "svg",
    component: () => import("@/icons/svg-example"),
  }
]
if (process.env.NODE_ENV === "development") {
  devRoutes.forEach(i => {
    router.addRoute(i)
  })
}

router.beforeEach((to, from, next) => {
  const logged = store.getters.logged
  if (logged) {
    if (to.meta?.permission) {
      if (checkPermission(to.meta.permission)) {
        next()
      } else {
        // 无权限默认跳转到可访问页面
        next("/")
      }
    }
    next()
  } else {
    if (whiteList.includes(to.name)) {
      next()
    } else {
      next({ name: "login", query: { redirect: to.fullPath } })
    }
  }
})

export default router
