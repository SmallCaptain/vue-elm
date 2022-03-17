<template>
  <div class="container" @click="toShop">
    <div class="content">
      <!-- 商家图片 -->
      <div class="img">
        <img :src="item.img" alt="" />
      </div>
      <!-- 商家其他信息 -->
      <div class="msg">
        <!-- 分两大部分 -->
        <!-- 第一部分 品牌 效果演示等  -->
        <div class="first">
          <!-- 各分三行 -->
          <div class="rowOne">
            <div class="pingPai" v-if="item.is_brand">品牌</div>
            <div class="title">{{ item.name }}</div>
          </div>
          <div class="rowTwo">
            <div class="star">
                <i class="iconfont icon-star"></i>
              <span>{{ item.star }}</span>
            </div>
            <div class="sales">月售{{ item.sales }}单</div>
          </div>
          <div class="rowThree">
            <div class="conditions">￥{{ item.de_conditions }}起送</div>
            <div class="fenge">/</div>
            <div class="shippingFee">配送费约{{ item.shipping_fee }}￥</div>
          </div>
        </div>
        <!-- 第二部分 配送时间等 -->
        <div class="second">
          <!-- 各分三行 -->
          <div class="rowOne">
            <div class="isTicket" v-if="item.is_ticket">保准票</div>
          </div>
          <div class="rowTwo">
            <div class="isHummingbird" v-if="item.is_hummingbird">蜂鸟专送</div>
            <div class="isTime" v-if="item.is_ticket">准时达</div>
          </div>
          <div class="rowThree">
            <div class="instance">{{ item.instance }}公里</div>
            <div class="xiegang">/</div>
            <div class="shipping_time">{{ shipingTime }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NearbyShops",
  props: {
    item: {
      type: Object,
      default() {
        return {
          id: 1,
          name: "商家2",
          instance: 111,
          star: 4.5,
          de_conditions: 20,
          is_brand: 1,
          shipping_fee: 3,
          shipping_time: 50,
          sales: 120,
          is_ticket: 1,
          is_hummingbird: 1,
          img: "http://localhost:5115/public/images/defalu_store.jpg",
        };
      },
    },
  },
  methods: {
    toShop() {
      let data = JSON.stringify(this.item);
      this.$router.push({
        name:'Merchant',
        query:{
          id:this.item.id,
          item:data
        }
      });
    },
  },
  computed: {
    shipingTime() {
      let time = this.item.shipping_time;
      let hour = Number.parseInt(time / 60);
      let minute = time % 60;
      let timeStr = `${hour}小时${minute}分钟`;

      return timeStr;
    },
  },
};
</script>

<style lang="less" scoped>
div.container {
  padding: 33px 19px 33px 19px;
  border-bottom: 2px solid #f1f1f1;
  & > div.content {
    display: flex;
    & > div.img {
      & > img {
        width: 125px;
        height: 125px;
      }
    }
    & > div.msg {
      width: 100%;
      display: flex;
      justify-content: space-between;
      & > div.first {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-left: 15px;
        & > div.rowOne {
          display: flex;

          & > div.pingPai {
            width: 50px;
            height: 28px;
            padding: 0 4.7px;
            background-color: #ffd930;
            font-size: 22px;
            text-align: center;
            font-weight: bold;
            border-radius: 15%;
            margin: 8px 20px 0 0px;
          }
          & > div.title {
            font-size: 30px;
            font-weight: bold;
          }
        }
        & > div.rowTwo {
          display: flex;
          & > div.star {
              & > i{
                 color:#ff9a0d;
                 font-size: 22px;
              }
            & > span {
              font-size: 18.75px;
              color: #ff6000;
              margin-right: 10px;
            
            }
          }
          & > div.sales {
            font-size: 18.75px;
            color: #666;
          }
        }
        & > div.rowThree {
          display: flex;
          & > div {
            color: #666;
            font-size: 23px;
          }
        }
      }
      & > div.second {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        & > div.rowOne {
          display: flex;
          justify-content: flex-end;
          & > div.isTicket {
            letter-spacing: 5px;
            color: #999;
            font-size: 20px;
            box-sizing: border-box;
          }
        }
        & > div.rowTwo {
          display: flex;
          justify-content: flex-end;
          & > div.isHummingbird {
            background-color: #3190e8;
            border: 1px solid #3190e8;
            color: #fff;
          }
          & > div.isTime {
            margin-left: 10px;
            color: #3190e8;
            border: 1px solid #3190e8;
          }
        }
        & > div.rowThree {
          display: flex;
          & > div {
            font-size: 18.75px;
          }
          & > div.instance {
            color: #999;
          }
          & > div.xiegang {
            color: #999;
            margin: 0 10px;
          }
          & > div.shipping_time {
            color: #3190e8;
          }
        }
      }
    }
  }
}
</style>