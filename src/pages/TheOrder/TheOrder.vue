<template>
  <el-container id="TheOrder">
    <el-header>
      <Header :fucName="fucName"></Header>
    </el-header>
    <el-main>
      <section>
        <!--收货地址-->
        <div class="reciveAddress">
          <sure-address :address="reciveAddress[0]" />
        </div>
        <!--送达时间 -->
        <div class="sendTime">
            <send-time/>
        </div>
        <!-- 支付方式 -->
        <div class="payWay">
            <pay-way />
        </div>
        <!--订单商品-->
        <div class="order">
          <order />
        </div>
      </section>
    </el-main>
    <el-footer>
      <!-- 确认订单 -->
      <div class="orderForm">
        <order-form />
      </div>
    </el-footer>
  </el-container>
</template>

<script>
import Header from "../../components/Header.vue";
import Order from './Order.vue';
import OrderForm from './OrderForm.vue';
import PayWay from './PayWay.vue';
import SendTime from './SendTime.vue';
import SureAddress from "./SureAddress.vue";
export default {
  name: "TheOrder",
  components: {
    Header,
    SureAddress,
    SendTime,
    PayWay,
    Order,
    OrderForm,
  },
  data() {
    return {
      fucName: "确定订单",
      //向后端请求的收货地址
      reciveAddress: [],
    };
  },
  beforeRouteEnter(to, from, next) {
    let token = sessionStorage.getItem("Token");
    if (!token) {
      confirm("请先登录！");
    } else {
      next();
    }
  },
};
</script>

<style lang="less" scoped>
#TheOrder {
  & > .el-header {
    padding: 0;
    height: auto !important;
  }
  & > .el-main {
    padding: 0;
    margin-bottom: 107px;
    & > section{
      & > div.reciveAddress{

      }
      & > div.sendTime{
        margin-top: 16px;
      }
      & > div.payWay{
        margin-top: 16px;
      }
      & >div.order{
        margin-top: 16px;
      }
    }
  }
  & > .el-footer{
    position: fixed;
    bottom: 0;
    width: 100vw;
    height: auto !important;
    padding: 0;
  }
}
</style>