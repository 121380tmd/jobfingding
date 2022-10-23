<template>
  <a-spin :spinning="loading">
    <a-form-model
      ref="form"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      :layout="layout"
    >
      <a-form-model-item :label="item.label" :prop="item.key" v-for="item of formItemsConfig" :key="item.key" v-show="item.show !== false">
        <a-input v-if="item.tag === 'a-input'" v-model="form[item.key]" v-bind="item.attributes"></a-input>
        <a-select v-else-if="item.tag === 'a-select'" v-model="form[item.key]" v-bind="item.attributes"></a-select>
        <gb-switch v-else-if="item.tag === 'gb-switch'" v-model="form[item.key]" v-bind="item.attributes"></gb-switch>
      </a-form-model-item>
    </a-form-model>
  </a-spin>
</template>

<script>
import GbSwitch from "@/components/gb-switch"
import { initObjData } from "@/utils/tools.common"
export default {
  name: "GbDynamicForm",
  components: { GbSwitch },
  props: {
    formItemsConfig: {
      type: Array,
      default() {
        return [
          {
            include: true,
            show: true,
            tag: "a-input",
            key: "",
            defaultValue() {
              return ""
            },
            rule: {},
            attributes: {
              type: "text"
            }
          }
        ]
      }
    },
    customSubmit: Function,
    layout: {
      type: String,
      default: "horizontal" // 'horizontal'|'vertical'|'inline'
    },
    labelCol: {
      type: Object,
      default() {
        return { span: 4 }
      }
    },
    wrapperCol: {
      type: Object,
      default() {
        return { span: 20 }
      }
    },
  },
  data() {
    return {
      form: {},
      rules: {},
      loading: false,
      apiMethod: null,
    }
  },
  methods: {
    submit() {
      if (this.customSubmit) {
        this.customSubmit(this.form)
      } else {
        return new Promise((resolve, reject) => {
          if (!this.apiMethod) {
            resolve()
          }
          this.$refs.form.validate().then(() => {
            this.setLoading(true)
            if (this.apiMethod) {
              this.apiMethod(this.form).then((data) => {
                this.setLoading(false)
                resolve(data)
              }).catch((e) => {
                this.setLoading(false)
                reject(e)
              })
            }
          })
        })
      }
    },
    setLoading(val) {
      this.loading = val
    },
    init({ initFormData, apiMethod, formItemsConfig = this.formItemsConfig, isCreate = false }) {
      const defaultValues = {}
      if (formItemsConfig?.length) {
        formItemsConfig.forEach(item => {
          if (item.include !== false) {
            if (isCreate) {
              defaultValues[item.key] = item?.defaultValue ? item.defaultValue() : null
            }
            this.$set(this.form, item.key, null)
            if (item.rule) {
              this.$set(this.rules, item.key, item.rule)
            }
          }
        })
      }
      if (isCreate) {
        initObjData(this.form, { ...defaultValues, ...initFormData })
      } else {
        initObjData(this.form, initFormData)
      }
      // console.log("this.form = ", this.form)
      this.apiMethod = apiMethod
    },
  }
}
</script>

<style lang="less" scoped>

</style>
