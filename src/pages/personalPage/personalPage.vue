<template>
  <transition name="el-fade-in">
    <el-container id="container">
      <el-header style="height: auto">
        <!-- 头部 放置组件 -->
        <Header :fucName="fuc.fucName" />
      </el-header>
      <el-main>
        <!-- 主体部分 -->
        <!-- 第一部分 头像 登录注册 + 余额信息等 -->
        <div class="msg">
          <person-img />
        </div>
        <!-- 第二部分 订单、商城、会员卡 -->
        <div class="func"></div>
        <!-- 第三部分 客服和相关详细说明选项 -->
        <div class="help"></div>
      </el-main>
    </el-container>
  </transition>
</template>

<script>
import Header from "../../components/Header.vue";
import PersonImg from "./personImg.vue";
export default {
  name: "personalPage",
  components: {
    Header,
    PersonImg,
  },
  data() {
    return {
      fuc: {
        fucName: "个人",
      },
    };
  },
};
</script>

<style lang="less" scoped>
@height: 90px;
#container {
  position: relative;
  & > .el-header {
    position: fixed;
    top: 0;
    width: 100vw;
    padding: 0;
  }
  & > .el-main {
    padding: @height 0 0 0;
  }
}
</style>