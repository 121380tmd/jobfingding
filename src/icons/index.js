import Vue from "vue"
import SvgIcon from "./svg-icon" // svg组件
import SvgView from "./svg-view"

// 注册到全局
Vue.component("SvgIcon", SvgIcon)

const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context("./svg", false, /\.svg$/)
const reqColor = require.context("./color-svg", false, /\.svg$/)

// requireAll(req)
const iconMap = requireAll(req)
const iconColorMap = requireAll(reqColor)

SvgView.generate(iconMap.concat(iconColorMap))
