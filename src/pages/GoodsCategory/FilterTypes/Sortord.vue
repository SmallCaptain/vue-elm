<template>
  <!-- 排序  index === 1 -->
  <div id="Sortord">
    <div class="SortordContent">
      <ul class="list">
        <li
          @click="chageCurrentIndex(index);sendType(item.keyword)"
          v-for="(item, index) in options"
          :key="index"
          class="item"
        >
          <div class="content">
            <div class="icon">
              <icon-svg iconStyle="icon" :iconClass="item.icon" />
            </div>
            <div class="name">
              <span>{{ item.name }}</span>
            </div>
            <div v-if="currentIndex === index" class="check">
              <span>
                <i class="el-icon-check"></i>
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import iconSvg from "../../../components/iconSvg.vue";
export default {
  components: { iconSvg },
  name: "Sortord",
  inject: ["sendTypeProvide"],
  data() {
    return {
      //   可选项数据
      options: [
        {
          name: "智能排序",
          icon: "cangpeitubiao_paixuzhandianpaixu",
          keyword:'autoSort'
        },
        {
          name: "距离最近",
          icon: "dingwei",
          keyword:'shortDistance'
        },
        {
          name: "销量最高",
          icon: "remen",
          keyword:'topSelling'
        },
        {
          name: "起送价最低",
          icon: "jinbi",
          keyword:'lowestStartPrice'
        },
        {
          name: "配送速度最快",
          icon: "shizhong",
          keyword:'fastDelivery'
        },
        {
          name: "评分最高",
          icon: "xingxing",
          keyword:'highestScore'
        },
      ],
      currentIndex: -1,
    };
  },
  methods: {
    chageCurrentIndex(index) {
      this.currentIndex = index;
      this.$emit("chageFilterIndex", 1);
    },
    sendType(type){
      this.sendTypeProvide(type,'Sortord');
    }
  },
};
</script>

<style lang="less" scoped>
div#Sortord {
  position: fixed;
  left: 0;
  width: 100vw;
  z-index: 15;
  background-color: #fff;
  //height: 500px;

  & > div.SortordContent {
    & > ul.list {
      list-style: none;
      & > li.item {
        padding: 0 25px;
        box-sizing: border-box;

        & > div.content {
          display: flex;
          height: 117px;
          line-height: 117px;
          justify-content: space-between;

          & > div.icon {
            display: flex;
            align-items: center;
            height: 100%;
            margin-right: 20px;
          }

          & > div.name {
            font-size: 26px;
            color: #666;
            flex: 2;
            border-bottom: 1px solid #cecece;
          }
          & > div.check {
            & > span {
              font-size: 32px;
              font-weight: 700;
            }
            border-bottom: 1px solid #cecece;
          }
        }
      }
    }
  }
}
.icon {
  width: 50px;
  height: 50px;
  fill: currentColor;
}
</style>