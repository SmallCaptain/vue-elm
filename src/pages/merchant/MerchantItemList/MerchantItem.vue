<template>
  <div class="item">
    <!-- 第一个部分 分类 热销榜等 -->
    <div class="type">
      <span>{{ datas.name }}</span>
    </div>
    <!-- 第二个部分 对应分类的多物品 -->
    <ul class="items">
      <li v-for="(item, index) in datas.items" :key="index">
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
                    <!--  :disabled="!item.is_meal" -->
                    <button ref="increBtn" @click="increItem(index)"></button>
                    <span>{{ selecteds[index] }}</span>
                  </div>
                </transition>

                <div class="right">
                  <!-- 选择  +  的button -->
                  <button
                    class="add"
                    v-show="item.is_meal"
                    ref="addBtn"
                    @click="addItem(index)"
                  ></button>
                  <!-- 规格 button -->
                  <button
                    @click="selectProperty(index)"
                    class="selectSize"
                    v-show="!item.is_meal"
                  >
                    选规格
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <!-- 第三个部分 隐藏的规格选择 某些商品不支持规格选择 -->
    <div class="selectProperty">
      <!-- :item="datas.items[propertyIndex]" -->
      <merchant-item-attribute
        :isSelectProperty="isSelectProperty"
        :item="datas.items[propertyIndex]"
        @cancel="cancel"
        @addSpecification="addSpecification"
      />
    </div>
  </div>
</template>

<script>
import MerchantItemAttribute from "./MerchantItemAttribute.vue";
export default {
  components: { MerchantItemAttribute },
  name: "MerchantItem",
  props: {
    datas: {
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
    selectData: {
      type: Array,
    },
  },
  methods: {
    //挑选商品
    addItem(index) {
      this.isButtonOn = true;
      this.selecteds[index]++;
      this.$emit("selectShops", this.datas.items[index], index);
      this.$forceUpdate();
    },
    //增加规格商品
    addSpecification(item, detail) {
      let index = this.propertyIndex;
      this.isButtonOn = true;
      this.selecteds[index]++;

      this.$emit("selectSpecificationShops", item, detail, index);
    },
    //减少商品
    increItem(index) {
      if (this.datas.items[index].is_meal !== 0) {
        this.isButtonOn = true;

        this.selecteds[index] === 0 ? 0 : this.selecteds[index]--;
        this.$emit("delShops", this.datas.items[index]);
        this.$forceUpdate();
      } else {
        confirm("选择规格商品请去购物车中删除");
      }
    },
    //初始化 selecteds
    initSelecteds() {
      // 针对多少个物品 给选择量推入0(初始化选择数组)

      if (this.selecteds.length === 0) {
        let newArray = [];
        this.datas.items.forEach(() => {
          newArray.push(0);
        });
        this.selecteds = newArray;
      }
    },
    // 选择商品属性
    selectProperty(index) {
      this.propertyIndex = index;
      this.isSelectProperty = true;
    },
    //取消选择规格
    cancel() {
      this.isSelectProperty = false;
    },
    // 判断规格商品里的数据是否一致
    judgeSpecification(newItem, oldItem) {
      // newItem 表示新添加的数据 oldItem 表示要与之比对的数据
      let flag = true; //默认完全一致 不同时变为false
      let newKeys = newItem.classify_detail.type_keys;
      let oldKeys = oldItem.classify_detail.type_keys;

      /*
        console.log("@newKeys:", newKeys);
        console.log("@oldKeys:", oldKeys);
      */
      for (let i = 0; i < newKeys.length; i++) {
        if (newKeys[i].type_key_value !== oldKeys[i].type_key_value) {
          flag = false;
          break;
        }
      }

      return flag;
    },
  },

  data() {
    return {
      //本组 点击选择的量
      selecteds: [],
      //代表增加商品 删除商品 是否是由本组件触发 而非购物车 默认为购物车
      isButtonOn: false,
      // 是否显示选择规格
      isSelectProperty: false,
      //代表当前规格商品的index
      propertyIndex: 0,
    };
  },
  computed: {
    selectDataComputed() {
      return JSON.parse(JSON.stringify(this.selectData));
    },
  },
  // 监听购物车数据
  watch: {
    selectDataComputed: {
      immediate: true,
      handler(newValue, oldValue) {
        if (newValue !== undefined && oldValue !== undefined) {
          let grap = Math.abs(oldValue.length - newValue.length);
          if (grap > 1) {
            //说明是全部清空
            let arr = [];
            this.selecteds.forEach(() => {
              arr.push(0);
            });
            this.selecteds = arr;
          } else {
            if (!this.isButtonOn) {
              //购物车触发时
              if (newValue.length < oldValue.length) {
                //差距只有1 说明有单个商品归为0
                // console.log("newvalue.length < oldvalue.length");

                let id = null; //商品id 挑选出没有的
                let type = null;
                let index = 0;
                let rI = 0;
                for (let i = 0; i < oldValue.length; i++) {
                  let findFlag = false; //默认没找到

                  for (let j = 0; j < newValue.length; j++) {
                    if (
                      oldValue[i].item.is_meal === 1 &&
                      newValue[j].item.is_meal === 1
                    ) {
                      //两者都是非规格商品
                      //非规格商品时的判断
                      if (
                        oldValue[i].item.id === newValue[j].item.id &&
                        oldValue[i].item.type === newValue[j].item.type
                      ) {
                        findFlag = true;
                        break;
                      }
                    } else {
                      //两个都是规格商品
                      //规格商品时的判断
                      if (
                        oldValue[i].item.id === newValue[j].item.id &&
                        oldValue[i].item.type === newValue[j].item.type
                      ) {
                        //同类商品
                        let flag = this.judgeSpecification(
                          oldValue[i].item,
                          newValue[j].item
                        );
                        if (!flag) {
                          //同类 but 规格不一样
                          findFlag = false;
                        } else {
                          // 同类 规格一样 说明 没删
                          findFlag = true;
                          break;
                        }
                      }
                    }
                  }
                  // console.log("@findFlag:", findFlag);
                  if (!findFlag) {
                    //说明被删的 就是这个
                    rI = i;
                    id = oldValue[i].item.id;
                    type = oldValue[i].item.type;
                    index = oldValue[i].index;
                    break;
                  }
                }
                // console.log(id);
                // console.log(oldValue[rI]);
                if (id !== null && type === this.datas.name) {
                  //查找到了已经删掉的那个商品 并且它的分类是属于本组的
                  if (oldValue[rI].item.is_meal !== 0) {
                    // 非规格商品 不会出现同类不同规格的情况
                    // console.log(newValue[rI].item.is_meal);

                    this.selecteds[index] = 0;
                    this.$forceUpdate();
                  } else {
                    // console.log("123");
                    //规格商品 可能存在 不同规格的同类商品
                    let counts = 0;
                    for (let i = 0; i < newValue.length; i++) {
                      if (
                        newValue[i].item.type === oldValue[rI].item.type &&
                        newValue[i].index === oldValue[rI].index
                      ) {
                        counts += newValue[i].counts;
                      }
                    }
                    this.selecteds[index] = counts;
                    this.$forceUpdate();
                  }
                }
              } else if (newValue.length === oldValue.length) {
                //反之 这里不可能出现 > 的情况 只有等于的情况
                //该情况下 需要检测 到底是哪一个数据发生了变化
                // console.log("newvalue.length === oldvalue.length");

                let id = null; //商品id
                let type = null;
                let index = 0;
                let rI = 0;
                for (let i = 0; i < oldValue.length; i++) {
                  let findFlag = false; //默认没找到

                  for (let j = 0; j < newValue.length; j++) {
                    if (
                      oldValue[i].item.is_meal === 1 &&
                      newValue[j].item.is_meal === 1
                    ) {
                      //说明 都是非规格数据
                      if (oldValue[i].item.type === newValue[j].item.type) {
                        //同种类型
                        if (oldValue[i].item.id === newValue[j].item.id) {
                          //商品一致
                          if (oldValue[i].counts !== newValue[j].counts) {
                            // 数量发生改变
                            findFlag = true;
                            rI = j;

                            break;
                          }
                        }
                      }
                    } else if (
                      oldValue[i].item.is_meal === 0 &&
                      newValue[j].item.is_meal === 0
                    ) {
                      //规格商品 额外 增加判断规格条件
                      if (oldValue[i].item.type === newValue[j].item.type) {
                        //同种类型
                        if (oldValue[i].item.id === newValue[j].item.id) {
                          //商品一致
                          if (
                            this.judgeSpecification(
                              oldValue[i].item,
                              newValue[j].item
                            )
                          ) {
                            if (oldValue[i].counts !== newValue[j].counts) {
                              // 数量发生改变
                              findFlag = true;
                              rI = j;

                              break;
                            }
                          }
                        }
                      }
                    }
                  }
                  if (findFlag) {
                    //说明这个是数量变化的商品
                    id = oldValue[i].item.id;
                    type = oldValue[i].item.type;
                    index = oldValue[i].index;
                    break;
                  }
                }
                if (id !== null && type === this.datas.name) {
                  //查找到了数量发生了变化的那个商品 并且它的分类是属于本组的
                  if (newValue[rI].item.is_meal !== 0) {
                    // 非规格商品 不会出现同类不同规格的情况
                    // console.log(newValue[rI].item.is_meal);

                    this.selecteds[index] = newValue[rI].counts;
                    this.$forceUpdate();
                  } else {
                    //规格商品 可能存在 不同规格的同类商品
                    let counts = 0;
                    for (let i = 0; i < newValue.length; i++) {
                      if (
                        newValue[i].item.type === newValue[rI].item.type &&
                        newValue[i].index === newValue[rI].index
                      ) {
                        counts += newValue[i].counts;
                      }
                    }
                    this.selecteds[index] = counts;
                    this.$forceUpdate();
                  }
                }
              }
            }
          }

          // 结束后恢复为购物车触发
          this.isButtonOn = false;
        } else {
          //说明 是购物车缓存所致
          let arr = [];
          this.datas.items.forEach(() => {
            arr.push(0);
          });
          for (let i = 0; i < newValue.length; i++) {
            //需要做如下几个判断
            // 1.购物车数据是否属于本组件榜 如 热销榜与超好榜
            // 2.本分类中的第几个数据？ index 判断
            if (newValue[i].item.type === this.datas.name) {
              arr[newValue[i].index] = newValue[i].counts;
            }
          }
          this.selecteds = arr;
        }
      },
    },
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
              // z-index: 5;
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
                & > button.add {
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
                & > button.selectSize {
                  position: relative;
                  z-index: 0;
                  display: inline-block;
                  box-sizing: content-box;
                  font-size: 25px;
                  border: 1px solid #3190e8;
                  outline: none;
                  background-color: #3190e8;
                  color: #fff;
                  padding: 5px 15px;
                  border-radius: 50px;
                }
              }
            }
          }
        }
      }
    }
  }
  & > div.selectProperty {
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