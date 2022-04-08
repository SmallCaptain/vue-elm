// 支付方式
<template>
  <div id="PaymentWay">
    <div class="PaymentWayContent">
      <!-- 支付方式开头 -->
      <div class="title">选择支付方式</div>
      <!-- 支付方式 -->
      <div class="main">
        <ul class="list">
          <li class="item" v-for="(item, index) in wayArray" :key="index">
            <div class="icon">
              <icon-svg iconStyle="iconStyle" :iconClass="item.icon" />
            </div>
            <div class="wayName">
              <span>{{ item.name }}</span>
            </div>
            <div class="selectBtn">
              <icon-svg
                iconClass="xuanze"
                :iconStyle="
                  index === currentIndex
                    ? 'selectedStyle'
                    : 'selectDefalutStyle'
                "
                @click.native="chagePaymentWay(index)"
              />
            </div>
          </li>
        </ul>
      </div>
      <!-- 按钮 -->
      <div class="sureBtn">
        <button @click="toPay">确认支付</button>
      </div>
    </div>
  </div>
</template>

<script>
import iconSvg from "../../components/iconSvg.vue";
export default {
  components: { iconSvg },
  name: "PaymentWay",
  props: {
    orderId: {
      type: String,
      default() {
        return "defalut";
      },
    },
  },
  data() {
    return {
      wayArray: [
        {
          icon: "zhifubao",
          name: "支付宝",
        },
        {
          icon: "weixinzhifu",
          name: "微信支付",
        },
      ],
      currentIndex: 0,
    };
  },
  methods: {
    chagePaymentWay(index) {
      this.currentIndex = index;
    },
    toPay() {
      if (this.orderId === "defalut") {
        let shoppingCart = this.$store.state.shopping.order; //购物车
        let address = this.$store.state.shopping.address;
        let is_deal = 1;
        this.$axios
          .post("user/orderForm", {
            shoppingCart,
            address,
            is_deal,
          })
          .then((result) => {
            console.log(result.data);
            if (result.data.code === 0) {
              confirm("支付成功~");
              //准备跳往我的订单页面
              this.$router.replace({
                name: "UserOrderList",
              });
            }
          })
          .catch((err) => {
            console.log(err);
            this.$message({
              type: "error",
              message: "请求出错",
            });
          });
      }else{
        //说明这个订单是先前的
        this.$axios.post('user/sureOrder',{
          order_id:this.orderId
        }).then((result) => {
          if (result.data.code === 0) {
            this.$message({
              type:'success',
              message:'订单支付成功'
            });
          }
          this.$router.go(-1);
        }).catch((err) => {
          console.log(err);
          this.$message({
            type:'error',
            message:'订单支付失败'
          });
          this.$router.go(-1);

        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
div#PaymentWay {
  & > div.PaymentWayContent {
    //标题
    & > div.title {
      font-size: 32px;
      color: #333;
      padding: 16px 22px;
    }
    // 方式表现
    & > div.main {
      & > ul.list {
        padding: 0;
        list-style: none;
        & > li.item {
          display: flex;
          padding: 19px 33px;
          background-color: #fff;

          & > div.icon {
            margin-right: 9px;
          }
          & > div.wayName {
            display: flex;
            flex: 1;
            align-items: center;
            font-size: 32px;
            color: #666;
          }
          & > div.selectBtn {
            display: flex;
            align-items: center;
          }
        }
      }
    }
    // 确定按钮
    & > div.sureBtn {
      box-sizing: border-box;
      margin: 23px 33px 0 33px;
      & > button {
        width: 100%;
        display: block;
        color: #fff;
        font-size: 32px;
        font-weight: 700;
        background-color: #4cd964;
        outline: none;
        border: 1px solid transparent;
        border-radius: 20px;
        padding: 20px 0;
      }
    }
  }
}
.iconStyle {
  width: 93px;
  height: 93px;
}
.selectDefalutStyle {
  width: 47px;
  height: 47px;
  color: #cccccc;
  fill: currentColor;
}
.selectedStyle {
  width: 47px;
  height: 47px;
  color: #4cd964;
  fill: currentColor;
}
</style>