<template>
  <a-menu
    :default-selected-keys="defaultSelectedKeys"
    mode="inline"
    theme="dark"
    :default-open-keys="defaultOpenKeys"
  >
    <template v-for="route of routes.filter(item=>item?.meta?.invisible !== false)">
      <a-sub-menu v-if="route.children" :key="route.name">
        <layout-side-menu-item
          slot="title"
          :title="route?.meta?.title || route.name"
          :icon="route?.meta?.icon"
          :svg-icon="route?.meta?.svgIcon"
        ></layout-side-menu-item>
        <a-menu-item
          v-for="childRoute of route.children.filter(item=>item?.meta?.invisible !== false)"
          :key="childRoute.name"
          @click.capture="routerTo(childRoute)"
        >
          <layout-side-menu-item
            :title="childRoute?.meta?.title || childRoute.name"
            :icon="childRoute?.meta?.icon"
            :svg-icon="childRoute?.meta?.svgIcon"
          ></layout-side-menu-item>
        </a-menu-item>
      </a-sub-menu>
      <!-- :key="route.name" -->
      <a-menu-item
        
        @click="routerTo(route)"
        v-else
      >
        <layout-side-menu-item
          :title="route?.meta?.title || route.name"
          :icon="route?.meta?.icon"
          :svg-icon="route?.meta?.svgIcon"
        ></layout-side-menu-item>
      </a-menu-item>
    </template>
  </a-menu>
</template>

<script>
import routes from "@/router/routes"
import LayoutSideMenuItem from "@/layouts/components/layout-side-menu-item"
export default {
  name: "LayoutSideMenu",
  components: { LayoutSideMenuItem },
  data() {
    return {
      routes,
    }
  },
  computed: {
    defaultSelectedKeys() {
      return [this.$route.name]
    },
    defaultOpenKeys() {
      const keys = []
      // console.log(this.$route?.matched?.length,'12313')
      // if (this.$route?.matched?.length > 2) {
      //   for (let i = 1; i < this.$route.matched.length - 1; i++) {
      //     keys.push(this.$route.matched[i].name)
      //   }
      // }
      // console.log(keys)
      return keys
    },
  },
  created() {
    // console.log("routes = ", routes)
  },
  methods: {
    routerTo(route) {
      // console.log("route = ", route.name)
      // console.log("this.$route.name = ", this.$route.name)
      if (route.name !== this.$route.name) {
        this.$router.push({ name: route.name })
      }
    }
  }
}
</script>

<style>
.ant-menu-inline-collapsed > .ant-menu-submenu > .ant-menu-submenu-title {
  text-align: center;
}
</style>
