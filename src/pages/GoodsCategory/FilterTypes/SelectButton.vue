<template>
  <!-- 公用 选择按钮组件  -->
  <div @click="selected" id="SelectButton">
    <div class="SelectButtonContent">
      <div class="icon">
        <!-- 若有图标则展现 -->
        <icon-svg
          v-if="item.icon && !selecte"
          iconStyle="iconStyle"
          :iconClass="item.icon"
        />
        <!-- 若有自定义文字图标则展现 -->
        <span
          :style="{ borderColor: item.color, color: item.color }"
          v-if="item.char && !selecte"
          >{{ item.char }}</span
        >
        <!-- check打勾 表示是否已选 -->
        <span class="check" v-if="selecte"><i class="el-icon-check"></i></span>
      </div>
      <div class="name">{{ item.name }}</div>
    </div>
  </div>
</template>

<script>
import iconSvg from "../../../components/iconSvg.vue";

export default {
  components: { iconSvg },
  name: "SelectButton",
  props: {
    item: {
      type: Object,
    },
    selectedOptions: {
      type: Array,
    },
  },
  data() {
    return {
      //是否被选中 被选中 时候 图标改变为打勾
      selecte: false,
    };
  },
  methods: {
    selected() {
      this.selecte = !this.selecte;

      if (this.selecte === true) {
        //选择
        this.$emit("selectOption", this.item);
      } else {
        //撤销
        this.$emit("cancelOption", this.item);
      }
    },
  },
  computed: {
    copySelectedOptions() {
      return JSON.parse(JSON.stringify(this.selectedOptions));
    },
  },
  watch: {
    copySelectedOptions(newvalue, oldvalue) {
      let newLength = newvalue.length;
      let oldLength = oldvalue.length;

      //判断是增加还是减少
      if (oldLength > newLength) {
        //减少 判断原先数量是否为 1
        if (oldLength === 1) {
          // 原先数量是否为1
          this.selecte = false;
        } else {
          // 不为 1 正常情况下 不为 1 则 大于 1
          //判断 新的数量为0时 说明 清空
          if (newLength === 0) {
            this.selecte = false;
          }
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
div#SelectButton {
  & > div.SelectButtonContent {
    display: inline-flex;
    border: 2px solid #eee;
    color: #333;
    background-color: #fff;
    height: 65px;
    width: 220px;
    box-sizing: border-box;

    & > div.icon {
      display: flex;
      align-items: center;
      padding: 0 10px;

      & > span {
        border: 1px solid black;
        padding: 3px 5px;
        font-size: 25px;
      }
      & > span.check {
        border: none;
        color: #3190e8;
        font-size: 25px;
      }
    }

    & > div.name {
      font-size: 19px;
      color: #333;
      line-height: 65px;
    }
  }
}
.iconStyle {
  width: 50px;
  height: 50px;
  fill: currentColor;
  color: #3190e8;
}
</style>