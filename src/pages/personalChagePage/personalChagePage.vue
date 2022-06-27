<template>
  <el-container id="perChagePage">
    <el-header> <Header :fucName="func.funcName" /> </el-header>
    <el-main>
      <div class="msg">
        <Msg @updateImg="updateImg" :user="user" />
      </div>
      <div class="phone">
        <jump-to-func :funcData="assectInfo[0]">
          <template v-slot:methion>
            <div class="methionSlot">账号绑定</div>
          </template>
        </jump-to-func>
      </div>
      <div class="safe">
        <jump-to-func :funcData="assectInfo[1]">
          <template v-slot:methion>
            <div class="methionSlot">安全设置</div>
          </template>
          <template v-slot:username>
            <span class="methionSlotChage">修改</span>
          </template>
        </jump-to-func>
      </div>
      <el-button @click="logOut" type="danger">退出登录</el-button>
    </el-main>
  </el-container>
</template>

<script>
import Header from "../../components/Header.vue";
import JumpToFunc from "../../components/JumpToFunc.vue";
import Msg from "./msg.vue";

export default {
  name: "personalChagePage",
  components: { Header, Msg, JumpToFunc },
  data() {
    return {
      func: {
        funcName: "账号信息",
      },
      assectInfo: [
        {
          pathName: "",
          icon: "el-icon-mobile",
          color: "",
          funcName: "手机",
        },
        {
          pathName: "resetPssword",
          icon: "",
          color: "",
          funcName: "登录密码",
        },
      ],
      user: {},
    };
  },
  mounted() {
    this.getUseData();
  },
  methods: {
    getUseData() {
      this.$axios
        .post("/user/getUserMsg")
        .then((result) => {
          // console.log(`后台数据@`,result.data.user );
          // console.log(this);
          this.user = result.data.user;
          // console.log(this.user);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateImg(src) {
      this.$set(this.user, "img", src);
    },
    logOut() {
      this.$store.dispatch("user/setUser", {
        username: "",
        isLogin: false,
        Token: null,
      });
      sessionStorage.removeItem('Token');
      this.$router.push({
        path:'/'
      });
    },
  },
};
</script>

<style lang="less" scoped>
@height: 90px;
#perChagePage {
  & > .el-header {
    height: auto !important;
    padding: 0;
    margin: 0;
  }
  & > .el-main {
    margin: 0px;
    padding: 0px;

    & > .el-button {
      display: block;
      width: 97%;
      height: 80px;
      font-size: 35px;
      margin: 0 auto;
      margin-top: 50px;
    }
  }
}
</style>