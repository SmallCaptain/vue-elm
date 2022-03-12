<template>
  <div class="MerchantHeader">
    <!-- 返回导航 -->
    <div class="backNav" @click="toBack">
        <i class="el-icon-arrow-left"></i>
    </div>
    <!-- 背景图片 -->
    <div class="backgroundImage">
      <img :src="item.header_img" alt="" />
    </div>
    <!-- 内容部分 -->
    <div class="MerchantHeaderContent">
      <!-- 第一个部分 商家图 -->
      <div class="MerchantImg">
        <img :src="item.img" alt="" />
      </div>
      <!-- 第二个 商家信息 -->
      <div class="MerchantMsg">
        <div class="detailMsg">
          <div class="rowOne">
            {{ item.name }}
          </div>
          <div class="rowTwo">
            商家配送/分钟送达/配送费￥{{ item.shipping_fee }}
          </div>
          <div class="rowThree">公告:{{ item.msg }}</div>
        </div>
        <!-- 跳转到商家详情的小箭头-->
        <div class="toMerchantDetails">
            <i class="el-icon-arrow-right"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MerchantHeader",
  props: {
    // 商品
    item: {
      type: Object,
      default() {
        return {
          msg: "新店！",
          img: "http://localhost:5115/public/images/defalu_store.jpg",
          header_img: "http://localhost:5115/public/images/defalu_store.jpg",
          name: "商家1",
          shipping_fee: 2,
        };
      },
    },
  },

  methods:{
      toBack(){
          this.$router.go(-1);
      },
      
  },

};
</script>

<style lang="less" scoped>
div.MerchantHeader {
  background-color: rgba(119, 103, 137, 0.43);
  position: relative;
  
  & > div.backNav{
      width: 100%;
      height: 50px;
      position: absolute;
      z-index: 15;
      
      & > i{
          color: black;
          font-size: 50px;
      }
  }
  & > div.backgroundImage {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 10;
    & > img {
      position: absolute;
      width: 100%;
      z-index: 10;
      filter: blur(10px);
    }
  }
  & > div.MerchantHeaderContent {
    position: relative;
    z-index: 11;
    display: flex;
    height: 140px;
    padding: 18.75px 0px 18.75px 18.75px;
    background-color: rgba(119,103,137,.43);
    & > div.MerchantImg {
      & > img {
        width: 136px;
        height: 136px;
      }
    }
    & > div.MerchantMsg {
      display: flex;
      justify-content: space-between;
      width: 100%;
      margin-left: 20px;
      & > div.detailMsg {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        & > div {
          color: #fff;
          letter-spacing: 1px;
        }
        & > div.rowOne {
          font-size: 40px;
          font-weight: bold;
        }
        & > div.rowTwo {
          font-size: 25px;
          letter-spacing: 3px;

        }
        & > div.rowThree {
          font-size: 25px;
          letter-spacing: 2px;
        }
      }
      & > div.toMerchantDetails {
          font-size: 50px;
          color: #fff;

          & > i{
              line-height: 140px;
          }
      }
    }
    & > div.MerchantDetails {
    }
  }
}
</style>