<template>
  <div
    :style="{
      '--picture-card-wight': pictureCardSize.width,
      '--picture-card-height': pictureCardSize.height,
    }"
  >
    <a-upload
      :list-type="listType"
      class="zf-upload"
      :show-upload-list="showUploadList"
      :action="action"
      :before-upload="beforeUpload"
      :accept="accept"
      @change="handleChange"
      :with-credentials="true"
      :headers="headers"
      :file-list="fileList"
      :remove="handleRemove"
      :disabled="disabled"
    >
      <div v-if="fileList.length < maxCount && !disabled">
        <template v-if="listType === 'picture-card'">
          <a-icon type="plus"/>
          <div class="ant-upload-text">
            上传
          </div>
        </template>
        <!-- <a-button v-else>
          <a-icon type="upload"/>
          上传
        </a-button> -->
      </div>
    </a-upload>
    <div class="tips" v-if="!disabled">
      单个文件大小不超过{{ maxSizeStr }},最多上传 {{maxCount}} 个文件
    </div>
  </div>
</template>

<script>
export default {
  name: "GbUpload",
  model: {
    event: "change",
    prop: "fileList",
  },
  props: {
    // 已上传文件列表
    fileList: {
      type: Array,
      default() {
        return []
      },
    },
    // 使用 fileIds.sync 获取上传成功后的文件id值数组
    fileIds: {
      type: Array,
      default() {
        return []
      },
    },
    action: {
      type: String,
      default: "",
    },
    showUploadList: {
      type: Boolean,
      default: true,
    },
    accept: {
      type: String,
      default: ".png,.jpg,.jpeg", // * 使用 文件后缀的方式限制上传类型，否则js验证时会出错
    },
    // 最大上传文件树
    maxCount: {
      type: Number,
      default: 1,
    },
    // 上传文件展示类型
    listType: {
      type: String,
      default: "picture-card", // text / picture / picture-card
    },
    // 限制上传大小 (默认10M)
    maxSize: {
      type: Number,
      default: 10 * 1024 * 1024,
    },
    // 使用 :uploading.sync="***" 可同步组件是否有上传中状态
    uploading: {
      type: Boolean,
      default: false,
    },
    // 禁用上传操作
    disabled: {
      type: Boolean,
      default: false,
    },
    // listType 为 picture-card 时的单元展示尺寸
    pictureCardSize: {
      type: Object,
      default() {
        return {
          width: "104px",
          height: "104px",
        }
      },
    },
  },
  data() {
    return {
      headers: {
        // Authorization: Cookie.get(xsrfHeaderName),
      },
      myFileList: [],
    }
  },
  computed: {

    /**
     * 最大值限制描述转换
     * @returns {string}
     */
    maxSizeStr() {
      const baseUnit = 1024
      const units = {
        "kb": baseUnit,
        "Mb": baseUnit * baseUnit,
        "Gb": baseUnit * baseUnit * baseUnit,
      }
      for (const unit in units) {
        if (this.maxSize < units[unit] * baseUnit) {
          return `${ (this.maxSize / units[unit]).toFixed(2) }${ unit }`
        }
      }
      return `${ (this.maxSize / units.Gb).toFixed(2) }Gb`
    },
  },
  methods: {
    // 主要去掉文件中的特殊字符，防止文件获取url被转义
    formatFile(file) {
      const newFileName = file.name.replace(/[/@,%;?:&=+`$#\]\[\\]/g, '') || 'file' // eslint-disable-line
      const newFile = new File([file], newFileName, {
        type: file.type,
      })
      newFile.uid = file?.uid // uid由a-upload组件生成，无此参数会导致组件参数验证不通过
      return newFile
    },
    beforeUpload(file) {
      const newFile = this.formatFile(file)
      if (this.isAccept(newFile)) {
        if (this.maxSize === -1) { // 为-1时无限制
          return Promise.resolve(newFile)
        } else {
          const isLimit = newFile.size <= this.maxSize
          if (isLimit) {
            return Promise.resolve(newFile)
          } else {
            this.$message.error(`图片不能大于${ this.maxSizeStr }`)
            return Promise.reject(false)
          }
        }
      }
      return Promise.reject(false)
    },
    // 根据文件后缀和accept 判断是否符合上传类型限制
    isAccept({ name }) {
      if (this.accept !== "*") {
        const acceptArr = this.accept.toLowerCase().split(",")
        const nameSplit = name.split(".")
        if (nameSplit.length > 1) {
          const fileSuffix = `.${ nameSplit[nameSplit.length - 1] }`.toLowerCase()
          const isAcceptFileType = acceptArr.includes(fileSuffix)
          if (!isAcceptFileType) {
            this.$message.warning(`文件类型错误，支持上传的文件类型：${ this.accept }`)
          }
          return isAcceptFileType
        } else {
          this.$message.error("上传文件无文件后缀")
          return false
        }
      }
      return true
    },
    fileListChange(fileList) {
      const validFileList = fileList.filter(item => item.response.success)
      this.$emit("update:fileIds", validFileList.map(item => item.response.data.id)) // 根据后台相关参数修改
      this.$emit("change", fileList)
    },
    fileIsUploading(file) {
      return file.status === "uploading"
    },
    handleChange({ file, fileList }) {
      if (fileList?.length) {
        this.$emit("update:uploading", fileList.some(item => this.fileIsUploading(item)))
      } else {
        this.$emit("update:uploading", false)
      }
      if ((file.status === "done" && (file.response && file.response.success === false))) {
        this.$message.error(`文件上传失败！(${ file.response.msg })`)
      }
      this.fileListChange(this.fileList)
    },
    handleRemove(file) {
      // console.log('file = ', file)
      // const message = this.$message
      // const id = file?.response?.data?.id || file.id
      if (this.fileIsUploading(file)) { // 文件上传中，直接删除
        return true
      }
      // 删除后台上传文件 TODO: 根据后台设计判断是否需要此功能
      return new Promise((resolve, reject) => {
        this.$confirm({
          title: "删除",
          content: "确认删除此文件？",
          onOk() {
            // console.log('file = ',file)
            // fileServices.fileDelete(id).then(res => {
            //   if (res.data?.success) {
            //     message.success(res.data?.msg)
            //     resolve(true)
            //   } else {
            //     message.error(res.data?.msg)
            //     resolve(false)
            //   }
            // })
          },
          onCancel() {
            reject()
          },
        })
      })
    },
  },
}

</script>

<style lang="less" scoped>
.tips {
  line-height: 1;
  font-size: 12px;
  color: #cccccc;
}

/deep/ .zf-upload {
  .ant-upload-list-picture-card-container,
  .ant-upload-list-picture-card-container .ant-upload-list-item,
  .ant-upload.ant-upload-select-picture-card {
    width: var(--picture-card-wight);
    height: var(--picture-card-height);
  }
}
</style>
