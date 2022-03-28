<template>
  <div ref="view" id="MerchantItemList">
    <div ref="left" class="left">
      <ul>
        <li
          ref="navItems"
          @click="chageMain(index)"
          :class="{ navSelected: index === currentIndex }"
          v-for="(item, index) in itemData"
          :key="index"
        >
          <div v-if="itemData[index].counts !== 0" class="showCounts">
            <span>{{ itemData[index].counts }}</span>
          </div>
          <span>{{ item.name }}</span>
        </li>
      </ul>
    </div>
    <div @touchstart="mainTouch" @scroll="mainScroll($event)" class="main">
      <merchant-item
        ref="items"
        :datas="item"
        v-for="(item, index) in itemData"
        :key="index"
        @selectShops="selectShops"
        @delShops="delShops"
        :selectData="selectData"
      />
    </div>
    <!-- //购物车 -->
    <footer>
      <shopping-cart
        @selectShops="selectShops"
        @delShops="delShops"
        :selectData="selectData"
        @clearCarts="clearCarts"
        :shippingFee="itemObj.shipping_fee"
        :de_condition="itemObj.de_condition"
      />
    </footer>
  </div>
</template>

<script>
import MerchantItem from "./MerchantItem.vue";
import ShoppingCart from "./ShoppingCart.vue";
export default {
  name: "MerchantItemList",
  components: {
    MerchantItem,
    ShoppingCart,
  },
  props: {
    storeId: {
      type: String,
    },
    itemObj:{
      type:Object
    }
  },
  data() {
    return {
      itemData: [
        {
          name: "热销榜",
          counts: 0,
          //items数据从后端拿取 name和counts前端这边自行维护
          items: [
            {
              id: "1",
              name: "阿尔卑斯",
              type: "热销榜",
              price: 2.5,
              introduction: "好吃！",
              sales: 100,
              point: 30.5,
              label: "冰淇淋",
              is_specialty: 1,
              is_new_product: 1,
              img: "http://localhost:5115/public/images/iceCream.jpg",
            },
            {
              id: "2",
              name: "阿尔卑斯",
              type: "热销榜",
              price: 20.5,
              introduction: "好吃！",
              sales: 100,
              point: 30.5,
              label: "冰淇淋呢",
              is_specialty: 0,
              is_new_product: 1,
              img: "http://localhost:5115/public/images/iceCream.jpg",
            },
            {
              id: "3",
              name: "阿尔卑斯",
              type: "热销榜",
              price: 20.5,
              introduction: "好吃！",
              sales: 100,
              point: 30.5,
              label: "冰淇淋",
              is_specialty: 1,
              is_new_product: 0,
              img: "http://localhost:5115/public/images/iceCream.jpg",
            },
            {
              id: "4",
              name: "阿尔卑斯",
              type: "热销榜",
              price: 20.5,
              introduction: "好吃！",
              sales: 100,
              point: 30.5,
              label: "冰淇淋",
              is_specialty: 0,
              is_new_product: 0,
              img: "http://localhost:5115/public/images/iceCream.jpg",
            },
            {
              id: "5",
              name: "阿尔卑斯",
              type: "热销榜",
              price: 20.5,
              introduction: "好吃！",
              sales: 100,
              point: 30.5,
              label: "冰淇淋",
              is_specialty: 1,
              is_new_product: 1,
              img: "http://localhost:5115/public/images/iceCream.jpg",
            },
            {
              id: "6",
              name: "阿尔卑斯",
              type: "热销榜",
              price: 20.5,
              introduction: "好吃！",
              sales: 100,
              point: 30.5,
              label: "冰淇淋",
              is_specialty: 1,
              is_new_product: 1,
              img: "http://localhost:5115/public/images/iceCream.jpg",
            },
          ],
        },
        {
          name: "折扣榜",
          counts: 0,
          //items数据从后端拿取 name和counts前端这边自行维护
          items: [
            {
              id: "7",
              name: "阿尔卑斯",
              type: "折扣榜",
              price: 2.5,
              introduction: "好吃！",
              sales: 100,
              point: 30.5,
              label: "冰淇淋",
              is_specialty: 1,
              is_new_product: 1,
              img: "http://localhost:5115/public/images/iceCream.jpg",
            },
            {
              id: "8",
              name: "阿尔卑斯",
              type: "折扣榜",
              price: 20.5,
              introduction: "好吃！",
              sales: 100,
              point: 30.5,
              label: "冰淇淋呢",
              is_specialty: 0,
              is_new_product: 1,
              img: "http://localhost:5115/public/images/iceCream.jpg",
            },
            {
              id: "9",
              name: "阿尔卑斯",
              type: "折扣榜",
              price: 20.5,
              introduction: "好吃！",
              sales: 100,
              point: 30.5,
              label: "冰淇淋",
              is_specialty: 1,
              is_new_product: 0,
              img: "http://localhost:5115/public/images/iceCream.jpg",
            },
            {
              id: "10",
              name: "阿尔卑斯",
              type: "折扣榜",
              price: 20.5,
              introduction: "好吃！",
              sales: 100,
              point: 30.5,
              label: "冰淇淋",
              is_specialty: 0,
              is_new_product: 0,
              img: "http://localhost:5115/public/images/iceCream.jpg",
            },
            {
              id: "11",
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
            },
            {
              id: "12",
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
            },
          ],
        },
      ],
      // 用于存储当前已选择了的商品
      selectData: [],
      //左侧导航条高度
      navDataTop: [],
      // 右侧内容区高度
      itemDataTop: [],
      currentIndex: 0,
      mainScrollTop: 0, //卷尺高度？
      mainTrigger: 0, // 0 表示用户触发 1表示程序触发
      delTop: 0,
    };
  },
  methods: {
    chageMain(index) {
      this.mainTrigger = 1;
      this.currentIndex = index;
      this.mainScrollTop = this.itemDataTop[index];
      let main = document.querySelector("div.main");
      main.scrollTo({
        top: this.itemDataTop[index],
        left: 0,
        behavior: "smooth",
      });
    },
    initItemDataTop() {
      let items = this.$refs.items;
      let deTop = this.$refs.items[0].$el.offsetTop;
      this.delTop = deTop;
      items.forEach((item) => {
        this.itemDataTop.push(item.$el.offsetTop - deTop);
      });
    },
    initNavDataTop() {
      let items = this.$refs.navItems;
      let deTop = this.$refs.items[0].$el.offsetTop;

      items.forEach((item) => {
        this.navDataTop.push(item.offsetTop - deTop);
      });
    },
    mainScroll(event) {
      let mainTrigger = this.mainTrigger;
      if (mainTrigger === 0) {
        let scrollTop = event.target.scrollTop;
        this.mainScrollTop = scrollTop;
        // 遍历 所有高度
        this.itemDataTop.forEach((item, index) => {
          if (item <= scrollTop) {
            this.currentIndex = index;
          }
        });
      }
    },
    mainTouch() {
      this.mainTrigger = 0;
    },
    //选择商品 意为 增加商品 如果已存在 数量是会上升的
    selectShops(data, itemIndex) {
      let flag = false; //判断是否已选择过该种商品
      let index = -1;
      //每次只取单个商品
      for (let i = 0; i < this.selectData.length; i++) {
        if (
          this.selectData[i].item.id === data.id &&
          this.selectData[i].item.type === data.type
        ) {
          flag = true;
          index = i;
          break;
        }
      }
      if (flag) {
        let obj = this.selectData[index];
        obj.counts++;

        //已存在 增加数量
        this.$set(this.selectData, index, obj);
      } else {
        // 不存在 增加商品
        let obj = {
          item: data,
          counts: 1,
          index: itemIndex,
        };
        this.selectData.push(obj);
      }
      // 无论是否存在 相应的分类对应的数量都会增加
      for (let i = 0; i < this.itemData.length; i++) {
        if (this.itemData[i].name === data.type) {
          let copy = this.itemData[i];
          copy.counts++;
          this.$set(this.itemData, i, copy);
        }
      }
    },
    //删除商品 意为 把已选择的商品去除
    delShops(obj) {
      let flag = false;
      let index = -1;
      for (let i = 0; i < this.selectData.length; i++) {
        if (
          this.selectData[i].item.id === obj.id &&
          this.selectData[i].item.type === obj.type
        ) {
          //判断是否含有该商品
          flag = true;
          index = i;
          break;
        }
      }
      if (flag) {
        // 含有该商品
        let counts = this.selectData[index].counts;

        if (counts === 1) {
          //现在等于1 说明 得删掉了。。删后为0 BUG！！！
          this.selectData = this.selectData.filter((dObj) => {
            return dObj.item.id !== obj.id;
          });
        } else {
          //还没为0呢
          let obj = this.selectData[index];
          obj.counts--;
          this.$set(this.selectData, index, obj);
        }
        // 该减少了
        for (let i = 0; i < this.itemData.length; i++) {
          if (this.itemData[i].name === obj.type) {
            let copy = this.itemData[i];
            copy.counts--;
            this.$set(this.itemData, i, copy);
          }
        }
      }
    },
    // 清空购物车
    clearCarts() {
      this.selectData = [];
      let newArray = [];
      this.itemData.forEach((obj) => {
        obj.counts = 0;
        newArray.push(obj);
      });
      this.itemData = newArray;
    },
    //请求后端获取商品数据
    async getItems() {
      let data = await new Promise((resolve, reject) => {
        this.$axios
          .post("/merchant/getStoreItems", {
            id: this.storeId,
          })
          .then((result) => {
            resolve(result.data);
          })
          .catch((err) => {
            console.log(err);
            reject(null);
          });
      });
      if (data.length !== 0 && data instanceof Array) {
        let itemsData = [];
        data.forEach((item) => {
          let obj = {};
          obj.name = item[0].type;
          obj.counts = 0;
          obj.items = item;

          itemsData.push(obj);
        });
        this.itemData = itemsData;
      }
      this.$nextTick(() => {
        // 初始化navDataTop
        this.initNavDataTop();
        // 初始化itemDataTop
        this.initItemDataTop();
      });
    },
  },
  mounted() {
    this.getItems();

  },
  watch: {
    currentIndex(newValue) {
      //在改变currentIndex 时 判断左侧导航栏是否需要滚动
      let left = this.$refs.left;
      let leftTop = left.scrollTop;
      let viewHeight = left.clientHeight;
      let instance = leftTop - this.navDataTop[newValue];
      //判断左侧是否应该向上滚动了
      if (instance >= 0) {
        left.scrollTo({
          left: 0,
          top: this.navDataTop[newValue],
          behavior: "smooth",
        });
      }
      //向下滚动
      if (this.navDataTop[newValue] >= viewHeight) {
        left.scrollTo({
          left: 0,
          top: this.navDataTop[newValue],
          behavior: "smooth",
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
div#MerchantItemList {
  display: flex;
  overflow: hidden;
  height: 100%;
  box-sizing: border-box;
  padding-bottom: 94px;
  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  li {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  & > div.left {
    height: 100%;
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
    }
    scrollbar-width: none;
    flex: 1;
    & > ul {
      width: 100%;
      & > li {
        position: relative;
        width: 100%;
        padding: 32px 20px;
        box-sizing: border-box;
        border-left: 7px solid transparent;
        & > span {
          font-size: 28.75px;
          color: #666;
        }
        & > div.showCounts {
          position: absolute;
          top: 0px;
          right: 0;
          width: 30px;
          height: 30px;
          background-color: #ff461d;
          border: 1px solid transparent;
          border-radius: 100%;
          color: #fff;

          & > span {
            display: block;
            line-height: 30px;
            width: 100%;
            height: 100%;
            text-align: center;
            font-size: 25px;
          }
        }
      }
    }
  }
  & > div.main {
    flex: 3;
    margin-top: 10px;
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
    }
    scrollbar-width: none;
    height: 100%;
  }
}
.navSelected {
  font-weight: 700 !important;
  background-color: white;
  border-color: #3190e8 !important;
}
</style>