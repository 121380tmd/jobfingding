
<template>
  <div class="inner-contanner">
    <!-- <a-steps>
      <a-step status="finish" title="Login">
        <template #icon>
          <user-outlined />
        </template>
      </a-step>
      <a-step status="finish" title="Verification">
        <template #icon>
          <solution-outlined />
        </template>
      </a-step>
      <a-step status="process" title="Pay">
        <template #icon>
          <loading-outlined />
        </template>
      </a-step>
      <a-step status="wait" title="Done">
        <template #icon>
          <smile-outlined />
        </template>
      </a-step>
    </a-steps> -->
    <router-view></router-view>
    <!-- <el-button type="primary" :loading="iconLoading" @click="enterIconLoading" block>Primary</el-button> -->
    <header>填写信息</header>
    <div class="inf-box">
      <span> 街道办信息收集，请正确填写您的信息 </span>
    </div>
    <div class="choose-box">
      <div class="step">
        <!-- <van-steps :active="active">
          <van-step icon="el-icon-edit">填写基本信息</van-step>
          <van-step icon="el-icon-edit">填写申诉资料</van-step>
          <van-step icon="el-icon-edit">完成</van-step>
        </van-steps> -->
        <el-steps :active="active" align-center>
          <el-step
            title="01"
            description="选择社区信息"
            icon="el-icon-s-order"
          ></el-step>
          <el-step
            title="02"
            description="填写表单资料"
            icon="el-icon-s-custom"
          ></el-step>
          <el-step
            title="03"
            description="完成"
            icon="el-icon-success"
          ></el-step>
        </el-steps>
      </div>
      <div class="uerInf-box" v-if="active == 1">
        <div class="tishi">请直接点击下方居中文字选择您所在的地区</div>
        <div class="tishi2">请选择地区:</div>
        <van-cell is-link :title="site" @click="open" />
        <div>
          <van-action-sheet v-model="show" :closeable="true">
            <template #description>
              <div class="toast-box">
                <div class="box"></div>
                <div class="box"></div>
                <div class="box" @click="ok">确认</div>
              </div>
            </template>
            <van-picker
              :columns="columns"
              @confirm="onConfirm"
              @cancel="onCancel"
              @change="onChange"
            />
          </van-action-sheet>
        </div>
      </div>
      <div class="uerInf-box" v-if="active == 2">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
          label-position="left"
        >
          <el-form-item label="姓名" prop="name">
            <el-input v-model="ruleForm.name" maxlength="4"></el-input>
          </el-form-item>
          <el-form-item label="身份证号" prop="Idnumber">
            <el-input v-model="ruleForm.Idnumber" maxlength="18"></el-input>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input v-model="ruleForm.age" maxlength="2"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="tel">
            <el-input v-model="ruleForm.tel" maxlength="11"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="ruleForm.sex">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="家庭住址" prop="adress">
            <el-input v-model="ruleForm.adress"></el-input>
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
          <el-form-item label="求职意向" prop="cascaderValue">
            <van-field
              v-model="ruleForm.cascaderValue"
              is-link
              readonly
              label=""
              placeholder="请选择所在地区"
              @click="pickShow()"
            />
            <van-popup v-model="isshow" round position="bottom">
              <van-cascader
                v-model="ruleForm.cascaderValue"
                title="请选择所在地区"
                :options="jobList"
                @close="isshow = false"
                @finish="onFinish"
              />
            </van-popup>
            <!-- {{ ruleForm.cascaderValue }} -->
            <!-- <el-select v-model="ruleForm.jobIntention" placeholder="请选择求职意向">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select> -->
          </el-form-item>
        </el-form>
      </div>
      <div class="uerInf-box" v-if="active == 3">
        <div class="complete">
          <i class="el-icon-check" id="completeIcon"></i>
          <div>您已成功提交</div>
        </div>
      </div>
    </div>
    <div class="btn-box">
      <el-button
        v-if="active == 1"
        type="primary"
        @click="next()"
        :loading="isLoading"
      >
        {{ isLoading == true ? "加载中" : "下一步" }}
      </el-button>
      <el-button
        v-if="active == 2"
        type="primary"
        @click="submitForm('ruleForm')"
      >
        完成提交
      </el-button>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import api from "@/api";
import { Toast } from "vant";
import data from "../../icons/svg-view";
import { RedEnvelopeFill } from "@ant-design/icons/lib/dist";
// import { getommunityInf } from '../../api/modules/all'
export default {
  name: "formdate",
  layout: "layout-blank",
  data() {
    return {
      active: 1,
      ruleForm: {
        name: "123",
        Idnumber: "520402200110079494",
        age: "20",
        tel: "13740851207",
        sex: "",
        adress: "12313",
        education: "",
        // jobIntention: "",
        cascaderValue: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" },
        ],
        Idnumber: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
          { min: 18, max: 18, message: "身份证号为18位字符", trigger: "blur" },
          // { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        age: [
          { required: true, message: "请输入年龄", trigger: "blur" },
          { min: 1, max: 2, message: "年龄输入有误", trigger: "blur" },
        ],
        tel: [
          { required: true, message: "请输入电话", trigger: "blur" },
          { min: 11, max: 11, message: "电话为11位字符", trigger: "blur" },
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        adress: [
          { required: true, message: "请输入家庭住址", trigger: "blur" },
          {
            min: 2,
            max: 18,
            message: "长度在 2 到 18 个字符",
            trigger: "blur",
          },
        ],
        education: [
          { required: true, message: "请选择学历信息", trigger: "change" },
        ],
        cascaderValue: [
          { required: true, message: "请选择求职意向", trigger: "change" },
        ],
      },
      // columns: ['杭州', '宁波', '温州', '绍兴', '湖州', '嘉兴', '金华', '衢州'],
      columns: [],
      tempcolumns: [],
      iconLoading: false,
      showPopover: false,
      // actions: [{ text: '选项一' }, { text: '选项二' }, { text: '选项三' }],
      show: false,
      isshow: false,
      myadress: "",
      site: "请选择地区",
      id: "",
      isLoading: false,
      // actions: [{ name: '选项一' }, { name: '选项二' }, { name: '选项三' }],
      show: false,
      fieldValue: "",
      // cascaderValue: '',
      options: [
        {
          text: "浙江省",
          value: "330000",
          children: [
            { text: "杭州市", value: "1" },
            { text: "杭州市", value: "2" },
            { text: "杭州市", value: "3" },
          ],
        },
        {
          text: "江苏省",
          value: "320000",
          children: [{ text: "南京市", value: "320100" }],
        },
      ],
      jobList: [],
      jobValue: false,
      Mark: "",
    };
  },
  methods: {
    // enterIconLoading() {
    //   this.iconLoading = true
    //   setTimeout(() => {
    //     if (this.active < 2) {
    //       this.active += 1
    //     } else {
    //       this.active = -1
    //     }
    //     this.iconLoading = false
    //   }, 1000);

    // },
    next() {
      if (this.site == "请选择地区") {
        Toast.fail("请选择地区");
      } else {
        //
        this.isLoading = true;
        api
          .checkAdressId(this.id)
          .then((res) => {
            // console.log(res);
            if (res.code == 200) {
              this.active += 1;
            }
            // else {

            // }
          })
          .catch((res) => {
            Toast.fail(res.msg);
            this.isLoading = false;
          });

        api.getJob().then((res) => {
          // console.log(res);
        });
      }
    },
    submitForm(formName) {
      // console.log('123')
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.jobValue == true) {
            // console.log(this.ruleForm);
            // console.log("area_id", this.id);
            let sexID = this.ruleForm.sex;
            let SEX = "";
            if (sexID == "男") {
              SEX = "MAN";
            }
            if (sexID == "女") {
              SEX = "WOMAN";
            }
            let from = {
              address: this.ruleForm.adress,
              age: this.ruleForm.age,
              area_id: this.id,
              education: this.ruleForm.education,
              id_card: this.ruleForm.Idnumber,
              job_id: this.Mark,
              name: this.ruleForm.name,
              phone_num: this.ruleForm.tel,
              sex: SEX,
            };
            // console.log(from);
            api
              .webSubmit(from)
              .then((res) => {
                console.log(res);
                if (res.code == 200) {
                  this.active = 3;
                  // console.log(this.active);
                }

                // this.tempcolumns = res.data
              })
              .catch((err) => {
                // console.log(err);
              });
          } else {
            Toast.fail("请完整选择求职信息");
          }

          // this.active += 2
        } else {
          Toast.fail("完成信息填写");
          return false;
        }
      });
    },
    onConfirm(value, index) {
      // console.log(`当前值：${value}, 当前索引：${index}`);
      this.site = value;
      let a = this.tempcolumns.findIndex((item) => {
        item.name == value;
      });
      // console.log("a", a);
      this.id = index + 1;
    },
    onChange(picker, value, index) {
      // console.log(`当前值：${value}, 当前索引：${index}`);
      this.site = value;
      // console.log(this.tempcolumns[index].id);
      this.id = this.tempcolumns[index].id;
    },
    onCancel() {
      console.log("取消");
    },
    onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.show = false;
      Toast(item.name);
    },
    open() {
      this.show = true;
      this.site = this.columns[0];
      this.id = this.tempcolumns[0].id;
    },
    ok() {
      this.show = false;
    },
    onFinish({ value, selectedOptions, tabIndex }) {
      this.show = false;
      this.jobValue = true;
      // console.log(value);
      // console.log(selectedOptions);
      // console.log(tabIndex);
      this.Mark = selectedOptions[tabIndex].mark;
      // console.log(this.Mark);

      // this.fieldValue = selectedOptions.map((option) => option.text).join('/');
      // console.log('123123wanc')
    },
    pickShow() {
      this.isshow = true;
      // console.log('123')
    },
    // findvalue( value, selectedOptions, tabIndex){
    // console.log( value, selectedOptions, tabIndex)
    // }
  },
  mounted() {
    api.getCommunityInf().then((res) => {
      // console.log(res.data);
      this.tempcolumns = res.data;
      res.data.forEach((item, index) => {
        this.columns.push(item.name);
      });
    });
    api.getJob().then((res) => {
      // console.log("data", res.data);
      res.data.forEach((item, index) => {
        this.jobList.push({
          text: item.jobClassFy.name,
          value: item.jobClassFy.id,
          children: [],
        });
        // console.log(item.jobs);
        let temp = [];
        item.jobs.forEach((item2, index2) => {
          temp.push({
            value: item2.name,
            text: item2.name,
            mark: item2.id,
          });
        });
        this.jobList[index].children = temp;
      });

      // console.log("jobList", this.jobList);
    });
  },
};
</script>

<style lang="less" scoped>
.inner-contanner {
  padding: 1px;
  width: 100vw;
  height: 100vh;
  // border: 1px red solid;
  display: flex;
  flex-wrap: wrap;
  // background: @primary-color;
}

header {
  // background: #000;
  width: 100%;
  height: 5%;
  background: rgb(249, 249, 249);
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  font-weight: bold;
}

.inf-box {
  width: 100%;
  height: 15%;
  background: rgb(255, 255, 255);
  border-bottom: 1px rgb(242, 244, 249) solid;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    padding-left: 10%;
  }

  // background: red;
}

.choose-box {
  width: 100%;
  height: 65%;
  display: flex;
  flex-wrap: wrap;

  .step {
    width: 100%;
    height: 15%;
    // border: 1px red solid;
  }

  .uerInf-box {
    width: 100%;
    height: 85%;
    // border: 1px red solid;
    position: relative;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    :deep(.van-cell__title > span) {
      // border: 1px red solid;
      // text-align: center;
      display: flex;
      font-size: 2rem;
      justify-content: center;
    }
    :deep(.van-cell__title){
      // display: f;
      // border: 1px red solid;
      // position: absolute;
      margin-bottom: 50%;
    }
    // :deep(.van-cell>.van-cell--clickable) {
    //   width: 100%;
    //   height: 96%;
    //   border: 1px red solid;
    // }
  }
  .tishi {
    width: 100%;
    height: 2%;
    // border: 1px red solid;
    margin-top: 5%;
    color: red;
    text-align: center;
  }
  .tishi2 {
    width: 100%;
    height: 2%;
    position: absolute;
    font-weight: bold;
    font-size: 1.2rem;
    top: 13%;
    left: 1%;
    // border: 1px red solid;
    color: black;
    // text-align: center;
  }

  // background: yellow;
}

.btn-box {
  width: 100%;
  height: 15%;
  // background: #000;
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    width: 80%;
  }
}

.toast-box {
  width: 100%;
  // background: red;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;

  .box {
    width: 33%;
    display: flex;
    justify-content: flex-end;
    color: black;
  }
}

.complete {
  width: 35%;
  height: 30%;
  margin: 50px auto;
  // background: rgb(35, 168, 242);
  border-radius: 50%;
  // display: inline-block;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  // color: blue;
  font-family: Arial, sans-serif, helvetica;
  animation: fadeIn linear 3s;
  -webkit-animation: fadeIn linear 3s;
  -moz-animation: fadeIn linear 3s;
  -o-animation: fadeIn linear 3s;
  -ms-animation: fadeIn linear 3s;

  #completeIcon {
    width: 100%;
    height: 70%;
    font-size: 5rem;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    color: black;
  }

  div {
    height: 30%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
    font-weight: bold;
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@-ms-keyframes fadeIn {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@-o-keyframes fadeIn {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@-webkit-keyframes fadeIn {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@-moz-keyframes fadeIn {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
