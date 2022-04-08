// 用户的订单组件 
// 用于展示每一条用户订单
<template>
  <div id="UserOrderItem">
    <div class="UserOrderItemContent">
      <!-- 第一部分头像 -->
      <div class="avatar">
        <!-- 头像 -->
        <img :src="orderItemCopy.img" alt="" />
      </div>
      <!-- 第二部分是具体订单 -->
      <div @click="toOrderDetail" class="msg">
        <!--第一行 名称 日期 等-->
        <div class="titleTime">
          <div class="title">
            <div class="name">
              <span class="name">{{ orderItemCopy.name }}</span>
              <span class="arrow"><i class="el-icon-arrow-right"></i></span>
            </div>
            <div class="state">
              <span v-if="orderItemCopy.is_dead === 1">支付超时</span>
              <span v-else-if="orderItemCopy.is_deal === 0">未支付</span>
              <span v-else-if="orderItemCopy.is_deal === 1">已支付</span>
            </div>
          </div>
          <div class="createTime">
            {{ getCreate_time }}
          </div>
        </div>
        <!-- 第二行 商品 总价格 -->
        <div class="totalprice">
          <div class="item">
            <span>{{ orderItemCopy.itemDatas[0].name }}</span>
            <span>   等{{ totalAmount }}件商品</span>
          </div>
          <div class="price">
            <span>￥{{ orderItemCopy.total_price }}</span>
          </div>
        </div>
        <!-- 第三行 去支付 再来一单 等 -->
        <div class="control">
          <!-- 已支付 或者 已超时 -->
          <div
            class="payed"
            v-if="orderItemCopy.is_deal === 1 || orderItemCopy.is_dead === 1"
          >
            <span @click.stop="toMerchant">再来一单</span>
          </div>
          <!-- 未支付 且 未超时 -->
          <div v-else-if="orderItemCopy.is_deal === 0 && time > 0" class="time">
            <span @click.stop="toPay">去支付(还剩{{ timeMethion }})</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserOrderItem",
  props: {
    orderItem: {
      type: Object,
      default() {
        return {
          merchant_id: "1",
          img: "http://localhost:5115/public/images/defalu_store.jpg",
          name: "商家1",
          create_time: "1649387299476",
          dead_time: "1649388199476",
          total_price: 103,
          is_dead: 0,
          is_deal: 0,
        };
      },
    },
  },
  data() {
    return {
      orderItemCopy: {},
      time: 0,
      timeMethion: "",
    };
  },
  computed: {
    getCreate_time() {
      return new Date(
        Number.parseInt(this.orderItemCopy.create_time)
      ).toLocaleString();
    },
    getDead_time() {
      return new Date(
        Number.parseInt(this.orderItemCopy.dead_time)
      ).toLocaleString();
    },
    totalAmount() {
      let amount = 0;
      for (let item of this.orderItemCopy.itemDatas) {
        amount += item.amounts;
      }
      return amount;
    },
  },
  methods: {
    initOrderItemCopy() {
      this.orderItemCopy = this.orderItem;
    },
    //初始化时间 转化为数字时间戳
    initTime() {
      this.orderItemCopy.create_time = Number.parseInt(
        this.orderItemCopy.create_time
      );
      this.orderItemCopy.dead_time = Number.parseInt(
        this.orderItemCopy.dead_time
      );
      let now = Date.now();
      this.time = this.orderItemCopy.dead_time - now;
    },
    //访问接口 将订单设为超时
    orderFormDeaded() {
      let order_id = this.orderItemCopy.order_id;
      this.$axios
        .post("user/orderDeadPay", {
          order_id: order_id,
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //创建计时器
    createTimeInterval() {
      if (this.timer !== null) {
        clearInterval(this.timer);
      }
      if (this.orderItemCopy.is_deal === 0) {
        if (this.time > 0) {
          //大于0的时候 才开始计时器
          let timer = setInterval(() => {
            if (this.time <= 0) {
              clearInterval(this.timer);
              //超时！
              this.orderItemCopy.is_dead = 1;
              this.orderFormDeaded();
            } else {
              this.time -= 1000;
              let min = Number.parseInt(this.time / (60 * 1000));
              let second = Number.parseInt((this.time % (60 * 1000)) / 1000);

              min = min < 10 ? "0" + min : min;
              second = second < 10 ? "0" + second : second;

              this.timeMethion = `${min}分${second}秒`;
            }
          }, 1000);

          this.timer = timer;
        }
      }
    },
    // 去支付
    toPay() {
      this.$router.push({
        name: "OnlinePayment",
        query: {
          orderId: this.orderItemCopy.order_id,
        },
      });
    },
    //去商家
    toMerchant(){
        let itemObj = null;
        let id = null;

        this.$axios.post('merchant/getMerchantById',{
            storeId:this.orderItemCopy.merchant_id
        }).then((result) => {
            if(result.data.status === 200){
                id = result.data.data[0].id;
                itemObj = result.data.data[0];
                console.log(id);
                console.log(itemObj)
                this.$router.push({
                    name:'Merchant',
                    query:{
                        id,
                        item:JSON.stringify(itemObj)
                    }
                });
            }
        }).catch((err) => {
            console.log(err)
            this.$message({
                type:'error',
                message:'网络出错'
            });
        });
    },
    //订单详情
    toOrderDetail(){
      this.$store.dispatch('shopping/chageOrderDetail',this.orderItemCopy);
      this.$router.push({
        name:'UserOrderDetail'
      });
    }
  },
  created() {
    //   初始化 orderItemCopy
    this.initOrderItemCopy();
    this.initTime();
    // 创建计时器
    this.createTimeInterval();
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  //   watch:{
  //       time:{
  //           handler(newvalue){
  //               if (newvalue <= 0) {
  //                   console.log('订单超时啦');
  //               }
  //           }
  //       }
  //   }
};
</script>

<style lang="less" scoped>
div#UserOrderItem {
  margin-bottom: 23px;
  & > div.UserOrderItemContent {
    display: flex;
    padding: 28px 28px 0 28px;
    background-color: #fff;

    & > div.avatar {
      margin-right: 18.75px;
      & > img {
        width: 93px;
        height: 93px;
        object-fit: cover;
      }
    }
    & > div.msg {
      flex: 1;
      & > div.titleTime {
        border-bottom: 2px solid #fbfbfb;
        padding-bottom: 14px;
        & > div.title {
          display: flex;
          justify-content: space-between;
          & > div.name {
            display: flex;
            & > span.name {
              font-size: 35px;
              color: #333;
            }
            & > span.arrow {
              & > i {
                font-size: 19px;
                color: #666;
                line-height: 45px;
              }
            }
          }
          & > div.state {
            font-size: 28px;
            color: #333;
          }
        }
        & > div.createTime {
          font-size: 26px;
          color: #666;
        }
      }
      & > div.totalprice {
        border-bottom: 2px solid #fbfbfb;

        display: flex;
        height: 93px;
        justify-content: space-between;
        span {
          line-height: 93px;
        }
        & > div.item {
          & > span {
            font-size: 28px;
            color: #333;
          }
        }
        & > div.price {
          font-size: 28px;
          color: #f60;
          font-weight: 700;
        }
      }
      & > div.control {
        display: flex;
        justify-content: flex-end;
        padding-bottom: 10px;
        & > div.payed {
          height: auto;
          & > span {
            display: block;
            font-size: 26px;
            color: #3190e8;
            border: 1px solid #3190e8;
            padding: 4px 9px;
            border-radius: 10px;
          }
        }
        & > div.time {
          padding-bottom: 10px;

          & > span {
            padding: 9px 4px;
            color: orange;
            border: 1px solid orange;
            border-radius: 10px;
            font-size: 26px;
          }
        }
      }
    }
  }
}
</style>