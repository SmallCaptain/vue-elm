<template>
  <div id="UserOrderDetail">
    <header>
      <Header fucName="订单详情" />
    </header>
    <main>
      <!-- 订单状态 -->
      <div class="orderState">
        <div class="orderStateContent">
          <div class="img">
            <img
              src="http://localhost:5115/public/images/defalu_store.jpg"
              alt=""
            />
          </div>
          <div class="title">
            <span v-if="orderMessage.is_dead === 1">订单超时</span>
            <span v-else-if="orderMessage.is_deal === 1">已支付</span>
            <span v-else-if="orderMessage.is_deal === 0">未支付</span>
          </div>
          <div class="again">
            <span @click="toMerchant">再来一单</span>
          </div>
        </div>
      </div>
      <!-- 订单商品表 -->
      <ul class="list">
        <div @click="toMerchant" class="title">
          <div class="shopImg">
            <img :src="orderMessage.img" alt="" />
          </div>
          <div class="shopName">
            <span>{{ orderMessage.name }}</span>
          </div>
          <div class="arrow">
            <span class="arrow">
              <i class="el-icon-arrow-right"></i>
            </span>
          </div>
        </div>
        <li
          class="item"
          v-for="(item, index) in orderMessage.itemDatas"
          :key="index"
        >
          <div class="itemContent">
            <div class="itemName">{{ item.name }}</div>
            <div class="amount">X{{ item.amounts }}</div>
            <div class="singlePrice">￥{{ item.single_prcie }}</div>
          </div>
          <div v-if="item.is_meal === 0" class="tips">
            <span
              v-for="(property, index) in item.classify_detail"
              :key="index"
            >
              {{ property.order_item_property_value }}
            </span>
          </div>
        </li>
        <div class="shippingFee">
          <div class="itemName">配送费</div>
          <div class="singlePrice">￥{{ orderMessage.shipping_fee }}</div>
        </div>
        <!-- 总价格 -->
        <div class="totalPrice">
          <span>实付{{ orderMessage.total_price }}</span>
        </div>
      </ul>
      <!-- 配送信息 -->
      <div class="shippingMessage">
        <div class="shippingMessageContent">
          <div class="title">配送信息</div>
          <div class="shippingTime">
            <span>配送时间:</span>
            <span>尽快送达</span>
          </div>
          <div class="shippingAddress">
            <span>送货地址:</span>
            <span>{{ orderMessage.address.recive_area_detail }}</span>
          </div>
        </div>
      </div>
      <!-- 订单信息 -->
      <div class="orderMessage">
        <div class="title">订单信息</div>
        <div class="content">
          <!-- 订单号 -->
          <div class="orderId">
            <span>订单号:</span>
            <span>{{ orderMessage.order_id }}</span>
          </div>
          <!-- 订单创建时间 -->
          <div class="createTime">
            <span>创建时间:</span>
            <span>{{ getCreateTime }}</span>
          </div>
          <!-- 联系人 -->
          <div class="userName">
            <span>联系人:</span>
            <span>{{ orderMessage.address.recive_name }}</span>
          </div>
          <!-- 联系方式 -->
          <div class="phoneNumber">
            <span>联系方式:</span>
            <span>{{ orderMessage.address.use_phone }}</span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Header from "../../components/Header.vue";
export default {
  name: "UserOrderDetail",
  components: {
    Header,
  },
  data() {
    return {
      orderMessage: {},
    };
  },
  methods: {
    initOrderMessage() {
      let orderMessage = this.$store.state.shopping.order_detail;
      this.orderMessage = orderMessage;
    },
    //去商家
    toMerchant() {
      let itemObj = null;
      let id = null;
      console.log('123');
      this.$axios
        .post("merchant/getMerchantById", {
          storeId: this.orderMessage.merchant_id
        })
        .then((result) => {
          if (result.data.status === 200) {
            id = result.data.data[0].id;
            itemObj = result.data.data[0];
            console.log(id);
            console.log(itemObj);
            this.$router.push({
              name: "Merchant",
              query: {
                id,
                item: JSON.stringify(itemObj),
              },
            });
          }
        })
        .catch((err) => {
          console.log(err);
          this.$message({
            type: "error",
            message: "网络出错",
          });
        });
    },
  },
  computed: {
    getCreateTime() {
      return new Date(this.orderMessage.create_time).toLocaleString();
    },
  },
  created() {
    this.initOrderMessage();
  },
};
</script>

<style lang="less" scoped>
div#UserOrderDetail {
  display: flex;
  flex-direction: column;

  & > header {
  }
  & > main {
    & > div.orderState {
      padding: 33px;
      display: flex;
      justify-content: center;
      background-color: #fff;
      text-align: center;
      margin-bottom: 28px;
      & > div.orderStateContent {
        & > div.img {
          border: 1px solid #333;
          border-radius: 100%;
          overflow: hidden;
          & > img {
            width: 145px;
            height: 145px;
          }
        }
        & > div.title {
          font-size: 42px;
          color: #333;
          font-weight: 700;
          margin: 23px 0px;
        }
        & > div.again {
          & > span {
            display: block;
            color: #3190e8;
            border: 1px solid #3190e8;
            padding: 7px 18px;
            font-size: 28px;
          }
        }
      }
    }
    & > ul.list {
      background-color: #fff;
      padding: 0;
      list-style: none;
      margin-bottom: 28px;
      & > div.title {
        display: flex;
        line-height: 56px;
        padding: 9px 23px;
        & > div.shopImg {
          display: flex;
          align-items: center;
          margin-right: 9px;
          & > img {
            width: 56px;
            height: 56px;
          }
        }
        & > div.shopName {
          display: flex;
          align-items: center;
          flex: 1;
          font-size: 35px;
          color: #333;
          font-weight: 700;
        }
        & > div.arrow {
          display: flex;
          align-items: center;
          font-size: 32px;
          font-weight: 700;
          color: #333;
        }
      }
      & > li.item {
        & > div.itemContent {
          display: flex;
          font-size: 28px;
          height: 93px;
          line-height: 93px;
          padding: 0 23px;
          & > div.itemName {
            color: #666;
            flex: 10;
          }
          & > div.amount {
            flex: 1;
            color: #ccc;
            // margin-right: 30px;
          }
          & div.singlePrice {
            flex: 1;
            color: #666;
          }
        }
        & > div.tips {
          padding-left: 23px;
          & > span {
            font-size: 20px;
            margin-right: 15px;
            border: 1px solid #666;
            padding: 1px 10px;
            border-radius: 50px;
          }
        }
      }
      & > div.totalPrice {
        display: flex;
        justify-content: flex-end;
        padding: 0 23px;
        color: #fb6b23;
        font-size: 28px;
        font-weight: 700;
      }
      & > div.shippingFee {
        display: flex;
        font-size: 28px;
        height: 93px;
        line-height: 93px;
        padding: 0 23px;
        & > div.itemName {
          color: #666;
          flex: 1;
        }
        & > div.amount {
          color: #ccc;
          margin-right: 30px;
        }
        & div.singlePrice {
          color: #666;
        }
      }
    }
    & > div.shippingMessage {
      margin-bottom: 28px;
      background-color: #fff;

      & > div.shippingMessageContent {
        & > div.title {
          display: flex;
          padding: 23px;
          color: #333;
          font-size: 35px;
          font-weight: 500;
        }
        div:not(:first-child) {
          display: flex;
          padding: 23px;
          font-size: 30px;
          color: #666;

          span:nth-child(1) {
            margin-right: 15px;
          }
        }
      }
    }
    & > div.orderMessage {
      margin-bottom: 28px;
      background-color: #fff;

      & > div.title {
        display: flex;
        padding: 23px;
        color: #333;
        font-size: 35px;
        font-weight: 500;
      }
      & > div.content {
        & > div {
          padding: 23px;
          font-size: 30px;
          color: #666;

          span:nth-child(1) {
            margin-right: 15px;
          }
        }
      }
    }
  }
}
</style>