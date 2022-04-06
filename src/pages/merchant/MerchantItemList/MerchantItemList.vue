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
        @selectSpecificationShops="selectSpecificationShops"
      />
    </div>
    <!-- //购物车 -->
    <footer>
      <shopping-cart
        @cachShoppingCart="cachShoppingCart"
        @selectShops="selectShops"
        @delShops="delShops"
        :selectData="selectData"
        @clearCarts="clearCarts"
        :shippingFee="itemObj.shipping_fee"
        :de_condition="itemObj.de_conditions"
        :storeId="storeId"
        @selectSpecificationShops="selectSpecificationShops"
        @delSpecificationShops="delSpecificationShops"
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
    itemObj: {
      type: Object,
    },
  },
  data() {
    return {
      //商品分类数据
      itemData: [],
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
    // 选择规格商品 意为 增加有规格选项商品时才触发的方法
    selectSpecificationShops(item, detail = null, index) {
      //注意规格不同 和 规格一样的商品（这个也可以算作同种
      //通过propertyIndex 可以判断是那个规格商品 也就是index
      //购物车中如果存在 index 相同的数据 且 type 也一致 那么再进行判断规格是否完全一致
      let shoppingCart = this.selectData;
      let obj = JSON.parse(JSON.stringify(item));
      obj.classify_detail = detail === null?obj.classify_detail:detail;
      let isExist = false; //判断购物车中商品是否已存在 true 存在 false 不存在
      /*
        console.log("@item:", obj);
        console.log("@index:", index);
        console.log("@shoppingCart:", shoppingCart);
      */

      for (let i = 0; i < shoppingCart.length; i++) {
        if (
          shoppingCart[i].item.type === obj.type &&
          shoppingCart[i].index === index
        ) {
          //分类与规格商品索引都一样
          // 还需判断规格是否都一致性
          let flag = this.judgeSpecification(obj, shoppingCart[i].item);
          if (flag) {
            //同类商品 但规格选择不同
            //表明一致 跳出 无须查找了
            //并且将该数据 counts ++
            let typeIndex = this.findTypeIndex(obj.type);
            // this.$set(shoppingCart,i,itemObj);
            shoppingCart[i].counts++;
            this.itemData[typeIndex].counts++;
            isExist = true;
            break;
          } else {
            //不跳出 继续查找 后续可能存在规格一致的商品
            isExist = false;
          }
        }
      }
      if (!isExist) {
        //商品不存在
        let cartObj = {
          counts: 1,
          index,
          item: obj,
        };
        let typeIndex = this.findTypeIndex(obj.type);
        this.itemData[typeIndex].counts++;
        this.selectData.push(cartObj);
      }
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
    //findTypeIndex 查找商品在itemData属于哪一分类的索引
    findTypeIndex(type) {
      let reIndex = 0;
      for (let i = 0; i < this.itemData.length; i++) {
        if (this.itemData[i].name === type) reIndex = i;
      }
      return reIndex;
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
    // 删除规格商品 从购物车中 删除对应的规格商品
    delSpecificationShops(item,index){
      // 判断条件
      // 1.item的type 与购物车中的type是否一致
      // 2.item的index 与购物车中index是否一致
      // 3.满足 1 与 2 条件时 判断规格是否完全一致
      // 4.满足 1 与 2 与 3条件时 判断counts大小 === 1 则删除 >1 则counts减少1;
      let cartShops = this.selectData;
      let isExist = -1;
      /*
      console.log('@cartShops:',cartShops);
      console.log('@item:',item);
      console.log('@index:',index);
      */
      for(let i = 0 ;i < cartShops.length; i++){
        if(cartShops[i].item.type === item.type && cartShops[i].index === index){
          // 分类与索引都一致 表明存在 而后 再进行规格判断
          let flag = this.judgeSpecification(item,cartShops[i].item);
          if(flag){
            // 为真时 表明找到相同规格的商品 情况为判断条件4
            // 缓存位置后 剪枝跳出
            isExist = i;
            break;
          }          
        }
      }
      if(isExist > -1){
        //意味着找到本次要删除商品在购物车中的位置 情况为判断条件4
        let typeIndex = this.findTypeIndex(item.type);
        // 判断counts大小 
        if(cartShops[isExist].counts > 1){
          cartShops[isExist].counts--;
        }else{
          cartShops[isExist].counts--;
          cartShops.splice(isExist,1);
        }
        this.itemData[typeIndex].counts--;
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
        this.$nextTick(() => {
          // 初始化navDataTop
          this.initNavDataTop();
          // 初始化itemDataTop
          this.initItemDataTop();
        });
        this.initcatchShoppingCart();
      }
    },
    //缓存 购物车数据至vuex
    cachShoppingCart(data = null) {
      let obj = {};
      obj.storeId = this.storeId;
      obj.data = this.selectData;
      if (data !== null) obj.data = data;
      this.$store.dispatch("shopping/addShopping", obj);
    },
    //初始化购物车数据
    initcatchShoppingCart() {
      let shoppingCart = this.$store.state.shopping.shoppingCart;

      if (shoppingCart.length !== 0) {
        //说明存在缓存数据 查看是否属于当前购物车数据
        let index = -1;
        for (let i = 0; i < shoppingCart.length; i++) {
          if (shoppingCart[i].storeId === this.storeId) {
            index = i;
            break;
          }
        }
        // console.log(shoppingCart[index]);
        if (index !== -1) {
          this.selectData = shoppingCart[index].data;
        } else return;

        //与此同时 初始化 分类数据总量
        let newItemData = [];
        // console.log(this.itemData);
        this.itemData.forEach((item) => {
          let obj = item;

          shoppingCart[index].data.forEach((shopItem) => {
            if (obj.name === shopItem.item.type) {
              //找到分类
              obj.counts += shopItem.counts;
            }
          });
          newItemData.push(obj);
        });
        // console.log(newItemData);
        if (newItemData.length !== 0) this.itemData = newItemData;
      }
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