import { initObjData } from "@/utils/tools.common"

const FORM_TYPE_MAP = {
  create: "create",
  edit: "edit"
}

const formModalMixin = {
  data() {
    return {
      visible: false,
      formType: FORM_TYPE_MAP.create
    }
  },
  computed: {
    isCreate: {
      get() {
        return this.formType === FORM_TYPE_MAP.create
      },
      set(val) {
        this.formType = FORM_TYPE_MAP.create
      }
    },
    isEdit: {
      get() {
        return this.formType === FORM_TYPE_MAP.edit
      },
      set(val) {
        this.formType = FORM_TYPE_MAP.edit
      }
    },
  },
  methods: {
    formatForm(form, customFormData = {}) {
      return initObjData(form, customFormData)
    },
    openModal() {
      this.visible = true
    },
    hideModal() {
      this.visible = false
    },
    beforeInsert(initFormData = {}) {
      this.isCreate = true
      this.openModal()
      this.formatForm(this.form, initFormData)
    },
    beforeEdit(initFormData) {
      this.isEdit = true
      this.openModal()
      this.formatForm(this.form, initFormData)
    },
    submitSuccess() {
      this.$emit("submitSuccess")
    }

  }
}

export {
  formModalMixin
}
