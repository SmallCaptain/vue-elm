<template>
  <div id="Order">
    <div class="OrderContent">
      <!-- 商家名 -->
      <div class="merchantTitle">
        <span class="img">
          <img :src="merchant.img" alt="" />
        </span>
        <span class="title">{{ merchant.name }}</span>
      </div>
      <ul class="list">
        <li class="item" v-for="(item, index) in shoppingCart" :key="index">
          <span class="shopName">{{ item.item.name }}</span>
          <div class="value">
            <span class="amounts">x{{ item.counts }}</span>
            <span class="price">￥{{ item.counts * item.item.price }}</span>
          </div>
        </li>

        <!-- 配送费 无需循环生成 -->
        <li class="item">
          <span class="shopName">配送费</span>
          <div class="value">
            <span class="amounts"></span>
            <span class="price">￥{{ merchant.shipping_fee }}</span>
          </div>
        </li>
      </ul>
      <!-- 订单 -->
      <div class="total">
        <div class="title">
          <span class="title">订单</span>
          <span class="price">￥{{getTotalPrice}}</span>
        </div>
        <!-- 总和价格 -->
        <div class="value">
          <span class="title">待支付</span>
          <span class="price">￥{{getTotalPrice}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Order",
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
      shoppingCart: [],
      merchantData: {},
    };
  },
  computed: {
    getTotalPrice(){
      let total = 0;

      this.shoppingCart.forEach(item=>{
        total += item.counts * item.item.price;
      })
      total +=this.merchantData.shipping_fee;
      return total;
    }
  },
  methods: {
    //vuex中获取所有购物车数据
    getShoppingCart() {
      let shoppingCart = this.$store.state.shopping.shoppingCart;
      let cart = null;

      for (let i = 0; i < shoppingCart.length; i++) {
        if (shoppingCart[i].storeId === this.merchantData.id) {
          cart = shoppingCart[i].data;
          break;
        }
      }
      if (cart.length === 0) {
        confirm("嘿！你没有选择购物商品！");
        this.$router.go(-1);
      } else {
        this.shoppingCart = cart;
      }
    },
  },

  watch: {
    merchant: {
      deep: true,
      handler(newvalue) {
        this.merchantData = newvalue;
        this.getShoppingCart();
      },
    },
  },
};
</script>

<style lang="less" scoped>
div#Order {
  background-color: white;
  & > div.OrderContent {
    & > div.merchantTitle {
      padding: 0 33px;

      display: flex;
      height: 110px;
      border: 2px solid #f5f5f5;
      border-left: none;
      border-right: none;
      align-items: center;
      & > span.img {
        margin-right: 10px;
        & > img {
          display: inline-block;
          width: 50px;
          height: 50px;
          object-fit: cover;
        }
      }
      & > span.title {
        font-size: 32px;
        color: #333;
        font-weight: 500;
      }
    }
    & > ul.list {
      margin-top: 33px;
      padding: 0 33px;

      border-bottom: 1px solid #f5f5f5;
      & > li.item {
        display: flex;
        justify-content: space-between;
        font-size: 26px;
        color: #666666;
        padding: 15px 0px;
        margin-top: 31px;

        & > span.shopName{
          flex: 3;
        }
        & > div.value {
          display: flex;
          justify-content: space-between;
          flex: 1;
          & > span.amounts {
            letter-spacing: 10px;
          }
          & > span.price {
            color: #ff6600;
          }
        }
      }
    }
    & > div.total {
      padding: 11px 33px;
      margin-top: 15px;
      display: flex;
      justify-content: space-between;

      span {
        font-size: 25px;
        color: #333;
      }
      & > div.title {
        & > span.title {
          margin-right: 8px;
        }
      }
      & > div.value {
        & > span {
          color: #ff6600;
        }
        & > span.title {
          margin-right: 8px;
        }
      }
    }
  }
}
</style>