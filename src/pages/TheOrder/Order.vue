<template>
  <div id="Order">
    <div class="OrderContent">
      <!-- 商家名 -->
      <div class="merchantTitle">
        <span class="img">
          <img src="../../images/swiper/BaoZiZhou.jpeg" alt="" />
        </span>
        <span class="title">必胜客 (新世界)</span>
      </div>
      <ul class="list">
        <li class="item">
          <span class="shopName">超级好吃</span>
          <div class="value">
            <span class="amounts">x1</span>
            <span class="price">￥123</span>
          </div>
        </li>
        <li class="item">
          <span class="shopName">超级好吃</span>
          <div class="value">
            <span class="amounts">x1</span>
            <span class="price">￥123</span>
          </div>
        </li>
        <li class="item">
          <span class="shopName">超级好吃</span>
          <div class="value">
            <span class="amounts">x1</span>
            <span class="price">￥123</span>
          </div>
        </li>
        <li class="item">
          <span class="shopName">超级好吃</span>
          <div class="value">
            <span class="amounts">x1</span>
            <span class="price">￥123</span>
          </div>
        </li>
        <!-- 配送费 无需循环生成 -->
        <li class="item">
          <span class="shopName">配送费</span>
          <div class="value">
            <span class="amounts"></span>
            <span class="price">￥123</span>
          </div>
        </li>
      </ul>
      <!-- 订单 -->
      <div class="total">
        <div class="title">
          <span class="title">订单</span>
          <span class="price">￥123</span>
        </div>
        <!-- 总和价格 -->
        <div class="value">
          <span class="title">待支付</span>
          <span class="price">￥123</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Order",
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

      border-bottom: 1px solid #666666;
      & > li.item {
        display: flex;
        justify-content: space-between;
        font-size: 26px;
        color: #666666;
        padding: 15px 0px;
        margin-top: 31px;

        & > div.value {
          & > span.amounts {
            margin-right: 75px;
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