<route>
    {
          "name": "编辑职业名称",
          "meta": {
            "requiresAuth": true,
            "invisible": false,
            "icon": "home"
          }
    }
</route>
        
<template>
  <div class="main">
    <div class="form-box">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="职业名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="职业描述" prop="textarea">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="ruleForm.textarea"
            maxlength="30"
            show-word-limit
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >立即修改</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
      
<script>
import api from "@/api";
import { message } from "ant-design-vue";
export default {
  name: "UserManage2",
  // components: { GbDynamicTableForm },
  data() {
    return {
      ruleForm: {
        name: "",
        textarea: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入职业名称", trigger: "blur" },
          { min: 1, max: 7, message: "长度在 1 到 7 个字符", trigger: "blur" },
        ],
        textarea: [
          { required: false, message: "请输入职业描述", trigger: "blur" },
          { min: 0, max: 30, message: "长度在 1 到 30 个字符", trigger: "blur" },
        ],
      },
      data: [],
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          let form = {
            name: this.ruleForm.name,
            id: this.data.id,
            descript: this.ruleForm.textarea,
          };
          api
            .modifyJobName(form)
            .then((res) => {
              // console.log(res);
              if (res.code === 200) {
                message.success("修改成功");
                this.$router.push("./main");
              }
            })
            .catch((err) => {
              // this.$message.success("取消成功!");
              // console.log(err);
              if (err.code == 500) {
                message.error(err.msg);
              }
            });
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  mounted() {
    // let Obj = JSON.parse(localStorage.getItem('DEV_LOCAL_STORAGE_USER_INFO'));
    // this.userObj = Obj.value
    // console.log(this.userObj.phone)
    this.data = this.$route.query;
    // console.log(this.data);
    this.ruleForm.name = this.data.name;
  },
};
</script>
      
<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  border-radius: 1%;

  .form-box {
    width: 80%;
    height: 80%;

    form {
      width: 100%;

      .el-input {
        width: 40%;
      }
    }

    // background: #000;
  }
}
</style>
      