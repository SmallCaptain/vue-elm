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
          <div v-if="index === 0" class="selectMenu">
            <transition name="fadeIn">
              <Classify
                v-show="filterIndex === 0"
                :typeItems="item"
                @chageFilterIndex="chageFilterIndex"
              />
            </transition>
          </div>
          <!-- 排序tag -->
          <div v-if="index === 1" class="selectMenu">
            <transition name="fadeIn">
              <Sortord
                @chageFilterIndex="chageFilterIndex"
                v-show="filterIndex === 1"
              />
            </transition>
          </div>
          <!-- 筛选tag -->
          <div v-if="index === 2" class="selectMenu">
            <transition name="fadeIn">
              <Filtrate
                v-show="filterIndex === 2"
                @chageFilterIndex="chageFilterIndex"
              />
            </transition>
          </div>
        </li>
      </ul>
    </div>
    <!-- //遮挡层 -->
    <transition name="fadeInShadow">
      <div v-if="filterIndex !== -1" class="shadow"></div>
    </transition>
  </div>
</template>

<script>
import Classify from "./Classify.vue";
import Sortord from "./Sortord.vue";
import Filtrate from "./Filtrate.vue";
export default {
  components: { Classify, Sortord, Filtrate },
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
    // 改变当前tag选择
    chageFilterIndex(index) {
      //第一个tag对象
      let obj = this.filterList[0];
      //点击的是第一个
      if (index === 0) {
        // 是分类 就变回原来的名称
        if (this.filterList[0].name === "分类") {
          obj.name = this.filterFirst;
          this.$set(this.filterList, 0, obj);
        } else {
          // 不是分类 则名称变成分类
          obj.name = "分类";
          this.$set(this.filterList, 0, obj);
        }
      } else {
        // 不是第一个 第一个是否为分类 是 则名称恢复
        if (this.filterList[0].name === "分类") {
          obj.name = this.filterFirst;
          this.$set(this.filterList, 0, obj);
        }
      }
      //tag已选择 再一次变回未选择状态
      if (this.filterIndex !== index) {
        this.filterIndex = index;
      } else this.filterIndex = -1;
    },
    //初始化数据
    initDatas() {
      this.filterList[0].name = this.funcName;
      this.filterFirst = this.funcName;
    },
    // 异步获取数据
    async getFilterList() {
      //访问接口 取得list
      // 准备icon数组
      let iconArray = [
        "hanbao",
        "xiaochi",
        "shuiguoshengxian",
        "a-epslochushimaochushipengren",
        "a-storeshopshangdianchaoshixiaomaibu",
        "a-cakeshengridangaodangaomeishi",
        "yinpin",
        "shangjialiebiao",
      ];
      let data = await new Promise((resolve, reject) => {
        this.$axios
          .post("/merchant/getClassify")
          .then((result) => {
            resolve(result.data);
          })
          .catch((err) => {
            console.log(err);
            reject(null);
          });
      });
      if (data !== null) {
        //处理数据 加上图标
        for (let i = 0; i < data.length; i++) {
          data[i].icon = iconArray[i];
        }
        this.$set(this.filterList[0], "list", data);
      }
    },
  },
  watch: {
    funcName(newvalue) {
      this.$set(this.filterList[0], "name", newvalue);
      this.filterFirst = newvalue;
    },
  },
  created() {
    this.initDatas();
    this.getFilterList();
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
      background-color: #ffff;
      & > li {
        flex: 1;
        height: 60px;

        & > div.selectMenu {
        }

        & > div.select {
          position: relative;
          z-index: 20;
          padding-top: 20px;

          height: 100%;
          display: flex;
          justify-content: center;
          background-color: #ffff;

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
.fadeIn-enter-active {
  animation: fadeIn 0.3s linear;
}
.fadeIn-leave-active {
  animation: fadeIn 0.3s reverse linear;
}
@keyframes fadeIn {
  0% {
    // opacity: 0;
    transform: translateY(-100%);
  }

  100% {
    // opacity: 1;
    transform: translateY(0);
  }
}
.fadeInShadow-enter-active {
  animation: fadeInShadow 0.2s linear;
}
.fadeInShadow-leave-active {
  animation: fadeInShadow 0.2s reverse linear;
}
@keyframes fadeInShadow {
  0% {
    opacity: 0;
    z-index: -100;
  }
  100% {
    opacity: 1;
  }
}
</style>