<template>
  <a-modal
    :visible="visible"
    :title="title"
    @ok="$emit('ok')"
    :width="width"
    :maskClosable="false"
    :destroyOnClose="true"
    @cancel="$emit('cancel')"
    centered
  >
    <a-spin :spinning="loading">
      <a-form-model
        ref="form"
        @submit.native.prevent
        @submit="handleSubmit"
        :bind="$attrs"
        v-on="$listeners"
      >
        <slot></slot>
      </a-form-model>
    </a-spin>
  </a-modal>
</template>

<script>
export default {
  name: "GbDialogForm",
  model: {
    prop: "visible",
    event: "change"
  },
  props: {
    visible: Boolean,
    loading: Boolean,
    title: String,
    width: {
      type: String,
      default: undefined
    },
    submitForm: Function
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate().then(() => {
        if (this.submitForm) {
          this.submitForm()
        }
        this.hideDialog()
      })
    },
    hideDialog() {
      this.$emit("change", false)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
