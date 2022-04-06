// <!-- 商品属性选择组件 -->
// 该组件对于某些商品并不存在 取决于商品是否可选规格等
<template>
  <div id="MerchantItemAttribute">
    <!-- 内容 -->
    <transition name="scale">
      <div v-if="isSelectProperty" class="Content">
        <!-- title 商品名称 -->
        <div class="title">
          <div class="titleContent">
            <!-- 商品名 -->
            <span class="name">{{ item.name }}</span>
            <!-- X cancel取消 -->
            <span @click="cancel" class="cancel">X</span>
          </div>
        </div>
        <!-- 商品属性选择 -->
        <div class="property">
          <!-- 商品属性选择内容区 -->
          <div class="propertyContent">
            <!-- 规格区域  -->
            <ul class="list">
              <li
                class="item"
                v-for="(item, index) in item.classify_detail.type_keys"
                :key="index"
              >
                <div class="title">
                  <span>{{ item.type_key_name }}</span>
                </div>
                <div class="propertys">
                  <!-- 可选项 -->
                  <div
                    class="property"
                    v-for="(property, i) in item.type_key_values"
                    :key="i"
                    @click="selectProperty(index, i)"
                    :class="{ borderSelected: i === currentIndex[index] }"
                  >
                    <span
                      :class="{ spanSelected: i === currentIndex[index] }"
                      >{{ property.type_key_value }}</span
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!-- 价格显示与加入购物车 -->
        <div class="control">
          <!-- 操作 显示价格与加入购物车操作 -->
          <div class="controlContent">
            <div class="value">
              <div class="valueContent">
                <span class="unit">￥</span>
                <span class="price">{{ item.price }}</span>
              </div>
            </div>
            <div class="addBtn">
              <button @click="addToShoppingCart">加入购物车</button>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <transition name="fadeIn">
      <!-- 遮罩层 -->
      <div v-if="isSelectProperty" class="zhezhao"></div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "MerchantItemAttribute",
  props: {
    item: {
      type: Object,
      default() {
        return {
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
          classify_detail: {
            type_name: "饮品",
            type_keys: [
              {
                type_key: "temperature",
                type_key_name: "温度",
                type_key_values: [
                  { type_key_value: "热" },
                  { type_key_value: "多冰" },
                  { type_key_value: "少冰" },
                  { type_key_value: "去冰" },
                ],
              },
              {
                type_key: "capacity",
                type_key_name: "容量",
                type_key_values: [
                  { type_key_value: "1000ml" },
                  { type_key_value: "800ml" },
                  { type_key_value: "500ml" },
                ],
              },
            ],
          },
        };
      },
    },
    isSelectProperty: {
      type: Boolean,
    },
  },
  data() {
    return {
      currentIndex: [],
    };
  },
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    selectProperty(index, i) {
      this.currentIndex.splice(index, 1, i);
      // this.currentIndex[index] = i;
    },
    //初始化 属性选择数组
    initPropertyArray() {
      if (this.item.classify_detail !== undefined) {
        let length = this.item.classify_detail.type_keys.length;

        for (let i = 0; i < length; i++) {
          this.currentIndex.push(0);
        }
      }
    },
    //增加指购物车
    addToShoppingCart() {
      let classify_detail = {};
      classify_detail.type_name = this.item.classify_detail.type_name;
      classify_detail.type_keys = [];

      let type_keys = this.item.classify_detail.type_keys;

      for (let i = 0; i < type_keys.length; i++) {
        let obj = {};
        obj.type_key = type_keys[i].type_key;
        obj.type_key_name = type_keys[i].type_key_name;
        obj.type_key_value =
          type_keys[i].type_key_values[this.currentIndex[i]].type_key_value;
        classify_detail.type_keys.push(obj);
      }
      this.$emit("addSpecification", this.item, classify_detail);
      this.$emit("cancel");
    },
  },
  watch: {
    isSelectProperty(newvalue) {
      if (newvalue) {
        //true 表示展现
        this.initPropertyArray();
      } else {
        // 表示隐藏
        this.currentIndex = [];
      }
    },
  },
};
</script>

<style lang="less" scoped>
div#MerchantItemAttribute {
  background-color: black;
  & > div.Content {
    position: fixed;
    width: 500px;

    top: 50%;
    left: 50%;
    z-index: 30;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border: 1px solid transparent;
    border-radius: 10px;

    & > div.title {
      & > div.titleContent {
        display: flex;
        padding: 23px;
        & > span.name {
          flex: 1;
          color: #222;
          font-size: 32px;
          text-align: center;
        }
        & > span.cancel {
          color: #838383;
          font-size: 32px;
        }
      }
    }
    // 选择商品区域
    & > div.property {
      max-height: 300px;
      overflow: auto;
      &::-webkit-scrollbar {
        display: none;
      }
      & > div.propertyContent {
        & > ul.list {
          list-style: none;
          padding: 0;

          & > li.item {
            padding: 23px;

            & > div.title {
              & > span {
                color: #666;
                font-size: 28px;
              }
            }
            & > div.propertys {
              padding: 18px 0 0 0;
              & > div.property {
                display: inline-block;
                border: 1px solid #333;
                border-radius: 10px;
                padding: 14px 23px;
                margin: 0 23px 9px 0;
                & > span {
                  font-size: 28px;
                  color: #333;
                }
              }
            }
          }
        }
      }
    }
    & > div.control {
      width: 500px;
      background-color: #f9f9f9;
      & > div.controlContent {
        display: flex;
        justify-content: space-between;
        padding: 23px;

        & > div.value {
          display: flex;
          align-items: flex-end;
          & > div.valueContent {
            & > span {
              color: #ff6000;
              vertical-align: bottom;
            }
            & > span.unit {
              font-size: 23px;
            }
            & > span.price {
              font-size: 37.5px;
              font-weight: 700;
            }
          }
        }
        & > div.addBtn {
          & > button {
            color: #fff;
            background-color: #3199e8;
            font-size: 28px;
            outline: none;
            border: 1px solid transparent;
            border-radius: 15px;
            box-sizing: content-box;
            padding: 10px 25px;
          }
        }
      }
    }
  }
  & > div.zhezhao {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: rgba(128, 128, 128, 0.519);
    z-index: 25;
    top: 0;
    left: 0;
  }
}
.spanSelected {
  color: #3199e8 !important;
}
.borderSelected {
  border-color: #3199e8 !important;
}
.scale-enter-active {
  animation: scale 0.5s linear;
}
.scale-leave-active {
  animation: scale 0.5s linear reverse;
}
@keyframes scale {
  0% {
    opacity: 0;
    transform-origin: left top;
    transform: scale(0, 0) translate(-50%, -50%);
  }
  100% {
    opacity: 1;
    transform-origin: left top;

    transform: scale(1, 1) translate(-50%, -50%);
  }
}
.fadeIn-enter-active {
  animation: fadeIn 0.5s linear;
}
.fadeIn-leave-active {
  animation: fadeIn 0.5s linear reverse;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>