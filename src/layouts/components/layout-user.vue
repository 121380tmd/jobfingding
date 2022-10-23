<template>
  <div class="dropdown">
    <a-dropdown>
      <span class="name">{{ userInfo.name || 1233 }}</span>
      <a-menu slot="overlay">
        <a-menu-item @click="modifyPassWord">
          <a-icon type="to-top" />
          <span>修改密码</span>
        </a-menu-item>
        <a-menu-item @click="handleLogout">
          <a-icon type="poweroff" />
          <span>退出登录</span>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
    <a-modal
      v-model:visible="visible"
      title="修改密码"
      @ok="handleOk('ruleForm')"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input v-model="ruleForm.oldPassword" type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="ruleForm.newPassword" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="checkPassword">
          <el-input v-model="ruleForm.checkPassword" type="password"></el-input>
        </el-form-item>
      </el-form>
    </a-modal>
  </div>
</template>

<script>
import api from "@/api";
import { message } from "ant-design-vue";
import { mapGetters } from "vuex";
import { removeLocalStorage } from "@/utils/tools.local-storage";
export default {
  name: "LayoutUser",
  data() {
    return {
      visible: false,
      ruleForm: {
        oldPassword: "",
        newPassword: "",
        checkPassword: "",
      },
      rules: {
        oldPassword: [
          { required: true, message: "请输入旧密码", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "长度在 6 到 18 个字符",
            trigger: "blur",
          },
        ],
        newPassword: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "长度在 6 到 18 个字符",
            trigger: "blur",
          },
        ],
        checkPassword: [
          { required: true, message: "请再次输入新密码", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "长度在 6 到 18 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    handleLogout() {
      // console.log("123312");
      localStorage.clear();
      // next("/login")
      this.$router.push({
        redirect: {
          name: "login",
        },
      });
      location.reload();
      // this.$store.dispatch("logout")
    },
    modifyPassWord() {
      // console.log("123");
      this.visible = true;
      // this.$router.push("../../pages/z-my/modifyPassword");
    },
    handleOk(formName) {
      // console.log("ok");
      // if (this.input == "") {
      //   // message.
      //   message.error("请输入密码");
      // } else {
      //   this.visible = false;
      // }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.ruleForm.newPassword !== this.ruleForm.checkPassword) {
            message.warning("两次密码不一致");
          } else {
            // console.log("submit!!");
            let form = {
              new_password: this.ruleForm.newPassword,
              password: this.ruleForm.oldPassword,
            };
            // console.log(this.$router)

            api.modifyPassWord(form).then((res) => {
              // console.log(res);
              if (res.code === 200) {
                message.success("修改成功");
                this.$refs[formName].resetFields();
                this.visible = false;
                localStorage.clear();
                // next("/login")
                this.$router.push({
                  redirect: {
                    name: "login",
                  },
                });
                location.reload();
                // console.log("123123");
              }
            });
          }
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },

    submitForm(formName) {},
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.name {
  cursor: pointer;
}

.dropdown {
  width: 100px;
  // background: #000;
}
</style>
