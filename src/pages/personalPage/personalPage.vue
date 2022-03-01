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
        <div class="func">
          <jump-to-func
            v-for="(item, index) in userFunc"
            :key="index"
            :funcData="item"
          />
        </div>
        <!-- 第三部分 客服和相关详细说明选项 -->
        <div class="help">
          <jump-to-func
            v-for="(item, index) in service"
            :key="index"
            :funcData="item"
          />
        </div>
      </el-main>
    </el-container>
  </transition>
</template>

<script>
import Header from "../../components/Header.vue";
import JumpToFunc from "../../components/JumpToFunc.vue";
import PersonImg from "./personImg.vue";
export default {
  name: "personalPage",
  components: {
    Header,
    PersonImg,
    JumpToFunc,
  },
  data() {
    return {
      fuc: {
        fucName: "个人",
      },
      // 功能的数据
      userFunc: [
        {
          icon: "el-icon-tickets",
          funcName: "我的订单",
          pathName: "",
          color: "rgb(102, 102, 102)",
        },
        {
          icon: "el-icon-present",
          funcName: "积分商城",
          pathName: "",
          color: "#FC7B53",
        },
        {
          icon: "el-icon-s-flag",
          funcName: "饿了么会员卡",
          pathName: "",
          color: "#FFC636",
        },
      ],
      // 服务功能的数据
      service: [
        {
          icon: "el-icon-tickets",
          funcName: "服务中心",
          pathName: "",
          color: "#4AA5F0",
        },
        {
          icon: "el-icon-tickets",
          funcName: "下载饿了么APP",
          pathName: "",
          color: "#4AA5F0",
        }
      ],
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

    & > div.func {
      margin-top: 20px;
    }
    & > div.help{
      margin-top: 20px;
    }
  }
}
</style>