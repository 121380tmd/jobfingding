<template>
  <div>
    <slot name="listScope" :listData="listData" :pageParams="pageParams" :loading="loading"/>
  </div>
</template>

<script>
const DEFAULT_PAGE_SIZE = 10
export default {
  name: "GbRequestList",
  props: {
    // axios 请求函数
    apiMethod: {
      type: Function,
      default() {
        // import api from "@/api"
        // return api.apiName
      },
    },
    extraParams: {
      type: Object,
      default() {
        return {}
      },
    },
    getListDataFromRes: {
      type: Function,
      default: (data) => {
        return data?.list || []
      },
    },
    getPageParams: {
      type: Function,
      default: (data) => {
        const { pageNum = 1, pages = 1, size = 10, total = 0, pageSize = 10 } = data || {}
        // size 当前页数量
        return {
          pageNum,
          pages,
          size,
          total,
          pageSize,
        }
      },
    },
    pageNum: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: DEFAULT_PAGE_SIZE,
    },
    apiConfig: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      pageParams: {
        pageNum: 1,
        pageSize: DEFAULT_PAGE_SIZE,
        pages: 0,
        total: 0,
      },
      listData: [],
      loading: false,
    }
  },
  computed: {
    queryParams() {
      return {
        ...this.extraParams,
        page: this.pageNum, // attention ！！！目前后端请求参数为page 返回参数为pageNum 后续可能修改
        size: this.pageSize,
      }
    },
  },
  watch: {
    apiMethod: {
      handler(newVal) {
        if (newVal) {
          this.getList()
        }
      },
      immediate: true,
    },
    queryParams: {
      handler(newVal) {
        if (newVal) {
          this.reloadList()
        }
      },
      deep: true,
      immediate: false,
    },
  },
  methods: {
    getList() {
      this.loadingChange(true)
      this.apiMethod(this.queryParams, this.apiConfig).then(data => {
        this.listData = this.getListDataFromRes(data)
        this.pageParams = this.getPageParams(data)
        this.loadingChange(false)
        this.$emit("getPageParams", this.pageParams)
        this.$emit("getListData", this.listData)
      }).catch(e => {
        console.error(e)
      })
    },
    reloadList() {
      this.getList()
    },
    loadingChange(val) {
      this.loading = val
      this.$emit("getLoading", this.loading)
    },
  },
}
</script>

<style lang="less" scoped>

</style>
