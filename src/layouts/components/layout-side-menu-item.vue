<template>
  <span class="layout-side-menu-item">
    <a-icon v-if="icon" :type="icon"></a-icon>
    <svg-icon class="anticon" v-else-if="svgIcon" :name="svgIcon"></svg-icon>
    <span>{{ title}}</span>
  </span>
</template>

<script>
export default {
  name: "LayoutSideMenuItem",
  props: {
    title: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "crown",
    },
    svgIcon: {
      type: String,
      default: "",
    },
  },
}
</script>

<style lang="less" scoped>
.layout-side-menu-item {
  text-align: center;
}
</style>
