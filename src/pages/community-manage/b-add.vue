<route>
    {
          "name": "添加社区",
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
        label-position="left"
      >
        <el-form-item label="社区名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="管理员姓名" prop="admin_name">
          <el-input v-model="ruleForm.admin_name"></el-input>
        </el-form-item>
        <el-form-item label="管理员电话" prop="phone">
          <el-input v-model="ruleForm.phone" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="ruleForm.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >立即创建</el-button
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
        admin_name: "",
        phone: "",
        sex: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入社区名称", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
        ],
        admin_name: [
          { required: true, message: "请输入管理员名称", trigger: "blur" },
          { min: 2, max: 4, message: "长度在 2 到 4 个字符", trigger: "blur" },
        ],
        phone: [
          { required: true, message: "请输入电话", trigger: "blur" },
          { min: 11, max: 11, message: "电话为11位数字", trigger: "blur" },
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
      },
      userObj: [],
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          if (this.ruleForm.sex == "男") {
            this.ruleForm.sex = "MAN";
          } else {
            this.ruleForm.sex = "WOMAN";
          }
          let form = {
            admin_name: this.ruleForm.admin_name,
            area_name: this.ruleForm.name,
            phone: this.ruleForm.phone,
            sex: this.ruleForm.sex,
          };
          // console.log(form)
          api
            .addCommunity(form)
            .then((res) => {
              // console.log(res)
              if (res.code === 200) {
                this.$router.push("./addCommunity");
              }
            })
            .catch((err) => {
              // this.$message.success("取消成功!");
            //   console.log(err);
              if (err.code == 500) {
                message.error(err.msg);
                this.$refs[formName].resetFields();
              }
            });
        } else {
        //   console.log("error submit!!");
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
    // background: #000;
    display: flex;
    justify-content: center;

    // align-items: center;
    form {
      width: 100%;

      .el-input {
        width: 40%;
      }
    }
  }
}
</style>
      