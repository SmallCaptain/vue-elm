<template>
  <el-container id="merchant">
    <el-header>
      <!-- header部分 -->
      <merchant-header />
      <!-- 导航条部分 -->
      <merchant-nav @chageShow="chageShow" />
    </el-header>
    <el-main>
      <keep-alive>
        <transition name="fade">
          <component :storeId="id" :is="componentTag"></component>
        </transition>
      </keep-alive>
    </el-main>
  </el-container>
</template>

<script>
import MerchantHeader from "./MerchantHeader.vue";
import MerchantNav from "./MerchantNav.vue";
import MerchantItemList from "./MerchantItemList/MerchantItemList.vue";
export default {
  components: { MerchantHeader, MerchantNav, MerchantItemList },
  name: "Merchant",
  props: {
    id: {
      type: String,
    },
  },
  data() {
    return {
      componentTag: MerchantItemList,
    };
  },
  methods: {
    chageShow(data) {
      if (data !== "") {
        this.componentTag = data;
      }
    },
  },
};
</script>

<style lang="less" scoped>
#merchant {
  display: flex;
  height: 100vh;
  & > .el-header {
    height: auto !important;
    padding: 0;
  }
  & > .el-main {
    padding: 0;
  }
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave {
  opacity: 1;
}
.fade-leave-active,
.fade-enter-active {
  transition: all 0.3s;
}
.fade-leave-active {
  display: none;
}
</style>