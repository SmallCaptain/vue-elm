//购物车组件 @author 小船长
<template>
  <div id="ShoppingCart">
    <!-- 购物车图标 -->
    <div class="Cart">
      <!-- 没东西 -->
      <div v-if="true" class="CartIcon">
        <i class="iconfont icon-gouwuchexuanzhong"></i>
      </div>
      <!-- 有东西 -->
      <div v-if="false" class="CartIconItem">
        <i class="iconfont icon-gouwuchexuanzhong"></i>
      </div>
    </div>
    <!-- 总价格 配送费 -->
    <div class="fee">
      <p class="price">¥123</p>
      <p class="shoppingFee">配送费¥5</p>
    </div>
    <!-- 按钮 -->
    <div class="shoppingBtn">
      <div v-if="false" class="buy">
        <span>去结算</span>
      </div>
      <div v-if="true" class="noBuy">
        <span>差¥xxx起送</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShoppingCart",
};
</script>

<style lang="less" scoped>
div#ShoppingCart {
  height: 94px;
  width: 100%;
  background-color: #3d3d3f;
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 10;

  & > div.Cart {
    position: relative;
    flex: 2;
    & > div.CartIcon {
      position: absolute;
      left: 50%;
      top: -50%;
      transform: translate(-50%, 10%);
      background-color: #3d3d3f;
      border: 10px solid #444;
      border-radius: 100%;
      padding: 8px;
      & > i {
        font-size: 70px;
        color: #fff;
      }
    }
    & > div.CartIconItem {
      position: absolute;
      left: 50%;
      top: -50%;
      transform: translate(-50%, 10%);
      background-color: #3190E8;
      border: 10px solid #444;
      border-radius: 100%;
      padding: 8px;
      & > i {
        font-size: 70px;
        color: #fff;
      }
    }
  }
  & > div.fee {
    flex: 3;
    display: flex;
    flex-direction: column;
    & > p {
      padding: 0;
      margin: 0;
      color: #fff;
      flex: 1;
    }
    & > p.price {
      font-size: 40px;
      font-weight: 700;
    }
    & > p.shoppingFee {
      font-size: 20px;
    }
  }
  & > div.shoppingBtn {
    flex: 3;

    & > div.buy {
      position: relative;
      width: 100%;
      height: 100%;
      background-color: #4cd964;

      & > span {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #fff;
        font-size: 40px;
        font-weight: 700;
      }
    }
    & > div.noBuy {
      position: relative;

      width: 100%;
      height: 100%;
      background-color: #535356;
      & > span {
        width: 80%;
        text-align: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #fff;
        font-size: 35px;
        font-weight: 700;
      }
    }
  }
}
</style>