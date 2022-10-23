<template>
  <div>
    <gb-search-header
      v-if="searchItemsConfig.length"
      :search-items-config="searchItemsConfig"
      @search="extraParams=$event"
    ></gb-search-header>

    <div class="table-options">
      <!-- <a-button type="primary" icon="plus" @click="handleCreate">新增</a-button> -->
    </div>
    <gb-request-list-table
      :api-method="apiListMethod"
      :columns="columns"
      :extra-params="extraParams"
      table-row-key="id"
      :scroll="tableConfig.scroll"
      ref="list"
    >
      <template v-for="item of tableScopedSlotsConfig" :slot="item.customRender" slot-scope="{text, record, index}">
        <span>
          <slot :name="item.customRender" v-bind="{text, record, index}">
            <span v-if="item.customRender === 'orderNumber'">{{index + 1}}</span>
            <span v-else-if="item.customRender === 'options'">
              <!-- <a-button type="primary" @click="handleEdit(record)">编辑</a-button>
              <a-button type="primary" @click="handleDetail(record)">详情</a-button> -->
              <a-popconfirm
                class="option error-color"
                title="是否删除此用户？"
                okText="删除"
                cancelText="取消"
                placement="topRight"
                @confirm="handleDelete(record)"
              >
                <!-- <a-button type="primary">删除</a-button> -->
              </a-popconfirm>
            </span>
            <span v-else>
              {{record[item.key]}}
            </span>
          </slot>
        </span>
      </template>
    </gb-request-list-table>
    <a-modal
      :visible="visible"
      :title="title"
      @ok="handleSubmit"
      :maskClosable="false"
      :destroyOnClose="true"
      @cancel="hideModal"
      centered
    >
      <gb-dynamic-form ref="gbDynamicForm" :form-items-config="formItemsConfig" :key="title"></gb-dynamic-form>
    </a-modal>
  </div>
</template>

<script>
import GbSearchHeader from "@/components/gb-search-header"
import GbRequestListTable from "@/components/gb-request-list-table"
import GbDynamicForm from "@/components/gb-dynamic-form"
export default {
  name: "GbDynamicTableForm",
  components: { GbDynamicForm, GbRequestListTable, GbSearchHeader },
  props: {
    apiListMethod: Function,
    itemsConfig: {
      type: Array,
      default() {
        return [
          {
            key: "name",
            label: "姓名",
            formItemConfig: {
              include: true,
              show: true,
              tag: "a-input",
              attributes: {
                allowClear: true
              }
            },
            columnItemConfig: {
              include: true,
              attributes: {
                align: "center"
              }
            },
            searchItemConfig: {
              show: true,
              include: true,
              attributes: {
                allowClear: true
              }
            }
          }
        ]
      }
    },
    tableConfig: {
      type: Object,
      default() {
        return {
          rowSelection: undefined,
          scroll: {}
        }
      }
    },
    submitConfig: {
      type: Object,
      default() {
        return {
          create: {
            apiMethod: null,
            initFormData: {}
          },
          delete: {
            apiMethod: null,
            getParams(record) {
              return record.id
            }
          }
        }
      }
    }
  },
  data() {
    return {
      extraParams: {},
      visible: false,
      title: "",
      formDisabled: false,
      tableScopedSlotsConfig: [],
      columns: [],
      searchItemsConfig: [],
      formItemsConfig: [],
    }
  },
  watch: {
    itemsConfig: {
      handler(items) {
        this.columns = []
        this.tableScopedSlotsConfig = []
        this.searchItemsConfig = []
        items.forEach((item) => {
          this.pushSearchItemsConfig(item)
          this.pushTableScopedSlotsConfig(item)
          this.pushColumns(item)
          this.pushFormItemsConfig(item)
        })
      },
      immediate: true
    }
  },
  methods: {
    pushColumns(item) {
      if (item?.columnItemConfig?.include !== false) {
        this.columns.push({
          title: item.label,
          dataIndex: item.key,
          key: item.key,
          ...(item?.columnItemConfig?.attributes || {})
        })
      }
    },
    pushTableScopedSlotsConfig(item) {
      if (item?.columnItemConfig?.include !== false) {
        if (item.columnItemConfig?.attributes?.scopedSlots) {
          let itemConfig = { key: item.key }
          if (item.columnItemConfig.attributes.scopedSlots === true) {
            itemConfig.customRender = item.key
          } else {
            itemConfig = { ...itemConfig, ...item.columnItemConfig.attributes.scopedSlots }
          }
          this.tableScopedSlotsConfig.push(itemConfig)
        }
      }
    },
    pushSearchItemsConfig(item) {
      if (item?.searchItemConfig?.include !== false) {
        this.searchItemsConfig.push({
          key: item.key,
          label: item.label,
          tag: item?.formItemConfig?.tag,
          ...item.formItemConfig,
          ...item.searchItemConfig,
        })
      }
    },
    pushFormItemsConfig(item) {
      if (item?.formItemConfig?.include !== false) {
        this.formItemsConfig.push({
          key: item.key,
          label: item.label,
          tag: item?.formItemConfig?.tag,
          disabled: this.formDisabled,
          ...item.formItemConfig
        })
      }
    },
    hideModal() {
      this.visible = false
    },
    showModal() {
      this.visible = true
      return new Promise((resolve, reject) => {
        this.$nextTick(() => {
          resolve()
        })
      })
    },
    reloadList() {
      this.$refs.list.reloadList()
    },
    handleSubmit() {
      this.$refs.gbDynamicForm.submit().then((data) => {
        if (data) {
          this.reloadList()
        }
        this.hideModal()
      }).catch(() => {
        this.hideModal()
      })
    },
    getInitFormData(getFn, params = {}) {
      // console.log("params = ", params)
      let initFormData = params
      if (getFn) {
        initFormData = getFn(params)
        // console.log("getFn initFormData = ", initFormData)
      }
      return initFormData
    },
    handleCreate() {
      // console.log("this.$refs = ", this.$refs)
      this.formDisabled = false
      this.title = this.submitConfig?.create?.title || ""
      this.showModal().then(() => {
        const initFormData = this.getInitFormData(this.submitConfig?.create?.getInitFormData)
        this.$refs.gbDynamicForm.init({ initFormData, ...this.submitConfig?.create, isCreate: true })
      })
    },
    handleEdit(record) {
      // console.log("handleEdit")
      this.formDisabled = false
      this.title = this.submitConfig?.edit?.title || ""
      this.showModal().then(() => {
        const initFormData = this.getInitFormData(this.submitConfig?.edit?.getInitFormData, record)
        // console.log("initFormData = ", initFormData)
        this.$refs.gbDynamicForm.init({ initFormData: initFormData, ...this.submitConfig?.edit })
      })
    },
    handleDetail(record) {
      this.formDisabled = true
      this.title = this.submitConfig?.detail?.title || ""
      const initFormData = this.getInitFormData(this.submitConfig?.detail?.getInitFormData, record)
      this.showModal().then(() => {
        this.$refs.gbDynamicForm.init({ initFormData, ...this.submitConfig?.detail })
      })
    },
    handleDelete(record) {
      if (this.submitConfig?.delete) {
        const { apiMethod, getParams } = this.submitConfig.delete
        if (apiMethod && getParams) {
          apiMethod(getParams(record)).then(() => {
            this.reloadList()
          })
        }
      }
    },
  }
}
</script>

<style lang="less" scoped>
.table-options {
  margin-bottom: 10px;
}
</style>
