<template>
  <div id="FilterTypes">
    <div class="content">
      <!--组件内容-->
      <ul class="list">
        <li v-for="(item, index) in filterList" :key="index">
          <div @click="chageFilterIndex(index)" class="select">
            <span :class="{ spanSelected: index === filterIndex }"
              >{{ item.name }}
              <i
                :class="{
                  iSelected: index === filterIndex,
                  unSelected: filterIndex === -1,
                }"
                class="el-icon-caret-bottom"
              ></i
            ></span>
          </div>
          <!-- 分类tag -->
          <div v-if="index ===0" class="selectMenu">
            <Classify v-show="filterIndex === 0" :typeItems="item" />
          </div>
          <!-- 排序tag -->
          <div v-if="index === 1" class="selectMenu">
            <Sortord @chageFilterIndex="chageFilterIndex" v-show="filterIndex === 1" />
          </div>
          <!-- 筛选tag -->
          <div v-if="index === 2" class="selectMenu">
            <Filtrate v-show="filterIndex === 2" />
          </div>
        </li>
      </ul>
    </div>
    <!-- //遮挡层 -->
    <div v-if="filterIndex !== -1" class="shadow"></div>
  </div>
</template>

<script>
import Classify from "./Classify.vue";
import Sortord from "./Sortord.vue";
import Filtrate from './Filtrate.vue'
export default {
  components: { Classify,Sortord,Filtrate},
  name: "FilterTypes",
  props: {
    funcName: {
      type: String,
    },
  },
  data() {
    return {
      filterList: [
        {
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
        },
        {
          name: "排序",
        },
        {
          name: "筛选",
        },
      ],
      filterIndex: -1,
      filterFirst: "",
    };
  },
  methods: {
    chageFilterIndex(index) {
      //第一个tag对象
      let obj = this.filterList[0];
      //点击的是第一个
      if (index === 0) {
        // 是分类 就变回原来的名称
        if (this.filterList[0].name === "分类") {
          obj.name=this.filterFirst;
          this.$set(this.filterList, 0,obj);
        } else{
          // 不是分类 则名称变成分类
          obj.name='分类'
          this.$set(this.filterList, 0,obj);
        }
      } else {
        // 不是第一个 第一个是否为分类 是 则名称恢复
        if (this.filterList[0].name === "分类") {
          obj.name=this.filterFirst;
          this.$set(this.filterList, 0, obj);
        }
      }
      //tag已选择 再一次变回未选择状态
      if (this.filterIndex !== index) {
        this.filterIndex = index;
      } else this.filterIndex = -1;
    },
    initDatas() {
      this.filterList[0].name = this.funcName;
      this.filterFirst = this.funcName;
    },
  },

  created() {
    this.initDatas();
  },
};
</script>

<style lang="less" scoped>
div#FilterTypes {
  background-color: #ffff;
  & > div.content {
    & > ul.list {
      display: flex;
      list-style: none;
      border-bottom: 5px solid #fbfbfb;
      & > li {
        flex: 1;
        padding-top: 20px;
        height: 60px;

        & > div.select {
          height: 46.5px;
          display: flex;
          justify-content: center;

          border-right: 1px solid #e4e4e4;

          span:nth-child(1) {
            font-size: 25px;

            & > i {
              font-size: 20px;
            }
          }
        }
      }
    }
  }
  & > div.shadow {
    position: fixed;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.3);
  }
}
.spanSelected {
  color: #3190e8;
}
.iSelected {
  transform: rotate(180deg);
  transition: all 0.5s;
}
.unSelected {
  transform: rotate(0);
  transition: all 0.5s;
}
</style>