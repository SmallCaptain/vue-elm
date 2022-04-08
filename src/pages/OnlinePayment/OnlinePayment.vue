// 在线支付页面
<template>
  <el-container id="OnlinePayment">
    <header>
      <Header fucName="在线支付"></Header>
      <!-- 剩余时间 -->
      <div class="time">
        <time-remaining />
      </div>
    </header>
    <main>
      <div class="content">
        <div class="paymentWay">
          <payment-way :orderId="orderId" />
        </div>
      </div>
    </main>
  </el-container>
</template>

<script>
import Header from "../../components/Header.vue";
import PaymentWay from "./PaymentWay.vue";
import TimeRemaining from "./TimeRemaining.vue";
export default {
  name: "OnlinePayment",
  components: {
    Header,
    TimeRemaining,
    PaymentWay,
  },
  props:{
    orderId:{
      type:String
    }
  },
  beforeRouteLeave(to, from, next) {
    // console.log(to);
    // console.log(from);
    if (to.name === "TheOrder") {
      //表明去的是确定订单页面 说明是回退。？ 如果去的是我的订单页面 说明点击确认支付
      //离开前向后台发起请求 写入订单 本次订单 未支付状态
      let shoppingCart = this.$store.state.shopping.order; //购物车
      let address = this.$store.state.shopping.address;
      let is_deal = 0;
      this.$axios
        .post("user/orderForm", {
          shoppingCart,
          address,
          is_deal,
        })
        .then((result) => {
          console.log(result.data);
        })
        .catch((err) => {
          console.log(err);
          this.$message({
            type: "error",
            message: "请求出错",
          });
        });

    //   console.log("@shoppingCart:", shoppingCart);
    }

    next();
  },
};
</script>

<style lang="less" scoped>
#OnlinePayment {
  flex-direction: column;
  background-color: #f1f1f1;
  & > header {
    display: block;
    width: 100vw;
  }
  & > main {
    display: block;
  }
}
</style>