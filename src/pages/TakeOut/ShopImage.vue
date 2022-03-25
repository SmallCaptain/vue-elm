<template>
  <div @click="toShop" class="ShopImageContain">
    <div class="ShopImage">
      <img :src="item.img" alt="" />
      <p>{{ item.shopName }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShopImage",
  props: {
    item: {
      type: Object,
      default: function () {
        return {
          shopName: "麻辣烫",
          img: require("@/images/swiper/MaLaTang.jpeg"),
          pathName: "",
        };
      },
    },
  },
  methods:{
      toShop(){
          this.$router.push({
            name:'GoodsCategory',
            query:{
              title:this.item.shopName,
              type:this.item.pathName
            }
          })
      }
  }
};
</script>

<style lang="less" scoped>
div.ShopImageContain {
  display: inline-flex;
  justify-content: center;
  width: 25%;
  margin-top: 20px;
  & > div.ShopImage {
    & > img {
      display: block;
      margin: 0px auto 15px auto;
      width: 84px;
      height: 84px;
    }
    & > p {
      padding: 0;
      margin: 0;
      font-size: 26px;
      color: #666;
      text-align: center;
    }
  }
}
</style>