<template>
  <!-- 筛选组件 -->
  <div id="Filtrate">
    <div class="FiltrateContent">
      <div class="delivery">
        <div class="name">{{ delivery.name }}</div>
        <div class="deliverySelects">
          <ul>
            <li v-for="(item, index) in delivery.items" :key="index">
              <select-button
                :selectedOptions="selectedOptions"
                @cancelOption="cancelOption"
                @selectOption="selectOption"
                :item="item"
              />
            </li>
          </ul>
        </div>
      </div>
      <div class="MerchantsProperty">
        <div class="name">{{ merchantProperty.name }}</div>
        <div class="propertySelects">
          <ul>
            <li v-for="(item, index) in merchantProperty.items" :key="index">
              <select-button
                :selectedOptions="selectedOptions"
                @cancelOption="cancelOption"
                @selectOption="selectOption"
                :item="item"
              ></select-button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 按钮 -->
    <div class="FiltrateButton">
      <!-- 清空 -->
      <div class="clear">
        <button @click="clearSelected">清空</button>
      </div>
      <!-- 确定 -->
      <div class="sure">
        <button @click="sureSelected">
          确定<span v-if="selectedOptions.length"
            >({{ selectedOptions.length }})</span
          >
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import SelectButton from "./SelectButton.vue";
export default {
  name: "Filtrate",
  components: {
    SelectButton,
  },
  inject: ["sendTypeProvide"],
  data() {
    return {
      delivery: {
        name: "配送方式",
        items: [
          {
            name: "蜂鸟专送",
            icon: "fengniaopaotui",
            keyword: "is_hummingbird",
          },
        ],
      },
      merchantProperty: {
        name: "商家属性(可以多选)",
        items: [
          {
            name: "品牌商家",
            char: "品",
            color: "rgb(63, 189, 230)",
            keyword: "is_brand",
          },
          {
            name: "准时达",
            char: "准",
            color: "rgb(87, 169, 255)",
            keyword: "is_ticket",
          },
          {
            name: "在线支付",
            char: "付",
            color: "rgb(255, 78, 0)",
            keyword: "time_pay",
          },
        ],
      },
      //具体选择项
      selectedOptions: [],
    };
  },
  methods: {
    selectOption(item) {
      let flag = false;
      for (let i = 0; i < this.selectedOptions.length; i++) {
        if (this.selectedOptions[i].name === item.name) {
          flag = true;
          break;
        }
      }
      if (!flag) this.selectedOptions.push(item);
    },
    cancelOption(item) {
      this.selectedOptions = this.selectedOptions.filter((i) => {
        return i.name !== item.name;
      });
    },
    clearSelected() {
      this.selectedOptions = [];
    },
    sureSelected() {
      //发送 ajax请求给后端返回数据 前端这里将数据name取出重新整合 这里通知父和祖组件

      this.sendTypeProvide(this.selectedOptions, "Filtrate");
      this.$emit("chageFilterIndex", 2);
    },
  },
};
</script>

<style lang="less" scoped>
div#Filtrate {
  position: fixed;
  left: 0;
  width: 100vw;
  z-index: 15;
  background-color: #fff;

  & > div.FiltrateContent {
    div.name {
      font-size: 20px;
      color: #333;
      height: 70px;
      line-height: 70px;
      padding-left: 23px;
      padding-bottom: 10px;
    }
    & > div.delivery {
      & > div.deliverySelects {
        & > ul {
          padding-left: 20px;
          list-style: none;
          padding-bottom: 20px;

          & > li {
            display: inline-block;
            padding: 0;
            padding-right: 20px;
            padding-bottom: 20px;
          }
        }
      }
    }
    & > div.MerchantsProperty {
      & > div.propertySelects {
        & > ul {
          list-style: none;
          padding-left: 20px;
          padding-bottom: 20px;
          & > li {
            display: inline-block;
            padding: 0;
            padding-right: 20px;
            padding-bottom: 20px;
          }
        }
      }
    }
  }
  & > div.FiltrateButton {
    display: flex;
    background-color: #f1f1f1;
    padding: 14px 9px;
    justify-content: space-between;
    & > div {
      flex: 1;

      & > button {
        display: block;
        width: 330px;
        height: 80px;
        border: none;
        font-size: 35px;
        box-sizing: content-box;
        margin: 0 auto;
      }
    }
    & > div.clear {
      & > button {
        background-color: #fff;
        color: #333;
      }
    }
    & > div.sure {
      & > button {
        background-color: #56d176;
        color: #fff;
      }
    }
  }
}
</style>