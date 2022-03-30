//购物车组件 @author 小船长
<template>
  <div id="ShoppingCart">
    <!-- 购物车图标 -->
    <div class="Cart">
      <!-- 没东西 -->
      <div v-if="selectData.length === 0" class="CartIcon">
        <i class="iconfont icon-gouwuchexuanzhong"></i>
      </div>
      <!-- 有东西 -->
      <div
        @click="chageShopCart"
        v-if="selectData.length > 0"
        class="CartIconItem"
      >
        <div class="showCounts">
          <span>{{ selectDataCounts }}</span>
        </div>
        <i class="iconfont icon-gouwuchexuanzhong"></i>
      </div>
    </div>
    <!-- 总价格 配送费 -->
    <div class="fee">
      <p class="price">¥{{ countTotalPrice }}</p>
      <p class="shoppingFee">配送费¥{{ shippingFee }}</p>
    </div>
    <!-- 按钮 -->
    <div class="shoppingBtn">
      <div v-if="couldBuy" @click="doOrder" class="buy">
        <span>去结算</span>
      </div>
      <div v-if="!couldBuy" class="noBuy">
        <span>差¥{{ showGrap }}起送</span>
      </div>
    </div>

    <!-- 隐藏已选购物物品 -->
    <transition name="moveIn">
      <div
        v-if="shopCart && selectData.length !== 0"
        class="shoppingCartContent"
      >
        <div class="content">
          <!-- 删除与标题 -->
          <div class="CartName">
            <div class="name">购物车</div>
            <div @click="clearCarts" class="deleteItems">
              <i class="el-icon-delete-solid"></i>
              清空
            </div>
          </div>
          <!-- 具体商品内容 -->
          <div class="cartItem">
            <div class="item" v-for="(item, index) in selectData" :key="index">
              <div class="name">{{ item.item.name }}</div>
              <div class="price">
                <p>
                  <span>¥</span>
                  <span>{{ item.item.price }}</span>
                </p>
              </div>
              <div class="button">
                <transition name="icrement">
                  <div class="left">
                    <!-- 减 - 以及数量显示 -->
                    <button
                      @click="icreItem(item.item)"
                      ref="increBtn"
                    ></button>
                    <span>{{ item.counts }}</span>
                  </div>
                </transition>

                <div class="right">
                  <!-- 选择  +  的button -->
                  <button
                    ref="addBtn"
                    @click="addItem(item.item, item.index)"
                  ></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <!-- 遮挡层 -->
    <div v-show="shopCart && selectData.length !== 0" class="zhedang"></div>
  </div>
</template>

<script>
export default {
  name: "ShoppingCart",
  props: {
    selectData: {
      type: Array,
    },
    shippingFee: {
      type: Number,
      default() {
        return 5;
      },
    },
    de_condition: {
      type: Number,
      default() {
        return 10;
      },
    },
  },
  data() {
    return {
      couldBuy: false,
      grap: 0,
      shopCart: false,
    };
  },
  created() {
    this.grap = this.de_condition;
  },
  beforeDestroy(){
    //判断由两个组成
    // 1.本组件购物车是否有数据
    // 2.vuex中购物车是否存在本购物车数据
    if(this.selectData.length !==0){
      this.$emit('cachShoppingCart');
    }else{
      this.$emit('cachShoppingCart',[]);
    }
  },
  methods: {
    showItems() {
      alert("ok");
    },
    chageShopCart() {
      this.shopCart = !this.shopCart;
    },
    // 购物车中增加物品
    addItem(item, index) {
      this.$emit("selectShops", item, index);
    },
    //购物车删除物品
    icreItem(item) {
      this.$emit("delShops", item);
    },
    // 清空
    clearCarts() {
      // 直接把购物车中每一个按钮都触发掉
      this.$emit("clearCarts");
    },
    //下订单
    doOrder() {
      let token = sessionStorage.getItem("Token");
      if (token === null) {
        if(confirm('请先登录')){
          this.$router.replace({
            name:'login'
          });
        }
      } else {
        this.$router.push({
          name: "TheOrder",
        });
      }
    },
  },
  computed: {
    selectDataCounts() {
      let counts = 0;
      this.selectData.forEach((obj) => {
        counts += obj.counts;
      });
      return counts;
    },
    countTotalPrice() {
      let totalPrice = 0;
      this.selectData.forEach((obj) => {
        totalPrice += obj.counts * obj.item.price;
      });
      return totalPrice;
    },
    showGrap() {
      return this.grap < 0 ? -this.grap : this.grap;
    },
  },
  watch: {
    countTotalPrice(newValue, oldValue) {
      if (newValue > oldValue) {
        // 新增加了商品
        this.grap = this.de_condition - newValue;

        if (this.grap <= 0) {
          this.grap = 0;
          this.couldBuy = true;
        } else {
          this.couldBuy = false;
        }
      } else {
        // 删除了商品
        this.grap = this.de_condition - newValue;

        if (this.grap <= 0) {
          this.grap = 0;
          this.couldBuy = true;
        } else {
          this.couldBuy = false;
        }
      }
    },
    selectData(newValue) {
      if (newValue.length === 0) {
        this.shopCart = false;
      }
    },
  },
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

  & > div.Cart {
    position: relative;
    flex: 2;
    z-index: 12;
    background-color: #3d3d3f;

    & > div.CartIcon {
      position: absolute;
      left: 50%;
      top: -50%;
      transform: translate(-50%, 10%);
      background-color: #3d3d3f;
      border: 10px solid #444;
      border-radius: 100%;
      padding: 8px;
      z-index: 15;
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
      background-color: #3190e8;
      border: 10px solid #444;
      border-radius: 100%;
      padding: 8px;
      z-index: 15;

      & > i {
        font-size: 70px;
        color: #fff;
      }
      & > div.showCounts {
        position: absolute;
        width: 30px;
        height: 30px;
        background-color: #ff461d;
        border: 1px solid transparent;
        border-radius: 100%;
        z-index: 15;
        right: -10px;
        top: -15px;

        & > span {
          display: inline-block;
          width: 100%;
          height: 100%;
          color: #fff;
          line-height: 30px;
          text-align: center;
          font-size: 25px;
          font-weight: 700;
        }
      }
    }
  }
  & > div.fee {
    position: relative;
    flex: 3;
    display: flex;
    flex-direction: column;
    z-index: 12;
    background-color: #3d3d3f;
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
    position: relative;
    flex: 3;
    z-index: 12;

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
  & > div.shoppingCartContent {
    position: fixed;
    width: 100vw;
    bottom: 95px;
    left: 0;
    z-index: 11;

    & > div.content {
      & > div.CartName {
        display: flex;
        justify-content: space-between;
        font-weight: 400;
        font-size: 32px;
        color: #666;
        padding: 14px 28px;
        background-color: #eceff1;

        & > div.deleteItems {
          & > i {
            color: #666;
          }
        }
      }
      & > div.cartItem {
        max-height: 50vh;
        overflow-y: auto;
        background-color: white;
        & > div.item {
          display: flex;
          padding: 32px 23px;

          & > div.name {
            flex: 4;
            font-weight: 700;
            font-size: 32px;
            color: #666;
          }
          & > div.price {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            & > p {
              padding: 0;
              margin: 0;
              & > span {
                color: #f60;
              }
              span:nth-child(1) {
                font-size: 25px;
              }
              span:nth-child(2) {
                font-weight: 700;
                font-size: 32px;
              }
            }
          }
          & > div.button {
            flex: 2;
            display: inline-flex;
            box-sizing: content-box;
            justify-content: flex-end;
            & > div.left {
              display: flex;
              align-items: flex-end;
              & > button {
                position: relative;
                display: inline-block;
                width: 40px;
                height: 40px;
                outline: none;
                border: 3px solid #3190e8;
                border-radius: 100%;
                background-color: #fff;

                &::before {
                  content: "";
                  position: absolute;
                  width: 65%;
                  height: 10%;
                  background-color: #3190e8;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                }
              }
              & > span {
                font-size: 35px;
                line-height: 40px;
                margin: 0 20px;
              }
            }
            & > div.right {
              display: flex;
              align-items: flex-end;
              & > button {
                position: relative;
                display: inline-block;
                width: 40px;
                height: 40px;
                outline: none;
                border: 1px solid transparent;
                border-radius: 100%;
                background-color: #3190e8;

                &::before {
                  content: "";
                  position: absolute;
                  width: 65%;
                  height: 10%;
                  background-color: #fff;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                }
                &::after {
                  content: "";
                  position: absolute;
                  width: 10%;
                  height: 65%;
                  background-color: #fff;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                }
              }
            }
          }
        }
      }
    }
  }
  // 遮挡层
  & > div.zhedang {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 10;
  }
}
.moveIn-enter-active {
  animation: moveIn 0.5s;
}
.moveIn-leave-active {
  animation: moveIn 0.5s reverse;
}
@keyframes moveIn {
  0% {
    transform: translateY(100%);
    opacity: 0;
    z-index: 10;
  }
  100% {
    transform: translateY(0%);
    opacity: 1;
    z-index: 11;
  }
}
</style>