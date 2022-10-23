<template>
  <div class="container">
    <div v-for="i in svgList" :key="i" style="display: inline-block;" @click="handleCopy(i)">
      <svg-icon :name="i" />
      <div>{{ i }}</div>
    </div>
    <input ref="text" :value="text" type="text" style="position:absolute;z-index: -100;left: 0;top: 0;">
  </div>
</template>

<script>
export default {
  name: "SvgExample",
  data() {
    return {
      svgList: [],
      text: "",
    }
  },
  created() {
    this.svgList = require.context("./svg", false, /.svg$/).keys().map(i => {
      return i.replace(/(^\.\/)|(\.svg$)/g, "")
    }).concat(require.context("./color-svg", false, /.svg$/).keys().map(i => {
      return i.replace(/(^\.\/)|(\.svg$)/g, "")
    }))
  },
  methods: {
    handleCopy(name) {
      this.text = `<svg-icon name="${ name }" />`
      this.$nextTick(() => {
        this.$refs.text.focus()
        this.$refs.text.select()
        document.execCommand("copy")
        alert("复制成功")
      })
    },
  },
}
</script>

<style lang="less" scoped>
.container {
  background: #F2F2F2;
  div {
    text-align: center;
  }
}
.svg-icon {
  width: 40px;
  height: 40px;
  margin: 10px;
}
</style>
