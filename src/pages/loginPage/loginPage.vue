<template>
  <div id="loginPage">
    <header>
      <Header :fucName="fuc.fucName" />
    </header>
    <div class="main">
      <!-- 第一个部分 输入交互部分 -->
      <div class="login">
        <div class="username">
          <el-input placeholder="请输入内容" v-model="username" clearable>
          </el-input>
        </div>
        <div class="password">
          <el-input
            placeholder="请输入密码"
            v-model="password"
            show-password
          ></el-input>
        </div>
        <div class="veriCode">
          <el-input v-model="vericode" placeholder="请输入内容"></el-input>
        </div>
      </div>
      <!-- 第二个部分 提醒部分 -->
      <div class="metion"></div>
      <!-- 第三个部分 登录按钮+重置密码 -->
      <div class="loginBtn"></div>
    </div>
  </div>
</template>

<script>
import Header from "../../components/Header.vue";
export default {
  name: "loginPage",
  components: {
    Header,
  },
  data() {
    return {
      fuc: {
        fucName: "密码登录",
      },
      username:'',
      password:'',
      vericode:''
    };
  },
};
</script>

<style lang="less" scoped>
</style>