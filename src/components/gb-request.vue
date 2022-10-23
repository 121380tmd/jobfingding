<template>
  <div>
    <slot name="dataScope" :data="data" :loading="loading"/>
  </div>
</template>

<script>
export default {
  name: "GbRequest",
  props: {
    // axios 请求函数
    apiMethod: {
      type: Function,
      default() {
        // import api from "@/api"
        // return api.apiName
      },
    },
    defaultData: {
      type: [ String, Object, Array, Boolean ],
      default() {
        return {}
      }
    },
    queryParams: {
      type: Object,
      default() {
        return {}
      },
    },
    getDataFromRes: {
      type: Function,
      default: (data) => {
        return data || null
      },
    },
  },
  data() {
    return {
      data: null,
      loading: false,
    }
  },
  watch: {
    apiMethod: {
      handler(newVal) {
        if (newVal) {
          this.getData()
        }
      },
      immediate: true,
    },
    queryParams: {
      handler(newVal) {
        if (newVal) {
          this.reloadData()
        }
      },
      deep: true,
      immediate: false,
    },
  },
  methods: {
    getData() {
      this.loadingChange(true)
      this.apiMethod(this.queryParams).then((data) => {
        this.data = this.getDataFromRes(data) || this.defaultData
        this.loadingChange(false)
        this.$emit("getData", this.data)
      }).catch(e => {
        console.error(e)
      })
    },
    reloadData() {
      this.getData()
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
