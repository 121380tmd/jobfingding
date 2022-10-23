<template>
  <a-layout>
    <a-layout-sider class="side-layout" :class="{ collapsed: collapsed }" v-model="collapsed" :trigger="null"
      collapsible>
      <!-- 123123 -->
      <div class="logo">
        <img src="../assets/images/logo.png" alt="" width="50px" height="50px">
        {{ logoText }}
      </div><br><br>

      <layout-side-menu></layout-side-menu>
    </a-layout-sider>
    <a-layout class="layout-main-container">
      <a-layout-header style="background: #fff;">
          <div class="icon">
            <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'"
              @click="() => collapsed = !collapsed" />
          </div>
          <div class="dropdown">
            <layout-user></layout-user>
          </div>

      </a-layout-header>
      <a-layout-content :style="{ padding: '24px', background: 'rgb(241,243,245)', minHeight: '280px'}" class="content">
        <router-view></router-view>
      </a-layout-content>
      <a-layout-footer>Footer</a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
import LayoutSideMenu from "@/layouts/components/layout-side-menu"
import LayoutUser from "@/layouts/components/layout-user"
import { mapGetters } from "vuex"
export default {
  name: "Default",
  components: { LayoutUser, LayoutSideMenu },
  data() {
    return {
      collapsed: false,
    }
  },
  computed: {
    ...mapGetters(["userInfo"]),
    logoText() {
      if (this.collapsed) {
        return this.userInfo.name.slice(0, 1)
      } else {
        return this.userInfo.name
      }
    }
  }
}
</script>
<style lang="less" scoped>
.trigger {
  font-size: 18px;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: @primary-color;
  }
}

.logo {
  height: 32px;
  margin: 16px;
  text-align: center;
  line-height: 32px;
  font-size: 20px;
  font-weight: bold;
  color: #ffffff;
}

.side-layout {
  height: 100vh;

  // &.collapsed {}
}

.ant-layout-header{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .icon{
    width: 50%;
    display: flex;
    align-items: center;
    // background: red;
  }
  .dropdown{
    width: 50%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    // background: #000;
  }
}

.layout-main-container {
  .content {
    max-height: calc(100vh - 126px);
    overflow: auto;
  }
}
</style>
