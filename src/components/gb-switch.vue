<template>
  <a-switch
    :checked="checked"
    :checked-children="checkedText"
    :un-checked-children="unCheckedText"
    @change="handleChange"
  />
</template>

<script>
const VALUE_TYPES = [ String, Number, Object, Array, Boolean ]
export default {
  name: "GbSwitch",
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    checkedValue: {
      type: VALUE_TYPES,
      default: true
    },
    unCheckedValue: {
      type: VALUE_TYPES,
      default: true
    },
    checkedText: String,
    unCheckedText: String,
    value: {
      type: VALUE_TYPES,
      default: false
    }
  },
  computed: {
    checked() {
      return this.value === this.checkedValue
    }
  },
  methods: {
    handleChange(val) {
      const value = val ? this.checkedValue : this.unCheckedValue
      this.$emit("change", value)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
