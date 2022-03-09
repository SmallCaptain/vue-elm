// 我的优惠页面 里面有两个页面  红包页面和商家代金券
<template>
  <el-container id="UserDiscounts">
    <el-header>
      <Header :fucName="func.funcName" />
    </el-header>
    <el-main>
      <!-- 导航栏 红包+商家代金卷 -->
      <nav class="topNav">
        <div class="topNavContainer">
          <div class="topNavItem" v-for="(item, index) in navTop" :key="index">
            <span
              @click="switchView(index, item.routeName)"
              :class="{ navSelected: navTopSelected === index }"
              >{{ item.name }}</span
            >
          </div>
        </div>
      </nav>
      <!-- 导航栏的页面 -->
      <div class="navShow">
        <router-view></router-view>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import Header from "../../components/Header.vue";
export default {
  components: { Header },
  name: "UserDiscounts",
  data() {
    return {
      func: {
        funcName: "我的优惠",
      },
      navTop: [
        {
          name: "红包",
          routeName: "RedPacket",
        },
        {
          name: "商家代金券",
          routeName: "",
        },
      ],
      navTopSelected: 0,
      navFooter: [
        {
          name: "兑换红包",
          routeName: "",
        },
        {
          name: "推荐有奖",
          routeName: "",
        },
      ],
    };
  },
  methods: {
    switchView(index, routeName) {
      this.navTopSelected = index;
      alert(routeName);
      this.$router.push({
        name:'RedPacket'
      })
    },
  },
};
</script>

<style lang="less" scoped>
#UserDiscounts {
  & > .el-header {
    padding: 0;
    height: auto !important;
  }
  & > .el-main {
    padding: 0;
    & > nav.topNav {
      background-color: white;
      height: 93px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      & > div.topNavContainer {
        display: flex;
        justify-content: space-around;
        & > div.topNavItem {
          & > span {
            display: block;
            margin: 0 auto;
            font-size: 30px;
            color: #333;
            padding-bottom: 8px;
          }
        }
      }
    }
  }
}
.navSelected {
  border-bottom: 5px solid #3190e8;
  color: #3190e8 !important;
}
</style>