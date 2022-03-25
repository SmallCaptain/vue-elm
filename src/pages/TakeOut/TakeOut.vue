<template>
  <transition name="fade">
    <el-container class="TakeOut">
      <el-header>
        <HeaderSearch :Area="Area" :Personal="Personal" :Search="Search" />
      </el-header>
      <el-main>
        <!-- 第一块滑动图 -->
        <div class="ShopSwiper">
          <swiper ref="mySwiper" :options="swiperOptions">
            <swiper-slide v-for="(item, index) in swiperData" :key="index">
              <shop-image
                v-for="(item2, index2) in item"
                :key="index2"
                :item="item2"
              />
            </swiper-slide>
            <template v-slot:pagination>
              <div class="swiper-pagination"></div>
            </template>
          </swiper>
        </div>
        <!-- 附近商家 -->
        <div class="storer">
          <div class="methion">
            <i class="el-icon-s-shop"></i>
            <span>附近商家</span>
          </div>
          <!-- 商家大全 -->
          <div class="stores">
            <nearby-shops
              v-for="(item, index) in storeData"
              :key="index"
              :item="item"
            />
          </div>
        </div>
      </el-main>
    </el-container>
  </transition>
</template>


<script>
import HeaderSearch from "../../components/HeaderSearch.vue";
import ShopImage from "./ShopImage.vue";
import NearbyShops from "./NearbyShops.vue";
export default {
  components: {
    HeaderSearch,
    ShopImage,
    NearbyShops,
  },
  name: "TakeOut",
  data() {
    return {
      Area: {
        pathName: "",
        area: "默认吧",
      },
      Personal: {
        pathName: "personal",
      },
      Search: {
        pathName: "SearchMerchants",
      },
      swiperOptions: {
        // 参数选项,显示小点
        pagination: {
          el: ".swiper-pagination",
          type: "bullets",
          clickable: true,
        },
      },
      swiperData: [
        [
          {
            shopName: "甜品饮品",
            img: require("@/images/swiper/TianPingYinPing.jpeg"),
            pathName: "1",
          },
          {
            shopName: "商超便利",
            img: require("@/images/swiper/ChaoShangBianLi.jpeg"),
            pathName: "2",
          },
          {
            shopName: "美食",
            img: require("@/images/swiper/MeiShi.jpeg"),
            pathName: "3",
          },
          {
            shopName: "简餐",
            img: require("@/images/swiper/JianCan.jpeg"),
            pathName: "4",
          },
          {
            shopName: "新店特惠",
            img: require("@/images/swiper/XinDianTeHui.jpeg"),
            pathName: "5",
          },
          {
            shopName: "准时达",
            img: require("@/images/swiper/ZhunShiDa.jpeg"),
            pathName: "6",
          },
          {
            shopName: "预订早餐",
            img: require("@/images/swiper/YuDingZaoCan.jpeg"),
            pathName: "7",
          },
          {
            shopName: "土豪推荐",
            img: require("@/images/swiper/TuHaoTuiJian.jpeg"),
            pathName: "8",
          },
        ],
        [
          {
            shopName: "川湘菜",
            img: require("@/images/swiper/ChuanXiangCai.jpeg"),
            pathName: "9",
          },
          {
            shopName: "麻辣烫",
            img: require("@/images/swiper/MaLaTang.jpeg"),
            pathName: "10",
          },
          {
            shopName: "包子粥店",
            img: require("@/images/swiper/BaoZiZhou.jpeg"),
            pathName: "11",
          },
          {
            shopName: "鲜花蛋糕",
            img: require("@/images/swiper/XianHuaDanGao.jpeg"),
            pathName: "12",
          },
          {
            shopName: "日韩料理",
            img: require("@/images/swiper/RiHanLiaoLi.jpeg"),
            pathName: "13",
          },
          {
            shopName: "果蔬生鲜",
            img: require("@/images/swiper/GuoShuShengXian.jpeg"),
            pathName: "14",
          },
          {
            shopName: "汉堡薯条",
            img: require("@/images/swiper/HanBao.jpeg"),
            pathName: "15",
          },
          {
            shopName: "披萨意面",
            img: require("@/images/swiper/PisaYimian.jpeg"),
            pathName: "16",
          },
        ],
      ],
      storeData: [],
    };
  },
  methods: {
    reSetVuxRoute() {
      //进来后 把vuex中路由信息更新
      let fullPath = this.$router.history.current.fullPath;
      let path = fullPath.split("/")[fullPath.split("/").length - 1];
      this.$store.dispatch("nav/setRouteName", path);
    },
    setArea() {
      this.Area.area = this.$store.state.chageRecive.nowPosistion.area;
    },
    async getStoreData() {
      let data = await new Promise((resolve, reject) => {
        this.$axios
          .post("merchant/getStore")
          .then((result) => {
            resolve(result.data);
          })
          .catch((err) => {
            console.log(err);
            reject(null);
          });
      });
      if (data) {
        // 不为null 有数据
        // console.log(data);
        this.storeData = data.data;
      } else {
        this.$message({
          type: "error",
          message: "获取商家数据失败",
        });
      }
    },
  },
  created() {
    this.reSetVuxRoute();
    this.setArea();
    this.getStoreData();
  },

};
</script>

<style lang="less" scoped>
.TakeOut {
  margin-bottom: 80px;
  & > .el-header {
    padding: 0;
    height: auto !important;
  }
  & > .el-main {
    padding: 0;
    margin: 0;

    & > div.ShopSwiper {
      height: 372px;
      background-color: white;
      & > .swiper-container {
        width: 100%;
        height: 100%;
        overflow: hidden;
        --swiper-pagination-color: #0051ff; /* 两种都可以 */
      }
    }
    & > div.storer {
      background-color: white;
      margin-top: 30px;

      & > div.methion {
        margin-left: 28px;
        padding-top: 20px;
        letter-spacing: 2px;
        & > i {
          font-size: 35px;
          color: #999;
        }
        & > span {
          margin-left: 10px;
          color: #999;
          font-size: 30px;
        }
      }
    }
  }
}
.fade-enter-active{
  animation: fadeIn 1s;
}
.fade-leave-active{
  display: none;
}
@keyframes fadeIn {
    0%{
      opacity: 0;
    }
    100%{
      opacity: 1;
    }
}
</style>