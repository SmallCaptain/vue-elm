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
          </div>
          <div class="msg">
            <div class="name">
              <span class="spanName">{{ item.name }}</span>
              <span v-if="item.is_specialty" class="specialty">
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
              <div class="button"></div>
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
          counts:0,//代表该类型的货物被选中多少个
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
              selects:0
            },
          ],
        };
      },
    },
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
          & > img {
            width: 93.75px;
            height: 93.75px;
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
            & > span {
              color: #f60;
              font-size: 30px;

              & > span {
                font-size: 40px;
                font-weight: 700;
              }
            }
          }
        }
      }
    }
  }
}
</style>