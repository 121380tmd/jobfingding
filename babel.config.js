const _mode = process.env.NODE_ENV
const isProd = _mode === "production"
const prodPlugin = []
if (isProd) {
  // 如果是生产环境，则自动清理掉打印的日志，但保留error 与 warn
  prodPlugin.push([
    "transform-remove-console",
    {
      // 保留 console.error 与 console.warn
      exclude: [ "error", "warn" ],
    }
  ])
}
module.exports = {
  presets: [
    "@vue/cli-plugin-babel/preset"
  ],
  plugins: [
    ...prodPlugin,
    [
      "import",
      { libraryName: "ant-design-vue", libraryDirectory: "es", style: true }
    ]
  ],
}
