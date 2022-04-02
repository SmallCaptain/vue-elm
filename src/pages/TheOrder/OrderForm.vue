<template>
  <div id="OrderForm">
    <div class="OrderFormContent">
      <div class="message">
        <span class="title">待支付</span>
        <span class="price">￥{{totalPrice}}</span>
      </div>
      <div class="orderBtn">
        <span @click="doOrder">确定下单</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderForm",
  props: {
    merchant: {
      type: Object,
      default() {
        return {
          name: "无",
          img: "",
          shipping_fee: 5,
        };
      },
    },
  },
  data() {
    return {
      totalPrice: 0,
    };
  },

  methods: {
    // 初始化订单总价格
    initTotalPrice(merchant) {
      let shoppingCart = this.$store.state.shopping.shoppingCart;
      let cart = null;
      let totalPrice = 0;
      for (let i = 0; i < shoppingCart.length; i++) {
        if (shoppingCart[i].storeId === merchant.id) {
          cart = shoppingCart[i].data;
          break;
        }
      }
      if (cart.length === 0) {
        confirm("嘿！你没有选择购物商品！");
        this.$router.go(-1);
      } else {
          cart.forEach(obj => {
              totalPrice += obj.counts * obj.item.price;
          });
          this.totalPrice = totalPrice + this.merchant.shipping_fee;
      }
    },
    //下单
    doOrder(){
        console.log(this.totalPrice);
    }
  },
  watch: {
    merchant: {
      deep: true,
      handler(newvalue) {
        this.initTotalPrice(newvalue);
      },
    },
  },
};
</script>

<style lang="less" scoped>
div#OrderForm {
  & > div.OrderFormContent {
    display: flex;
    span {
      color: #fff;
      font-size: 32px;
    }
    & > div.message {
      flex: 5;
      background-color: #3c3c3c;
      padding: 33px;
    }
    & > div.orderBtn {
      flex: 2;
      background-color: #50d372;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>