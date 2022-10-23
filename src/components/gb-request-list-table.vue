<template>
  <gb-request-list
    :api-method="apiMethod"
    :extra-params="extraParams"
    :page-num="pageParams.pageNum"
    :page-size="pageParams.pageSize"
    ref="requestList"
    :get-list-data-from-res="getListDataFromRes"
    @getPageParams="setPageParams"
    @getLoading="$emit('getLoading', $event)"
    class="request-list"
    :api-config="apiConfig"
  >
    <template #listScope="{listData, loading}">
      <!-- <a-table
        class="table zf-ant-table"
        :columns="columns"
        :data-source="listData"
        :rowKey="tableRowKey"
        :row-selection="rowSelection"
        :pagination="myPagination"
        :loading="loading"
        :custom-row="customRow"
        :row-class-name="rowClassName"
        :scroll="scroll"
      >
        <template slot-scope="text, record, index" :slot="slot" v-for="slot in scopedSlots">
          <slot :name="slot" v-bind="{text, record, index}"></slot>
        </template>
        <template :slot="slot" v-for="slot in slots">
          <slot :name="slot"></slot>
        </template>
      </a-table> -->
    </template>
  </gb-request-list>
</template>

<script>
import GbRequestList from "@/components/gb-request-list"

export default {
  name: "GbRequestListTable",
  components: { GbRequestList },
  props: {
    columns: Array,
    extraParams: Object,
    apiMethod: Function,
    rowSelection: Object,
    customRow: Function,
    rowClassName: Function,
    apiConfig: Object,
    tableRowKey: {
      type: String,
      default: undefined, // id
      required: true,
    },
    orderNumberColumn: {
      type: Boolean,
      default: false,
    },
    scroll: {
      type: Object,
      default() {
        return { x: 1500, y: 650 }
      },
    },
    pagination: {
      type: [ Boolean, Object ],
      default() {
        return {}
      },
    },
    getListDataFromRes: {
      type: Function,
      default: undefined,
    }
  },
  data() {
    return {
      pageParams: {
        pageNum: 1,
        pageSize: 10,
        total: 1,
      },
    }
  },
  computed: {
    slots() {
      return Object.keys(this.$slots)
    },
    scopedSlots() {
      return Object.keys(this.$scopedSlots)
    },
    myPagination() {
      if (this.pagination) {
        return {
          size: "small",
          current: this.pageParams.pageNum,
          pageSize: this.pageParams.pageSize,
          total: this.pageParams.total,
          showSizeChanger: true,
          showLessItems: true,
          showQuickJumper: true,
          showTotal: (total) => `共 ${ total } 条`,
          onChange: this.onPageChange,
          onShowSizeChange: this.onSizeChange,
          ...this.pagination,
        }
      } else {
        return false
      }
    },
  },
  methods: {
    setPageParams(pageParams) {
      this.pageParams = pageParams
      this.$emit("getPageParams", pageParams)
    },
    onSizeChange(current, pageSize) {
      this.pageParams.pageNum = 1
      this.pageParams.pageSize = pageSize
    },
    onPageChange(pageNum, pageSize) {
      this.pageParams.pageNum = pageNum
      this.pageParams.pageSize = pageSize
    },
    reloadList() {
      this.$refs.requestList.reloadList()
    },
  },
}
</script>

<style lang="less" scoped>
.table {
  background: #ffffff;
  /deep/ .ant-table-pagination {
    padding: 0 10px;
  }
}
// .request-list {
// }
</style>
