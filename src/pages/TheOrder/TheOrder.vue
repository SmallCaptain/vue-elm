<template>
  <el-container id="TheOrder">
    <el-header>
      <Header :fucName="fucName"></Header>
    </el-header>
    <el-main>
      <section>
        <!--收货地址-->
        <div class="reciveAddress">
          <sure-address
            @chageAddressShow="chageAddressShow"
            :address="address"
          />
        </div>
        <!--送达时间 -->
        <div class="sendTime">
          <send-time :merchant="sendTimeObj" />
        </div>
        <!-- 支付方式 -->
        <div class="payWay">
          <pay-way />
        </div>
        <!--订单商品-->
        <div class="order">
          <order :merchant="merchantMessage" />
        </div>
      </section>

      <!-- 修改收货地址 -->
      <div class="chageAddress">
        <transition name="popup">
          <chage-address
            @chageAddressShow="chageAddressShow"
            :show="showChageAddress"
            :reciveAddress="reciveAddress"
            @chageAddress="chageAddress"
          />
        </transition>
      </div>
    </el-main>
    <el-footer>
      <!-- 确认订单 -->
      <div class="orderForm">
        <order-form :merchant="merchantMessage" />
      </div>
    </el-footer>
  </el-container>
</template>

<script>
import Header from "../../components/Header.vue";
import ChageAddress from "./ChageAddress/ChageAddress.vue";
import Order from "./Order.vue";
import OrderForm from "./OrderForm.vue";
import PayWay from "./PayWay.vue";
import SendTime from "./SendTime.vue";
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
    ChageAddress,
  },
  data() {
    return {
      fucName: "确定订单",
      //向后端请求的收货地址
      reciveAddress: [],
      address: {},
      merchantMessage: {},
      sendTimeObj: {},
      showChageAddress: false,
    };
  },
  props: {
    storeId: {
      type: String,
    },
  },
  methods: {
    getStoreMessage() {
      return new Promise((resolve, reject) => {
        this.$axios
          .post("merchant/getMerchantById", {
            storeId: this.storeId,
          })
          .then((result) => {
            resolve(result.data);
          })
          .catch((err) => {
            console.log(err);
            reject(null);
          });
      });
    },
    getAddress() {
      return new Promise((resolve, reject) => {
        this.$axios
          .post("user/getAddress")
          .then((result) => {
            resolve(result.data);
          })
          .catch((err) => {
            console.log(err);
            reject(null);
          });
      });
    },
    async sendRequest() {
      //先获取地址  获取商家信息
      let arr = [this.getAddress(), this.getStoreMessage()];
      let res = await Promise.all(arr);
      let flag = true;
      for (let i = 0; i < res.length; i++) {
        if (res[i] === null) {
          this.$message({
            type: "error",
            message: "接口异常",
          });
          flag = false;
          break;
        }
      }
      if (flag) {
        this.reciveAddress = res[0];
        this.address = this.reciveAddress[0];
        this.merchantMessage = res[1].data[0];
        this.dealTime();
      }
    },
    //处理时间数据 转换格式 并写入sendTimeObj
    dealTime() {
      let time = this.merchantMessage.shipping_time;
      let nowtime = new Date().getTime();
      time = time * 60 * 1000; //time单位 分钟  ====> 毫秒

      let date = new Date(nowtime + time);
      date = date.toLocaleTimeString().split(":");
      date = [date[0], date[1]].join(":");
      let obj = {
        is_hummingbird: this.merchantMessage.is_hummingbird,
        shipping_time: date,
      };
      this.sendTimeObj = obj;
    },
    // 修改收货显示
    chageAddressShow() {
      this.showChageAddress = !this.showChageAddress;
    },
    //修改收货地址信息
    chageAddress(index) {
      this.address = this.reciveAddress[index];
      this.chageAddressShow();
    },
  },
  created() {
    //请求数据
    this.sendRequest();
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
    position: relative;
    z-index: 25;
    padding: 0;
    margin-bottom: 107px;
    & > section {
      & > div.reciveAddress {
      }
      & > div.sendTime {
        margin-top: 16px;
      }
      & > div.payWay {
        margin-top: 16px;
      }
      & > div.order {
        margin-top: 16px;
      }
    }
    & > div.chageAddress {
      position: fixed;
      top: 0;
      left: 0;
    }
  }
  & > .el-footer {
    position: fixed;
    bottom: 0;
    width: 100vw;
    height: auto !important;
    padding: 0;
  }
}
</style>