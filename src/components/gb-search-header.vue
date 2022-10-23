<template>
  <div class="search-header">
    <gb-dynamic-form
      class="search-items"
      ref="searchForm"
      layout="inline"
      :form-items-config="searchItemsConfig"
      :custom-submit="searchFormSubmit"
    ></gb-dynamic-form>
    <div class="search-box" @click="handleSearch">
      <slot name="searchButton">
        <a-button type="primary">搜索</a-button>
      </slot>
    </div>
  </div>
</template>

<script>
import GbDynamicForm from "@/components/gb-dynamic-form"
export default {
  name: "GbSearchHeader",
  components: { GbDynamicForm },
  props: {
    searchItemsConfig: {
      type: Array,
      default() {
        return [{
          tag: "a-input",
          label: "a-input",
          key: "name",
          defaultValue() {
            return ""
          },
          attributes: {
            allowClear: true
          }
        }]
      }
    }
  },
  data() {
    return {
      params: {}
    }
  },
  watch: {
    searchItemsConfig: {
      handler(newVal) {
        if (newVal) {
          newVal.forEach(item => {
            if (item.defaultValue) {
              this.params[item.key] = item.defaultValue()
            } else {
              this.params[item.key] = null
            }
          })
        }
      }
    }
  },
  methods: {
    searchFormSubmit(form) {
      this.$emit("search", { ...form })
    },
    handleSearch() {
      this.$refs.searchForm.submit()
    }
  }
}
</script>

<style lang="less" scoped>
.search-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.5);
  padding: 10px;
  margin-bottom: 10px;
}
.search-items {
  /deep/ .ant-form {
    &.ant-form-inline .ant-form-item {
      .ant-col  {
        width: auto;
      }
    }
    .ant-select {
      width: 100px;
    }
  }
}
.search-box {
  margin-left: 20px;
}
</style>
