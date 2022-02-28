// 重置密码的页面
<template>
  <el-container id="reset">
    <el-header>
      <Header :fucName="fuc.fucname" />
    </el-header>
    <el-main>
      <div class="reset">
        <!-- 账号 -->
        <div class="username">
          <input
            v-model="username"
            autocomplete="off"
            type="text"
            placeholder="账号"
          />
        </div>
        <!-- 旧密码 -->
        <div class="oldpassword">
          <input
            v-model="oldPassword"
            autocomplete="off"
            type="text"
            placeholder="旧密码"
          />
        </div>
        <!-- 新密码 -->
        <div class="newpassword">
          <input
            v-model="newPassword"
            autocomplete="off"
            type="text"
            placeholder="新密码"
          />
        </div>
        <!-- 确认新密码 -->
        <div class="confiNewPassword">
          <input
            v-model="confiNewPassword"
            autocomplete="off"
            type="text"
            placeholder="确认新密码"
            @blur="confirmPassword"
          />
        </div>
        <!-- 验证码 -->
        <div class="veriCode">
          <input
            v-model="vericode"
            autocomplete="off"
            type="text"
            placeholder="验证码"
          />
          <verification-code
            width="100%"
            height="100%"
            v-model="validCode"
            @sendData="getCode"
          />
        </div>
      </div>
      <el-button @click="reset" type="primary" size="medium" plain
        >修改密码</el-button
      >
    </el-main>
  </el-container>
</template>

<script>
import Header from "../../components/Header.vue";
import verificationCode from "../loginPage/verificationCode.vue";
export default {
  name: "resetPage",
  components: { Header, verificationCode },
  data() {
    return {
      fuc: {
        fucname: "重置密码",
      },
      validCode: "",
      vericode: "",
      username: "",
      oldPassword: "",
      newPassword: "",
      confiNewPassword: "",
    };
  },
  methods: {
    getCode(data) {
      this.validCode = data;
    },
    reset() {
      if (this.validCode === this.vericode) {
        // 确保确认新密码正确
        if (this.newPassword === this.confiNewPassword) {
          let user = {
            username: this.username.replace(/\s+/g, ""),
            newPassword: this.newPassword.replace(/\s+/g, ""),
            oldPassword: this.oldPassword.replace(/\s+/g, ""),
          };
          if (
            user.username !== "" &&
            user.newPassword !== "" &&
            user.oldPassword !== ""
          ) {
            // 准备发送ajax请求
            this.$axios
              .post("/login/reset", user)
              .then((result) => {
                if (result.data.status) {
                  // 表示状态正确
                  this.$message({
                    message: result.data.msg,
                    type: "success",
                  });
                  this.$router.replace({
                    path:'/home/personal'
                  });
                } else {
                  this.$message({
                    message: result.data.msg,
                    type: "error",
                  });
                }
              })
              .catch((err) => {
                console.log(`err`, err);
                this.$message({
                  message: "未知错误",
                  type: "error",
                });
              });
          } else {
            this.$message({
              message: "请确认用户名、新密码、旧密码不为空！",
              type: "error",
            });
          }
        } else {
          this.$message({
            message: "请确认新密码一致",
            type: "error",
          });
        }
      } else {
        this.$message({
          message: "验证码错误,请检查",
          type: "error",
        });
      }
    },
    confirmPassword() {
      if (this.newPassword !== this.confiNewPassword) {
        this.$message({
          message: "请确认新密码一致",
          type: "error",
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
#reset {
  .el-header {
    height: auto !important;
    padding: 0;
    margin: 0;
  }
  .el-main {
    padding: 0;
    margin: 0;

    & > div.reset {
      display: flex;
      flex-direction: column;
      background-color: white;
      height: 475px;
      margin-top: 40px;

      div {
        flex: 1;
        border: 1px solid #f1f1f1;

        input {
          display: inline-block;
          font-size: 35px;
          outline: none;
          border: none;
          padding: 28px 38px;
        }
      }
      & > div.veriCode {
        display: flex;
        overflow: hidden;
      }
    }
    & > .el-button {
      margin-top: 50px;
      width: 100%;
      height: 80px;
      font-size: 50px;
    }
  }
}
</style>