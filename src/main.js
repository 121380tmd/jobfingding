import Vue from "vue"
import App from "./App.vue"
// 基础样式
import "@/style/reset.less"
import "@/style/common-style.less"
import ElementUI from 'element-ui'
import * as echarts from 'echarts/core';
// 引入柱状图图表，图表后缀都为 Chart
import { BarChart,LineChart } from 'echarts/charts';
import {
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  // BarChart,
  // CanvasRenderer
} from 'echarts/components';
import { LabelLayout, UniversalTransition } from 'echarts/features';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers';
// import { BarChart } from 'echarts/charts';
echarts.use([
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  CanvasRenderer,
  LabelLayout,
  UniversalTransition,
  LineChart
]);
import {
  Popover,
  ActionSheet,
  Cell,
  Cascader,
  Picker,
  Form,
  Field,
  Popup
} from 'vant';
import 'vant/lib/index.css';
import {
  Message,
  Button as AButton,
  Menu,
  Icon,
  FormModel,
  Input,
  Layout,
  Dropdown,
  ConfigProvider,
  Popconfirm,
  Modal,
  Spin,
  Select,
  Switch,
} from "ant-design-vue" // 按需引入 ant-design-vue 组件


import { Step, Steps, Table, Button, Tag, Empty, Tooltip } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// svg-icon
import "@/icons"

import router from "./router"
import store from "./store"

Vue.use(Tooltip)
Vue.use(Empty)
Vue.use(Tag)
Vue.use(AButton)
Vue.use(Field)
Vue.use(Popup)
Vue.use(Form)
Vue.use(Step)
Vue.use(Steps)
Vue.use(Popover)
Vue.use(ActionSheet)
Vue.use(Cell)

Vue.use(Button)
Vue.use(Menu)
Vue.use(Icon)
Vue.use(ElementUI)
Vue.use(FormModel)
Vue.use(Input)
Vue.use(Layout)
Vue.use(Dropdown)
Vue.use(Table)
Vue.use(ConfigProvider)
Vue.use(Popconfirm)
Vue.use(Modal)
Vue.use(Spin)
Vue.use(Select)
Vue.use(Switch)
Vue.use(Picker)
Vue.use(Cascader)
Vue.config.productionTip = false
Vue.prototype.$message = Message
Vue.prototype.$echarts = echarts

// eslint-disable-next-line vue/require-name-property
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
