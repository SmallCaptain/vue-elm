// 用户订单列表页
<template>
    <div id="UserOrderList">
      <header>
        <Header fucName="我的订单" />
      </header>
      <main>
        <ul class="orderList">
          <li class="orderItem" v-for="(item,index) in orderList" :key="index">
            <UserOrderItem :orderItem="item" />
          </li>
        </ul>
      </main>
    </div>
</template>

<script>
import Header from "../../components/Header.vue";
import UserOrderItem from "./UserOrderItem.vue";
export default {
  name: "UserOrderList",
  components: {
    Header,
    UserOrderItem,
  },
  data() {
      return {
          orderList:[],
      }
  },
  methods: {
    chageNav() {
      //修改当前路由
      this.$store.dispatch("nav/setRouteName", "UserOrderList");
    },
    async getOrderList() {
      let data = await new Promise((resolve, reject) => {
        this.$axios
          .post("user/getOrderList")
          .then((result) => {
            resolve(result.data);
          })
          .catch((err) => {
            console.log(err);
            this.$message({
              type: "error",
              message: "网络请求出错",
            });
            reject(null);
          });
      });
      if (data) {
          // console.log(data);
        this.orderList = data.data;
      }
    },
  },
  created() {
    this.chageNav();
    //发送 ajax请求 获取订单相关数据
    this.getOrderList();
  },
};
</script>

<style lang="less" scoped>
div#UserOrderList {
  display: flex;
  flex-direction: column;
  margin-bottom: 90px;
  & > main {
    & > ul.orderList {
      padding: 0;
      list-style: none;
      & > li.orderItem {
      }
    }
  }
}
</style>