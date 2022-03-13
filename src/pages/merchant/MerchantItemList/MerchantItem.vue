<template>
  <div class="item">
    <!-- 第一个部分 分类 热销榜等 -->
    <div class="type">
      <span>{{ data.name }}</span>
    </div>
    <!-- 第二个部分 对应分类的多物品 -->
    <ul class="items">
      <li v-for="(item, index) in data.items" :key="index">
        <div class="liContent">
          <div class="img">
            <img :src="item.img" alt="" />
            <div v-if="item.is_new_product === 1" class="newProduct">
              <div class="triangle"></div>
              <span>新品</span>
            </div>
          </div>
          <div class="msg">
            <div class="name">
              <span class="spanName">{{ item.name }}</span>
              <span v-if="item.is_specialty === 1" class="specialty">
                <span>招牌</span>
              </span>
            </div>
            <div class="introduction">{{ item.introduction }}</div>
            <div class="sales">
              <span>月售{{ item.sales }}份</span>
              <span>好评率{{ item.point }}%</span>
            </div>
            <div v-if="item.label !== ''" class="label">
              <span>{{ item.label }}</span>
            </div>
            <div class="price">
              <span
                >￥<span>{{ item.price }}</span></span
              >
              <div class="button">
                <transition name="icrement">
                  <div class="left" v-show="selecteds[index] !== 0">
                    <!-- 减 - 以及数量显示 -->
                    <button @click="increItem(index)"></button>
                    <span>{{ selecteds[index] }}</span>
                  </div>
                </transition>

                <div class="right">
                  <!-- 选择  +  的button -->
                  <button @click="addItem(index)"></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "MerchantItem",
  props: {
    data: {
      type: Object,
      default() {
        return {
          name: "折扣榜",
          counts: 0, //代表该类型的货物被选中多少个
          items: [
            {
              name: "阿尔卑斯",
              type: "折扣榜",
              price: 20.5,
              introduction: "好吃！",
              sales: 100,
              point: 30.5,
              label: "冰淇淋",
              is_specialty: 1,
              is_new_product: 1,
              img: "http://localhost:5115/public/images/iceCream.jpg",
              selects: 0,
            },
          ],
        };
      },
    },
  },
  methods: {
    addItem(index) {
      //挑选商品
      this.selecteds[index]++;
      this.$emit("selectShops", this.data.items[index], index);
      this.$forceUpdate();

    },
    increItem(index) {
      this.selecteds[index] === 0 ? 0 : this.selecteds[index]--;
      this.$emit("delShops", this.data.items[index]);
      this.$forceUpdate();

    },
    //初始化 selecteds
    initSelecteds() {
      // 针对多少个物品 给选择量推入0(初始化选择数组)
      let newArray = [];
      this.data.items.forEach(() => {
        newArray.push(0);
      });
      this.selecteds = newArray;
    },
  },

  data() {
    return {
      //本组 点击选择的量
      selecteds: [],
      // 本组商品的选择量
    };
  },
  created() {
    this.initSelecteds();
  },
};
</script>

<style lang="less" scoped>
div.item {
  & > div.type {
    padding: 18.75px;
    & > span {
      color: #666;
      font-size: 35px;
      font-weight: 700;
    }
  }
  & > ul.items {
    position: relative;
    padding: 0;
    margin: 0;
    list-style: none;
    & > li {
      margin: 0;
      padding: 0;
      padding: 28px 18.75px;
      background-color: white;
      border-bottom: 2px solid #f8f8f8;
      & > div.liContent {
        display: flex;
        & > div.img {
          position: relative;
          & > img {
            width: 93.75px;
            height: 93.75px;
            padding: 10px;
          }
          & > div.newProduct {
            position: absolute;
            left: 0;
            top: 0;
            & > span {
              position: absolute;
              width: 50px;
              left: -20px;
              top: -25px;
              transform: rotate(-45deg);
              z-index: 5;
              color: #fff;
              font-size: 16px;
            }
            & > div.triangle {
              position: absolute;
              height: 0;
              width: 0;
              top: -80px;
              left: -70px;
              border: 50px solid #4cd964;
              border-left-color: transparent;
              border-top-color: transparent;
              border-right-color: transparent;
              transform: rotate(-45deg);
            }
          }
        }
        & > div.msg {
          width: 100%;
          margin-left: 20px;

          & > div.name {
            display: flex;
            justify-content: space-between;
            & > span.spanName {
              font-size: 35px;
              color: black;
              font-weight: 700;
            }
            & > span.specialty {
              position: relative;
              width: 60px;
              height: 40px;
              color: rgb(240, 115, 115);
              border: 2px solid rgb(240, 115, 115);
              border-radius: 50%;

              & > span {
                position: absolute;
                font-size: 18px;
                width: 60px;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                text-align: center;
              }
            }
          }
          & > div.introduction {
            color: #999;
            font-size: 23px;
            margin: 5px 0;
          }
          & > div.sales {
            & > span {
              color: #333;
              font-size: 23px;
            }
            span:nth-child(1) {
              margin-right: 25px;
            }
          }
          & > div.label {
            display: inline-block;
            color: rgb(240, 115, 115);
            border: 2px solid rgb(240, 115, 115);
            border-radius: 45%;
            padding: 0 5px;
            font-size: 12px;
            margin: 10px 0;
          }
          & > div.price {
            display: flex;
            justify-content: space-between;
            & > span {
              color: #f60;
              font-size: 30px;

              & > span {
                font-size: 40px;
                font-weight: 700;
              }
            }
            & > div.button {
              display: inline-flex;
              box-sizing: content-box;

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
  }
}
.icrement-enter-active {
  animation: moveIn 0.5s;
}
.icrement-leave-active {
  animation: moveIn 0.5s reverse;
}
@keyframes moveIn {
  0% {
    opacity: 1;
    transform: translateX(100%);
  }
  10% {
    opacity: 0;
  }
  100% {
    transform: translateX(0);
  }
}
</style>