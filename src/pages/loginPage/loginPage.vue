<template>
  <div id="loginPage">
    <header>
      <Header :fucName="fuc.fucName" />
    </header>
    <div class="main">
      <!-- 第一个部分 输入交互部分 -->
      <div class="login">
        <div class="username">
          <input
            id="usernameInput"
            type="text"
            placeholder="账号"
            v-model="username"
            autocomplete="“off”"
          />
        </div>
        <div class="password">
          <input
            type="password"
            id="passwordInput"
            placeholder="密码"
            v-model="password"
            v-show="passwordSwitch"
            autocomplete="“off”"
          />
          <input
            type="text"
            placeholder="密码"
            v-model="password"
            v-show="!passwordSwitch"
            autocomplete="“off”"
          />
          <i
            class="el-icon-view"
            :style="{ color: passwordSwitch ? 'red' : 'green' }"
            @click="changeView"
          ></i>
        </div>
        <div class="veriCode">
          <input
            id="veriCodeInput"
            placeholder="验证码"
            type="text"
            v-model="vericode"
            autocomplete="“off”"
          />
          <verification-code
            width="100%"
            height="100%"
            v-model="validCode"
            @sendData="getCode"
          />
        </div>
      </div>
      <!-- 第二个部分 提醒部分 -->
      <div class="metion">
        <el-alert
          title="提 示:"
          type="info"
          description="如 果 账 号 未 注 册 会 自 动 注 册"
          :closable="false"
          show-icon
        >
        </el-alert>
      </div>
      <!-- 第三个部分 登录按钮+重置密码 -->
      <div class="loginBtn">
        <el-button @click="login" type="primary" size="medium" plain
          >登录</el-button
        >
        <router-link
          class="reset"
          :to="{
            name: 'resetPssword',
          }"
          >重置密码</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../../components/Header.vue";
import verificationCode from "./verificationCode.vue";
export default {
  name: "loginPage",
  components: {
    Header,
    verificationCode,
  },
  data() {
    return {
      fuc: {
        fucName: "密码登录",
      },
      username: "",
      password: "",
      vericode: "",
      passwordSwitch: false,
      validCode: "",
    };
  },
  methods: {
    changeView() {
      this.passwordSwitch = !this.passwordSwitch;
    },
    getCode(data) {
      this.validCode = data;
    },
    login() {
      // 第一层判断 验证码是否正确
      if (this.validCode === this.vericode) {
        console.log("验证1码正确");
        let user = {
          username: this.username.replace(/\s+/g,''),
          password: this.password.replace(/\s+/g,''),
        };
        if (user.username !== "" && user.password !== "") {
          // 发送ajax请求啦

          this.$axios
            .post("/login/loginUser", user)
            .then((result) => {
              // console.log("success");
              if (result.data.status === true) {
                this.$message({
                  message: result.data.msg,
                  type: "success",
                });
                sessionStorage.setItem("Token", result.data.token);
                this.$router.replace({
                  path:'home/personal'
                });
              } else {
                this.$message({
                  message: result.data.msg,
                  type: "error",
                });
              }
            })
            .catch((err) => {
              // console.log("err!");
              console.log(err);
              this.$message({
                message: "未知错误",
                type: "error",
              });
            });
        } else {
          this.$message({
            message: "密码和账号不可为空",
            type: "error",
          });
        }
      } else {
        console.log("验证码错误");
        this.$message({
          message: "验证码错误,请检查",
          type: "error",
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
div#loginPage {
  & > header {
  }
  & > div.main {
    & > div.login {
      margin-top: 30px;
      height: 300px;
      background-color: white;
      display: flex;
      flex-direction: column;
      input {
        display: inline-block;
        font-size: 35px;
        outline: none;
        border: none;
        padding: 28px 38px;
      }
      div {
        border: 1px solid #f1f1f1;
      }
      label {
        font-size: 40px;
      }
      & > div.username {
        flex: 1;
      }
      & > div.password {
        position: relative;
        flex: 1;

        & > i {
          position: absolute;
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 65px;
        }
      }
      & > div.veriCode {
        flex: 1;
        display: flex;
        overflow: hidden;
      }
    }
    & > div.metion {
    }
    & > div.loginBtn {
      & > .el-button {
        width: 100%;
        height: 80px;
        font-size: 50px;
      }
      & > .reset {
        display: block;
        width: 200px;
        margin-top: 30px;
        margin-left: auto;
        margin-right: 0;
      }
    }
  }
}
</style>