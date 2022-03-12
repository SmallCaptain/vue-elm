<template>
  <div id="MerchantItemList">
    <div class="left">
      <ul>
        <li
          ref="navItems"
          @click="chageMain(index)"
          :class="{ navSelected: index === currentIndex }"
          v-for="(item, index) in navData"
          :key="index"
        >
          <span>{{ item.name }}</span>
        </li>
      </ul>
    </div>
    <div @touchstart="mainTouch" @scroll="mainScroll($event)" class="main">
      <merchant-item
        ref="items"
        :data="item"
        v-for="(item, index) in itemData"
        :key="index"
      />
    </div>
    <!-- //购物车 -->
    <footer></footer>
  </div>
</template>

<script>
import MerchantItem from "./MerchantItem.vue";
export default {
  name: "MerchantItemList",
  components: {
    MerchantItem,
  },
  data() {
    return {
      navData: [
        {
          name: "热销榜",
        },
        {
          name: "热销榜",
        },{
          name: "热销榜",
        },{
          name: "热销榜",
        },{
          name: "热销榜",
        },{
          name: "热销榜",
        },{
          name: "热销榜",
        },{
          name: "热销榜",
        },{
          name: "热销榜",
        },{
          name: "热销榜",
        },{
          name: "热销榜",
        },{
          name: "热销榜",
        },{
          name: "热销榜",
        },
      ],
      itemData: [
        {
          name: "热销榜",
          items: [
            {
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
              name: "阿尔卑斯",
              type: "折扣榜",
              price: 20.5,
              introduction: "好吃！",
              sales: 100,
              point: 30.5,
              label: "冰淇淋呢",
              is_specialty: 1,
              is_new_product: 1,
              img: "http://localhost:5115/public/images/iceCream.jpg",
            },
            {
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
          name: "热销榜",
          items: [
            {
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
              name: "阿尔卑斯",
              type: "折扣榜",
              price: 20.5,
              introduction: "好吃！",
              sales: 100,
              point: 30.5,
              label: "冰淇淋呢",
              is_specialty: 1,
              is_new_product: 1,
              img: "http://localhost:5115/public/images/iceCream.jpg",
            },
            {
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
        },{
          name: "热销榜",
          items: [
            {
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
              name: "阿尔卑斯",
              type: "折扣榜",
              price: 20.5,
              introduction: "好吃！",
              sales: 100,
              point: 30.5,
              label: "冰淇淋呢",
              is_specialty: 1,
              is_new_product: 1,
              img: "http://localhost:5115/public/images/iceCream.jpg",
            },
            {
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
        },{
          name: "热销榜",
          items: [
            {
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
              name: "阿尔卑斯",
              type: "折扣榜",
              price: 20.5,
              introduction: "好吃！",
              sales: 100,
              point: 30.5,
              label: "冰淇淋呢",
              is_specialty: 1,
              is_new_product: 1,
              img: "http://localhost:5115/public/images/iceCream.jpg",
            },
            {
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
        },{
          name: "热销榜",
          items: [
            {
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
              name: "阿尔卑斯",
              type: "折扣榜",
              price: 20.5,
              introduction: "好吃！",
              sales: 100,
              point: 30.5,
              label: "冰淇淋呢",
              is_specialty: 1,
              is_new_product: 1,
              img: "http://localhost:5115/public/images/iceCream.jpg",
            },
            {
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
        },{
          name: "热销榜",
          items: [
            {
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
              name: "阿尔卑斯",
              type: "折扣榜",
              price: 20.5,
              introduction: "好吃！",
              sales: 100,
              point: 30.5,
              label: "冰淇淋呢",
              is_specialty: 1,
              is_new_product: 1,
              img: "http://localhost:5115/public/images/iceCream.jpg",
            },
            {
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
        },{
          name: "热销榜",
          items: [
            {
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
              name: "阿尔卑斯",
              type: "折扣榜",
              price: 20.5,
              introduction: "好吃！",
              sales: 100,
              point: 30.5,
              label: "冰淇淋呢",
              is_specialty: 1,
              is_new_product: 1,
              img: "http://localhost:5115/public/images/iceCream.jpg",
            },
            {
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
        },{
          name: "热销榜",
          items: [
            {
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
              name: "阿尔卑斯",
              type: "折扣榜",
              price: 20.5,
              introduction: "好吃！",
              sales: 100,
              point: 30.5,
              label: "冰淇淋呢",
              is_specialty: 1,
              is_new_product: 1,
              img: "http://localhost:5115/public/images/iceCream.jpg",
            },
            {
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
        },{
          name: "热销榜",
          items: [
            {
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
              name: "阿尔卑斯",
              type: "折扣榜",
              price: 20.5,
              introduction: "好吃！",
              sales: 100,
              point: 30.5,
              label: "冰淇淋呢",
              is_specialty: 1,
              is_new_product: 1,
              img: "http://localhost:5115/public/images/iceCream.jpg",
            },
            {
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
        },{
          name: "热销榜",
          items: [
            {
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
              name: "阿尔卑斯",
              type: "折扣榜",
              price: 20.5,
              introduction: "好吃！",
              sales: 100,
              point: 30.5,
              label: "冰淇淋呢",
              is_specialty: 1,
              is_new_product: 1,
              img: "http://localhost:5115/public/images/iceCream.jpg",
            },
            {
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
        },{
          name: "热销榜",
          items: [
            {
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
              name: "阿尔卑斯",
              type: "折扣榜",
              price: 20.5,
              introduction: "好吃！",
              sales: 100,
              point: 30.5,
              label: "冰淇淋呢",
              is_specialty: 1,
              is_new_product: 1,
              img: "http://localhost:5115/public/images/iceCream.jpg",
            },
            {
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
        },{
          name: "热销榜",
          items: [
            {
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
              name: "阿尔卑斯",
              type: "折扣榜",
              price: 20.5,
              introduction: "好吃！",
              sales: 100,
              point: 30.5,
              label: "冰淇淋呢",
              is_specialty: 1,
              is_new_product: 1,
              img: "http://localhost:5115/public/images/iceCream.jpg",
            },
            {
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
        },{
          name: "热销榜",
          items: [
            {
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
              name: "阿尔卑斯",
              type: "折扣榜",
              price: 20.5,
              introduction: "好吃！",
              sales: 100,
              point: 30.5,
              label: "冰淇淋呢",
              is_specialty: 1,
              is_new_product: 1,
              img: "http://localhost:5115/public/images/iceCream.jpg",
            },
            {
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
      ],
      //左侧导航条高度
      navDataTop: [],
      // 右侧内容区高度
      itemDataTop: [],
      currentIndex: 0,
      mainScrollTop: 0, //卷尺高度？
      mainTrigger: 0, // 0 表示用户触发 1表示程序触发
      delTop:0,
      mainHeight:0//设备可用高度 delTop巧妙得取到了目前顶部导航栏的高度
    };
  },
  methods: {
    chageMain(index) {
      this.mainTrigger = 1;
      this.currentIndex = index;
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
    mainTouch(){
      this.mainTrigger = 0;
    }
  },
  mounted() {
    // 初始化navDataTop
    this.initNavDataTop();
    // 初始化itemDataTop
    this.initItemDataTop();
  },
  watch: {
    currentIndex(){
      //在改变currentIndex 时 判断左侧导航栏是否需要滚动
      let Height = window.innerHeight;
      console.log(Height);
    }
  },
};
</script>

<style lang="less" scoped>
div#MerchantItemList {
  display: flex;
  overflow: hidden;
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
    height: 930px;
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
    }
    scrollbar-width: none;
    flex: 1;
    & > ul {
      width: 100%;
      & > li {
        width: 100%;
        padding: 32px 20px;
        box-sizing: border-box;
        border-left: 7px solid transparent;
        & > span {
          font-size: 28.75px;
          color: #666;
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
    height: 930px;
  }
}
.navSelected {
  font-weight: 700 !important;
  background-color: white;
  border-color: #3190e8 !important;
}
</style>