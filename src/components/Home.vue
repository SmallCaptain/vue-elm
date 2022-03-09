// 首页组件
<template>
  <el-container id="home">
    <!-- <el-header style="height:auto">  -->
    <!-- 头部导航栏 搜索/提示 随后去除 合并至路由视图部分 pages-->
    <!-- <Header/> -->
    <!-- </el-header> -->
    <el-main>
      <!-- 视图部分 pages -->
      <router-view></router-view>
    </el-main>
    <el-footer style="height: auto">
      <!-- 页脚部分 导航栏 -->
      <FooterNav />
    </el-footer>
  </el-container>
</template>

<script>
import FooterNav from "./FooterNav.vue";
export default {
  name: "Home",
  components: {
    FooterNav,
  },

};
</script>

<style lang="less" scoped>
#home {
  & > .el-header {
    position: sticky;
    padding: 0;
    top: 0;
  }
  & > .el-main {
    padding: 0;
  }
  & > .el-footer {
    position: fixed;
    bottom: 0;
    padding: 0;
  }
}
</style>