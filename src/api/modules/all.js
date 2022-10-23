import { METHOD } from "@/api/config"

export default {
  logout: {
    method: METHOD.POST, // 请求方式（必填项）
    url: "/api/manager/logout", // 请求接口相对地址（必填项）
    // requestDataType: REQUEST_DATA_TYPE.PARAMS, // 不配置默认为axios的get请求为params传参方式，其他请求为data传参方式
    userInterceptors: false, // 不配置默认为true, 是否使用拦截器处理异常
    // autoAlertErrorMessage: true, // 不配置默认为true, 此字段配置"interceptors: true" 才有效, 遇到错误时是否自动弹窗提示错误信息（使用antd Message.warning 组件）
  },
  login: {
    method: METHOD.POST,
    url: "/api/manager/login",
  },
  getCode: {
    method: METHOD.GET,
    url: "/api/manager/getCode",
  },
  upload: {
    method: METHOD.POST,
    url: "/api/upload",
  },
  //图片上传
  uploadImg: {
    method: METHOD.POST,
    url: "/api/manager/file/uploadImg",
  },
  //获取社区信息
  getCommunityInf: {
    method: METHOD.GET,
    url: "/api/web/getAreaList",
  },
  //
  checkAdressId: {
    method: METHOD.POST,
    url: "/api/web/check",
  },
  //查询社区列表
  getCommunityList: {
    method: METHOD.GET,
    url: "​/api​/manager​/area​/searchByKey",
  },
  getJob: {
    method: METHOD.POST,
    url: '/api/web/getJobTree'
  },
  //Web提交表单
  webSubmit: {
    method: METHOD.POST,
    url: "/api/web/post"
  },
  //获取社区列表
  getCLista: {
    method: METHOD.GET,
    url: "/api/manager/area/getAreaList"
  },
  //获取填报列表
  getFormList: {
    method: METHOD.GET,
    url: "/api/manager/form/getFormList"
  },
  //查询角色列表
  queryRole: {
    method: METHOD.POST,
    url: "​/api​/manager​/role​/queryRole"
  },
  //获取职业信息列表
  getAdminList: {
    method: METHOD.GET,
    url: "/api/manager/job/getAdminList"
  },
  //获取用户信息列表
  getList: {
    method: METHOD.GET,
    url: "/api/manager/user/getList"
  },
  //添加社区
  addCommunity: {
    method: METHOD.POST,
    url: "/api/manager/area/addCommunity"
  },
  //修改社区名
  modifyCommunity: {
    method: METHOD.POST,
    url: "/api/manager/area/modify"
  },
  //删除社区
  delArea: {
    method: METHOD.POST,
    url: "/api/manager/area/delArea"
  },
  //搜索社区信息
  searchByKey: {
    method: METHOD.GET,
    url: "/api/manager/area/searchByKey"
  },
  //搜索填报信息
  searchFillByKey: {
    method: METHOD.GET,
    url: "/api/manager/form/searchByKey"
  },
  //修改填报信息
  modifyFill: {
    method: METHOD.POST,
    url: "/api/manager/form/modify"
  },
  //删除填报信息
  delForm: {
    method: METHOD.POST,
    url: "/api/manager/form/delForm"
  },
  //回收填报信息
  recall: {
    method: METHOD.POST,
    url: "/api/manager/form/recall"
  },
  //获取回收信息
  getrecall: {
    method: METHOD.GET,
    url: "/api/manager/form/getLessFormList"
  },
  //添加职业信息
  addJob: {
    method: METHOD.POST,
    url: "/api/manager/job/add"
  },
  //添加职业信息
  addJobClassfy: {
    method: METHOD.POST,
    url: "/api/manager/job/addJobClassfy"
  },
  //获取职业信息分类
  getClassFyList: {
    method: METHOD.GET,
    url: "/api/manager/job/getClassFyList"
  },
  //修改职业名称
  modifyJobName: {
    method: METHOD.POST,
    url: "/api/manager/job/modifyJobName"
  },
  //修改分类名称
  modifyClassFy: {
    method: METHOD.POST,
    url: "/api/manager/job/modifyClassFy"
  },
  //重置用户密码
  resetPassWord: {
    method: METHOD.POST,
    url: "/api/manager/user/resetPassWord"
  },
  //登录
  // login: {
  //   method: METHOD.POST,
  //   url: "​/api​/manager​/login"
  // },
  //获取验证码
  getCode: {
    method: METHOD.GET,
    url: "/api/manager/getCode"
  },
  //用户封禁解禁
  OpenCloseStatus: {
    method: METHOD.POST,
    url: "/api/manager/user/OpenCloseStatus"
  },
  //修改密码
  modifyPassWord: {
    method: METHOD.POST,
    url: "/api/manager/user/modifyPassWord"
  },


}



