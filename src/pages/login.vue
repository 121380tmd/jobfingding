<route>
{
  "meta": {
    "requiresAuth": false,
    "invisible": false,
    "title": "登录",
    "svgIcon": "home"
  }
}
</route>
<template>
  <div class="login-container">
    <div class="login-container-lift">
      <div class="login-container-lift-image">
        <img src="../assets/images/37.png">
      </div>
    </div>
    <div class="login-container-right">
      <div class="login-container-right-LoginCard">
        <div class="LoginCard-title">用户登录</div>
        <div class="LoginCard-inputBar">
          <div class="LoginCard-title-inputBar">
            <div class="inputBar-icon">
              <a-icon style="fontSize:24px" type="user" />
            </div>
            <div class="inputBar-input">
              <input type="text" placeholder="请输入系统用户名" v-model="form.userAccount">
            </div>
          </div>
          <div class="LoginCard-title-inputBar">
            <div class="inputBar-icon">
              <a-icon style="fontSize:24px" type="lock" />
            </div>
            <div class="inputBar-input">
              <input type="password"  placeholder="请输入密码" v-model="form.password">
            </div>
          </div>
          <div class="LoginCard-title-verify">
            <div class="LoginCard-verify">
              <div class="inputBar-verify-icon">
                <a-icon style="fontSize:24px" type="safety" />
              </div>
              <div class="inputBar-verify-input">
                <input type="text" placeholder="请输入验证码" v-model="form.captchCode">
              </div>
            </div>
            <div class="inputBar-verify-code" @click="getCode">
              <img :src="imageUrl">
            </div>
            <!-- <div class="inputBar-verify-code"></div> -->
          </div>
          <div class="LoginCard-title-button" @click="login">登录</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import store from "@/store"
import api from "@/api"
import { Message } from "ant-design-vue";
export default {
  name: "Index",
  layout: "layout-blank",
  beforeRouteEnter(to, from, next) {
    const logged = store.getters.logged
    // console.log("123"+logged)
    if (logged) {
      next({ name: "admin", query: { redirect: to.fullPath }})
    }
    next()
  },
  data() {
    return {
      imageUrl: '',
      ImgObj: [],
      form: {
        "captchCode": "",
        "captchId": "",
        "password": "", // TODO: 方便调试使用
        "userAccount": "",
      },
      rules: {

      },
      loading: false,
    }
  },
  mounted() {
    this.getCode()
  },
  methods: {
    getCode() {
      api.getCode().then((res) => {
        this.imageUrl = res.data.image
        this.form.captchId = res.data.captchaId
      })
    },
    login() {
      if (this.form.userAccount != '') {
        if (this.form.password != '') {
          if (this.form.captchCode != "") {
            api.login(this.form).then((res) => {
              if (res.code == 200) {
                this.$message.success(res.msg)
                this.$store.commit("setUserInfo", res.data)
                // this.$router.push("/admin")
                this.loginSuccessRedirect()
              }
            }).catch((err) => {
              this.$message.error(err.msg)
            })
          } else {
            this.$message.warning("请输入验证码")
          }
        } else {
          this.$message.warning("请输入密码")
        }
      } else {
        this.$message.warning("请输入账号")
      }
    },
    // 登录成功后跳转到登录前路由
    loginSuccessRedirect() {
      const redirect = this.$route.query.redirect
      // console.log(redirect)
      if (redirect) {
        this.$router.push(redirect)
      } else {
        this.$router.push("/admin")
      }
    },
  },
}
</script>

<style lang="less" scoped>
.login-container {
  width: 100vw;
  height: 100vh;
  background: #F5F5F5;
  display: flex;
  align-items: center;

  .login-container-lift {
    width: 50%;
    height: 50%;
    position: relative;

    .login-container-lift-image {
      width: 70%;
      height: 100%;
      // background-color: blue;
      position: absolute;
      left: 30vh;
      animation: myfirst 0.5s;

      img {
        height: 100%;
      }
    }
  }

  .login-container-right {
    width: 50%;
    height: 50vh;
    padding-left: 10vh;

    .login-container-right-LoginCard {
      width: 55%;
      height: 50vh;
      background-color: white;
      border-radius: 10px;
      box-shadow: 0px 7px 12px gray;
      padding: 30px;
      position: relative;

      .LoginCard-title {
        width: 100%;
        text-align: center;
        font-size: 2rem;
        margin-bottom: 40px;
      }

      .LoginCard-inputBar {
        width: 80%;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 80px;
        animation: Inputfirst 0.5s;

        .LoginCard-title-inputBar {
          display: flex;
          width: 100%;
          height: 40px;
          margin-top: 15px;
          border-radius: 5px;
          border: 1px solid #ccc;
          overflow: hidden;

          .inputBar-icon {
            width: 40px;
            height: 40px;
            background-color: #eee;
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;
            border-right: 1px solid #ccc;
            text-align: center;
            line-height: 40px;
          }

          .inputBar-input {
            width: calc(100% - 40px);
            height: 100%;

            input {
              width: 100%;
              height: 100%;
              background-color: white;
              border: none;
              padding-left: 16px;
              border-top-right-radius: 5px;
              border-bottom-right-radius: 5px;
            }
          }
        }

        .LoginCard-title-verify {
          display: flex;
          justify-content: space-between;
          width: 100%;
          height: 40px;
          margin-top: 15px;

          .LoginCard-verify {
            width: 65%;
            height: 40px;
            border: 1px solid #ccc;
            border-radius: 5px;
            display: flex;
            overflow: hidden;

            .inputBar-verify-icon {
              width: 41px;
              height: 100%;
              border-right: 1px solid #ccc;
              background-color: #eee;
              text-align: center;
              line-height: 40px;
            }

            .inputBar-verify-input {
              width: calc(100% - 40px);
              height: 100%;
              border-top-right-radius: 5px;
              border-bottom-right-radius: 5px;
              background-color: aquamarine;

              input {
                width: 100%;
                height: 100%;
                border: none;
                padding-left: 15px;
              }
            }
          }

          .inputBar-verify-code {
            width: 30%;
            height: 100%;
            border-radius: 5px;
            border: 1px solid #ccc;

            img {
              width: 100%;
              height: 100%;
            }
          }
        }

        .LoginCard-title-button {
          width: 100%;
          height: 50px;
          background-color: #337ab7;
          color: white;
          line-height: 50px;
          text-align: center;
          font-size: 1.2rem;
          margin-top: 15px;
          border-radius: 5px;
          cursor: pointer;
        }

        .LoginCard-title-button:hover {
          background-color: #235987;
        }
      }
    }
  }
}

@keyframes myfirst {
  0% {
    left: -50vh;
  }

  100% {
    left: 30vh;
  }
}

@keyframes Inputfirst {
  0% {
    top: 100px;
    opacity: 0;
  }

  100% {
    top: 80px;
    opacity: 1;
  }
}
</style>
