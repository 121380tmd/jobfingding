## 项目依赖包安装 ，推荐使用 yarn
```
yarn | npm i
```

### 开发版编译
```
yarn serve | npm run serve
```

### 正式版编译
```
yarn build  | npm run build
```

### 线上测试版编译
```
yarn build-test
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## 目录结构
```
├── README.md                               # 参考文档
├── babel.config.js                         # babel 相关配置
├── jsconfig.json
├── package.json                            # 依赖包文件
├── public
│ ├── favicon.ico
│ └── index.html
├── src                                     # 项目文件夹
│ ├── App.vue                               # 入口页面
│ ├── api                                   # api相关配置
│ │ ├── config.js                           # api请求拦截器配置
│ │ ├── index.js                            # api配置文件转换为请求函数
│ │ ├── merge-api.js                        # 整合 ./modules 中的api配置为单个文件
│ │ └── modules                             # api配置文件夹
│ ├── assets                                # 静态资源文件夹
│ │ └── images                              # 图片资源文件夹
│ ├── components                            # 全局公用组件, 需手动引入
│ ├── constant                              # 全局js常量
│ │ └── config.js
│ ├── icons                                 # svg图标 使用方法 <svg-icon name="文件名"></svg-icon>
│ │ ├── color-svg                           # 有色svg图标存放文件夹，编译压缩不会剔除颜色相关属性
│ │ ├── svg                                 # 单色svg图标存放文件夹，编译压缩会剔除颜色相关属性，使用css定义颜色
│ │ ├── svg-example.vue                     # svg图标使用示例
│ │ ├── svg-icon.vue                        # 需要在main.js 全局注册的 svg-icon 组件
│ │ ├── svg-view.js                         # 相关逻辑
│ │ └── svgo.yml                            # svgo 相关配置
│ ├── layouts                               # 布局相关文件夹
│ │ ├── components                          # 布局相关组件
│ │ ├── default.vue                         # 默认布局
│ │ └── layout-blank.vue                    # 其他布局, 在vue组件装使用 layout: 'layout-blank' 即可修改当为当前布局
│ ├── main.js                               # 入口文件
│ ├── pages                                 # 视图页面，会根据此文件夹结构自动生成路由文件
│ ├── router                                # 路由相关文件夹
│ │ ├── index.js                            # 路由相关全局配置
│ │ └── routes.js                           # 根据 /pages 文件结构自动生成的路由文件
│ ├── store                                 # store相关配置
│ │ ├── actions.js                          # store actions
│ │ ├── getters.js                          # store getters
│ │ ├── index.js                            # 整合 state、getters、actions、mutations及相关配置
│ │ └── mutations.js                        # store mutations
│ │ ├── state.js                            # store state
│ ├── style                                 # 全局样式相关文件夹
│ │ ├── common-style.less                   # 常用全局样式
│ │ ├── global-constant.less                # 全局less常量
│ │ ├── reset.less                          # 初始化样式，消除html默认样式
│ │ └── un-reset.less                       # 逆初始化样式， 还原html默认样式
│ └── utils  # 公用方法
│     ├── permission.js                     # 权限相关
│     ├── tools.common.js                   # 共有函数
│     ├── tools.file.js                     # 文件操作相关
│     └── tools.local-storage.js            # 本地化存储相关
├── vue.config.js                           # 项目配置
```
## 路由生成逻辑参考
[说明文档](https://www.npmjs.com/package/vue-cli-plugin-auto-routing)
## 文件夹、组件命名规范，组件结构规范
### pages 文件夹
> 命名规范参考 [说明文档](https://www.npmjs.com/package/vue-cli-plugin-auto-routing)
> pages 文件接口会用来生成默认路由 /router/routes.js, 非路由文件及文件夹使用 __文件/文件夹__ 命名, 动态路由使用 _文件名 命名
例如：
```
pages/
├── __partial__.vue
├── index.vue
├── users.vue
└── users/
    └── _id.vue
```
生成的对应路由为
```javascript
export default [
  {
    name: 'index',
    path: '/',
    component: () => import('@/pages/index.vue')
  },
  {
    name: 'users',
    path: '/users',
    component: () => import('@/pages/users.vue'),
    children: [
      {
        name: 'users-id',
        path: ':id?',
        component: () => import('@/pages/users/_id.vue')
      }
    ]
  }
]
```

### 其他文件夹
1.文件夹
> 文件夹名称应统一格式，小写开头,中横线“-”分隔，见名思意，文件夹名称统一按照项目结构目录命名规范统一命名。
2.组件

>组件名命名方式采用大驼峰命名

>组件应该都放到components文件夹下

3.基础组件

> 页面级组件应该放到相对应页面文件夹下，home.vue 相关组件放到 __home__ 文件夹中,以免被生成到路由中 
> 比如一些组件只有这个页面用到，其他地方没有用到的，可以直接放到页面文件夹，然后以父组件开头命名，例如：home-header.vue,home-nav.vue。

4.组件结构

> 组件结构遵循从上往下template，script，style的结构。

## Template模板文件

1.尽量使用以.vue结束的单文件组件，方便管理，结构清晰。

2.样式class的命名：统一以小写字母开头，小写字母、横杠和数字组成。命名中尽量避免使用中文拼音，应该采用更简明有语义的英文单词进行组合。不建议使用驼峰法命名class属性。

3.多特性，分行写，提高可读性。即一个标签内有多个属性，属性分行写。

## Script

在script标签中，你应该遵守 Js 的规范和ES6规范。

1. 组件名称：必须以小写字母开头中横线“-”分隔命名。

2. Props定义：提供默认值，使用type属性校验类型，使用props之前先检查prop是否存在

3. 调试信息 console.log() debugger使用完及时删除。

4. 使用计算属性规避v-if和v-for同时使用，使用计算属性过滤数据。

5. 无特殊情况不允许使用原生API操作dom,谨慎使用this.$refs直接操作dom。

## Style

1.避免使用标签选择器（效率低、损耗性能）。

2.非特殊情况下，禁止使用 ID 选择器定义样式。有 JS 逻辑的情况除外。

3.CSS 属性书写顺序：先决定定位宽高显示大小，再做局部细节修饰！推荐顺序：定位属性(或显示属性，display)->宽高属性->边距属性(margin, padding)->字体，背景，颜色等，修饰属性的定义。

## 注释规范

1.HTML注释

>`<!--注释内容-->`

2.CSS注释

>/* write your HTML comment! */

3.JS注释

- 行级注释（注意//后面空格）：`// 正确的注释`
- 变量声明注释：如果是在类似 Vue 项目的 data 属性中的变量，直接用行级样式跟在后面。  
  例如：`rightExample: 'yes', // 注释直接写这里`
- 如果是在类，构造函数，或者常量定义中的变量，使用块级注释。  
  例如：
  ```
   /**
  * @description: 方法描述
  * @param {参数类型} 参数名称
  * @param {参数类型} 参数名称
  * @return 没有返回信息写 void / 有返回信息 {返回类型} 描述信息
  */
  
  /**
  * 这是变量
  * @type {number}
  */
  ```
## Store

1.应用层级的状态应该集中到单个 store 对象中。

2.常量值全部用大写+英文单词配合下划线的形式：例如：`UPDATE_USERINFO`

3.提交 mutation 是更改状态的唯一方法，并且这个过程是同步的。

4.异步逻辑都应该封装到 action 里面。

## Route

1.路由至少包含三个选项：path、name、component。path统一小写单词用横杠`-`连接；name对应于组件中的name，大写开头驼峰；component组件名称小写写开头的组件驼峰。

## api管理

1.api根据项目功能目录结构命名存放在modules目录下,名字和功能模块名称对应,使用小驼峰命名。

2. 一般不提交api config文件，功能改动除外

3. 使用示例
```javascript
  const params = {a: 1}
  // apiConfig 一般不传，需要在不同场景修改api处理行为才需要修改
  const apiConfig = {
    requestDataType: REQUEST_DATA_TYPE.PARAMS, // 不配置默认为axios的get请求为params传参方式，其他请求为data传参方式
    userInterceptors: true, // 不配置默认为true, 是否使用拦截器处理异常
    autoAlertErrorMessage: true, // 不配置默认为true, 此字段配置"interceptors: true" 才有效, 遇到错误时是否自动弹窗提示错误信息（使用antd Message.warning 组件）
  }
  // 使用此方式会自动调用 this.$message 弹出请求报错或请求成功信息，要修改此默认行为，在请求时传入相应的 apiConfig或者在定义api时配置即可
 api.apiName(params, apiConfig).then((data)=> {console.log(data)})
```
