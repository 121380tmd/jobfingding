<route>
    {
          "name": "编辑信息",
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
        :hide-required-asterisk="true"
      >
        <div class="box-1">
          <el-form-item label="名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input v-model="ruleForm.age"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="phone">
            <el-input v-model="ruleForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="身份证号" prop="id_card">
            <el-input v-model="ruleForm.id_card"></el-input>
          </el-form-item>
          <el-form-item label="地址" prop="adress">
            <el-input v-model="ruleForm.adress"></el-input>
          </el-form-item>
        </div>
        <div class="box-2">
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="ruleForm.sex">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="职业" prop="job_name">
            {{ ruleForm.job_name }}
            <el-cascader
              v-model="ruleForm.job_name"
              :options="jobList"
              :show-all-levels="false"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="学历信息" prop="education">
            <el-select
              v-model="ruleForm.education"
              placeholder="请选择您的学历"
            >
              <el-option label="小学" value="小学"></el-option>
              <el-option label="初中" value="初中"></el-option>
              <el-option label="高中" value="高中"></el-option>
              <el-option label="中专" value="中专"></el-option>
              <el-option label="大专" value="大专"></el-option>
              <el-option label="本科" value="本科"></el-option>
              <el-option label="硕士研究生" value="硕士研究生"></el-option>
              <el-option label="博士研究生" value="博士研究生"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="社区" prop="area_info">
            <el-select v-model="ruleForm.area_info" placeholder="请选择您的社区"
              >{{ ruleForm.area_info }}
              <el-option
                :label="item.name"
                :value="item.id"
                v-for="(item, index) in comdata"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="box-3">
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >立即创建</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </div>
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
      value: "",
      ruleForm: {
        name: "",
        age: "",
        phone: "",
        id_card: "",
        adress: "",
        sex: "",
        job_name: "",
        education: "",
        area_info: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入社区名称", trigger: "blur" },
          { min: 1, max: 7, message: "长度在 1 到 7 个字符", trigger: "blur" },
        ],
        age: [
          { required: true, message: "请输入年龄", trigger: "blur" }, 
          { min: 1, max: 2, message: "长度在 1 到 2 个字符", trigger: "blur" },
        ],
        phone: [
          { required: true, message: "请输入电话", trigger: "blur" },
          { min: 11, max: 11, message: "长度为11个字符", trigger: "blur" },
        ],
        id_card: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
          { min: 18, max: 18, message: "长度为18个字符", trigger: "blur" },
        ],
        adress: [
          { required: true, message: "请输入地址", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "长度在 6 到 18 个字符",
            trigger: "blur",
          },
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        job_name: [
          { required: true, message: "请选择职业", trigger: "change" },
        ],
        education: [
          { required: true, message: "请选择学历", trigger: "change" },
        ],
        area_info: [
          { required: true, message: "请选择社区", trigger: "change" },
        ],
      },
      data: [],
      options: [],
      comdata: [],
      jobList: [],
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
          this.comdata.forEach((item, index) => {
            if (this.ruleForm.area_info == item.name) {
              this.ruleForm.area_info = item.id;
            }
          });
          if (typeof this.ruleForm.job_name === "object") {
            this.ruleForm.job_name = `${this.ruleForm.job_name[0]}`;
          }
          let form = {
            address: this.ruleForm.adress,
            age: this.ruleForm.age,
            area_id: this.ruleForm.area_info,
            create_time: this.data.create_time,
            education: this.ruleForm.education,
            id: this.data.id,
            id_card: this.ruleForm.id_card,
            job_id: this.ruleForm.job_name,
            name: this.ruleForm.name,
            phone: this.ruleForm.phone,
            sex: this.ruleForm.sex,
          };
          // console.log(form);
          api
            .modifyFill(form)
            .then((res) => {
              // console.log(res);
              if (res.code === 200) {
                message.success("修改成功");
                this.$router.push("./add-fill");
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

    api.getCommunityInf().then((res) => {
      // console.log(res.data);
      this.comdata = res.data;
    });

    api.getJob().then((res) => {
      // console.log("data", res.data);
      res.data.forEach((item, index) => {
        this.jobList.push({
          label: item.jobClassFy.name,
          value: item.jobClassFy.id,
          children: [],
        });
        let temp = [];
        item.jobs.forEach((item2, index2) => {
          temp.push({
            value: item2.name,
            label: item2.name,
            mark: item2.id,
          });
        });
        this.jobList[index].children = temp;
      });
    });

    // console.log("jobList", this.jobList);

    this.data = this.$route.query;
    // console.log(this.data);
    this.ruleForm.name = this.data.name;
    this.ruleForm.age = this.data.age;
    this.ruleForm.phone = this.data.phone;
    this.ruleForm.id_card = this.data.id_card;
    this.ruleForm.adress = this.data.address;
    this.ruleForm.sex = this.data.sex;
    this.ruleForm.job_name = this.data.job_name;
    this.ruleForm.education = this.data.education;
    this.ruleForm.area_info = this.data.area_info;
    if (this.ruleForm.sex == "MAN") {
      this.ruleForm.sex = "男";
    } else {
      this.ruleForm.sex = "女";
    }
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
    // display: flex;
    // background: #000;

    form {
      width: 100%;
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      .box-1 {
        width: 50%;
        height: 80%;
        .el-input {
          width: 80%;
        }
      }
      .box-2 {
        width: 50%;
        height: 80%;
        .el-input {
          width: 80%;
        }
      }
      .box-3 {
        width: 100%;
        height: 20%;
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
      }
    }

    // background: #000;
  }
}
</style>
      