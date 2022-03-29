<template>
  <div id="Classify">
    <div class="Content">
      <!-- 分类标签 -->
      <div class="tag">
        <!-- 总和 -->
        <div class="total" @click="searchAll">
          <div class="totalContent">
            <div class="name">
              <span>{{ typeItems.name }}</span>
            </div>
            <div class="amounts">
              <span>{{ allMounts }}</span>
            </div>
          </div>
        </div>
        <!-- tagList -->
        <div class="tagList">
          <!-- items -->
          <div
            @click="chageCurrentIndex(index)"
            class="item"
            v-for="(item, index) in typeItems.list"
            :key="index"
            :class="{ tagSelected: index === currentIndex }"
          >
            <div class="icon">
              <iconSvg iconStyle="iconStyle" :iconClass="item.icon" />
            </div>
            <div class="name">
              <span>{{ item.tag }}</span>
            </div>
            <div class="amount">
              <span>{{ countAmount(item) }}</span>
            </div>
            <div class="arrows">
              <i class="el-icon-arrow-right"></i>
            </div>
          </div>
        </div>
      </div>
      <!-- 标签对应的列表 -->
      <div class="list">
        <div
          class="listItem"
          v-for="(item,index) in typeItems.list[currentIndex].items"
          :key="index"
          @click="sendType(item.type,item.name)"
        >
          <div class="name">
            <span>{{ item.name }}</span>
          </div>
          <div class="amount">
            <span>{{ item.amount }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import iconSvg from "../../../components/iconSvg.vue";
export default {
  components: { iconSvg },
  name: "Classify",
  inject: ["sendTypeProvide",'searchAllProvide'],
  props: {
    typeItems: {
      type: Object,
      default() {
        return {
          name: "默认",
          list: [
            {
              tag: "快餐便当",
              icon: "hanbao",
              items: [
                {
                  name: "简餐",
                  amount: 100,
                  type: "fastfood",
                },
                {
                  name: "汉堡",
                  amount: 200,
                  type: "hamburger",
                },
              ],
            },
            {
              tag: "小吃夜宵",
              icon: "xiaochi",
              items: [
                {
                  name: "烧烤",
                  amount: 150,
                  type: "barbecue",
                },
                {
                  name: "地方小吃",
                  amount: 120,
                  type: "snack",
                },
              ],
            },
          ],
        };
      },
    },
  },
  data() {
    return {
      //准确选择项
      currentIndex: 0,
    };
  },
  computed: {
    allMounts() {
      let counts = 0;
      this.typeItems.list.forEach((item) => {
        item.items.forEach((i) => {
          counts += i.amount;
        });
      });

      return counts;
    },
  },
  methods: {
    countAmount(item) {
      let counts = 0;
      item.items.forEach((i) => {
        counts += i.amount;
      });
      return counts;
    },
    chageCurrentIndex(index) {
      this.currentIndex = index;
    },
    sendType(type,name) {
      this.sendTypeProvide(type,'Classify',name);
      this.$emit("chageFilterIndex", 0);
    },
    searchAll(){
      this.searchAllProvide();
      this.$emit("chageFilterIndex", 0);
      
    }
  },
  created() {},
};
</script>

<style lang="less" scoped>

::-webkit-scrollbar {
  display: none;
}
div#Classify {
  position: fixed;
  left: 0;
  width: 100vw;
  z-index: 15;
  background-color: #fff;
  max-height: 750px;
  overflow: hidden;

  & > div.Content {
    display: flex;

    & > div.tag {
      flex: 1;
      background-color: #f1f1f1;
      overflow: auto;
      max-height: 750px;

      & > div.total {
        height: 85px;
        & > div.totalContent {
          display: flex;
          justify-content: space-between;
          height: 100%;
          box-sizing: border-box;
          padding: 0 23px;

          & > div.name {
            & > span {
              font-size: 25px;
              color: #666;
              line-height: 85px;
            }
          }

          & > div.amounts {
            & > span {
              color: #fff;
              background-color: #ccc;
              line-height: 85px;
              font-size: 19px;
              border: 1px solid transparent;
              border-radius: 150px;
              padding: 0 10px;
            }
          }
          & > div.arrows {
          }
        }
      }
      & > div.tagList {
        & > div.item {
          height: 85px;
          display: flex;
          justify-content: space-between;
          box-sizing: border-box;
          padding: 0 23px;
          line-height: 85px;
          & > div.icon {
            display: flex;
            align-items: center;
          }
          & > div.name {
            padding-right: 100px;

            & > span {
              font-size: 23px;
              color: #666;
            }
          }
          & > div.amount {
            & > span {
              background-color: #ccc;
              color: #fff;
              padding: 0 10px;
              border-radius: 150px;
              font-size: 18px;
            }
          }
        }
      }
    }
    & > div.list {
      flex: 1;
      overflow: auto;
      max-height: 750px;

      & > div.listItem {
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        margin: 0 23px;
        height: 85px;
        border-bottom: 1px solid #e4e4e4;

        & > div.name {
          line-height: 85px;
          color: #666;
          font-size: 26px;
        }
        & > div.amount {
          line-height: 85px;
          color: #666;
          font-size: 26px;
        }
      }
    }
  }
}
.iconStyle {
  width: 50px;
  height: 50px;
  fill: currentColor;
  overflow: hidden;
}
.tagSelected {
  background-color: #fff;
}
</style>