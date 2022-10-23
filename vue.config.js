// const { defineConfig } = require('@vue/cli-service')
const resolve = (relativePath) => {
  const path = require("path")
  return path.resolve(__dirname, relativePath)
}
const CompressionWebpackPlugin = require("compression-webpack-plugin")
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)$/i
const _mode = process.env.NODE_ENV
const isProd = _mode === "production"

// 代理配置
const { VUE_APP_API_PROXY_PREFIX, VUE_APP_API_BASE_URL } = process.env
const proxy = {}
if (VUE_APP_API_PROXY_PREFIX) {
  const pathRewrite = {}
  pathRewrite[`^${ VUE_APP_API_PROXY_PREFIX }`] = ""
  proxy[VUE_APP_API_PROXY_PREFIX] = {
    target: VUE_APP_API_BASE_URL,
    changeOrigin: true,
    pathRewrite: pathRewrite,
  }
}

module.exports = {
  productionSourceMap: false,
  assetsDir: "assets",
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  devServer: {
    // overlay: {
    //   warnings: false, //不显示警告
    //   errors: false //不显示错误
    // },
    proxy: proxy,
  },
  lintOnSave: false, //关闭eslint检查
  css: {
    extract: !!isProd, // 解决开发模式，打包时未提取CSS的问题, 开发模式下关闭，否则css无法热更新
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            "primary-color": "@--primary-color", // @primary-color 为 global-constant.less 中的常量
          },
          math: "always", // 4.x.x 兼容 3.x.x 版本
          javascriptEnabled: true,
        },
      },
    },
  },
  chainWebpack: config => {
    // 自动引入svg图标雪碧图
    config.module.rule("svg")
      .exclude.add(resolve("src/icons")).end() // icons 文件夹不走 vue-cli 默认的图标处理
    // 无色图标，可以自定义颜色
    config.module.rule("icons") // 自定义icons规则
      .test(/\.svg$/)
      .include.add(resolve("src/icons/svg"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      }).end()
      .use("svgo-loader")
      .loader("svgo-loader").options({
        plugins: [
          {
            name: "removeAttrs",
            params: {
              attrs: [ "fill", "fill-rule" ], // 删除 svg 图标的 fill 和 fill-rule 就可以通过css改变颜色
            },
          }
        ],
      }).end()
    // 有色图标
    config.module.rule("color-icons") // 自定义有色icons规则
      .test(/\.svg$/)
      .include.add(resolve("src/icons/color-svg"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      }).end()
      .use("svgo-loader")
      .loader("svgo-loader")
    // Enable Optional Chaining(?.), Nullish Coalescing(??) and many new ES syntax for Vue.js SFC
    config.module
      .rule("vue")
      .use("vue-loader")
      .tap(options => {
        options.compiler = require("vue-template-babel-compiler")
        return options
      })
  },
  configureWebpack: config => {
    // 生产环境下将资源压缩成gzip格式
    if (isProd) {
      // add `CompressionWebpack` plugin to webpack plugins
      config.plugins.push(new CompressionWebpackPlugin({
        algorithm: "gzip",
        test: productionGzipExtensions,
        threshold: 10240,
        minRatio: 0.8,
        deleteOriginalAssets: false,
      }))
    }
  },
  // 加载全局less常量
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [resolve("src/style/global-constant.less")],
    },
    autoRouting: {
      // chunkNamePrefix: "page-",
      outFile: "src/router/routes.js",
    },
  },
}
