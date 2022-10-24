<route>
    {
          "name": "添加职业",
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
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"
        label-position="left" :hide-required-asterisk="false">
        <div class="box-1">
          <el-form-item label="分类名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
        </div>
        <div class="box-2">
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <el-button plain class="back" @click="back()">返回</el-button>
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
        textarea: "",
      },
      rules: {
        region: [{ required: true, message: "请选择分类", trigger: "change" }],
        name: [
          { required: true, message: "请输分类名称", trigger: "blur" },
          { pattern: /[\u4e00-\u9fa5]/, message: "请输入正确的分类名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
        textarea: [
          { required: true, message: "请输入职业描述", trigger: "blur" },
          {
            min: 1,
            max: 30,
            message: "长度在 1 到 30 个字符",
            trigger: "blur",
          },
        ],
      },
      userObj: [],
      jobList: [],
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          let form = {
            name: this.ruleForm.name,
          };
          // console.log(form)
          api
            .addJobClassfy(form)
            .then((res) => {
              // console.log(res);
              if (res.code === 200) {
                message.success("添加成功");
                this.$router.push("./main2");
              }
            })
            .catch((err) => {
              // this.$message.success("取消成功!");
              // console.log(err);
              if (err.code == 500) {
                message.error(err.msg);
                this.$refs[formName].resetFields();
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
    back() {
      this.$router.push({
        path: "./main2",
      });
    }
  },
  mounted() {
    let form = {
      pageNum: 1,
      pageSize: 100,
    };
    api.getClassFyList(form).then((res) => {
      // console.log(res);
      this.jobList = res.data.list;
      // console.log(this.jobList);
    });
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
  position: relative;

  .form-box {
    width: 80%;
    height: 80%;
    // background: #000;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    .box-1 {
      width: 100%;
      height: 50%;
      display: flex;
      //   justify-content: center;
      flex-wrap: wrap;
      align-items: center;

      .el-form-item {
        width: 100%;
      }

      .el-input {
        width: 30%;
      }

      .el-textarea {
        width: 40%;
        // min-height: 100px;
      }
    }

    .box-2 {
      width: 100%;
      height: 50%;
      display: flex;
      justify-content: space-evenly;
      align-items: flex-start;
    }

    // align-items: center;
    form {
      width: 100%;

      .el-input {
        width: 40%;
      }
    }
  }
}

.back {
  position: absolute;
  top: 1rem;
  left: 1rem;
  // border: 1px red solid;
}
</style>
      