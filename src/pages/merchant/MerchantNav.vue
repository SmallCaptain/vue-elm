<template>
  <nav id="MerchantNav">
    <div v-for="(item, index) in navData" :key="index">
      <span
        :class="{ selected: isSelected === index }"
        @click="chageContent(item.pathName, index)"
      >
        {{ item.name }}</span
      >
    </div>
  </nav>
</template>

<script>
export default {
  name: "MerchantNav",
  data() {
    return {
      navData: [
        {
          name: "商品",
          pathName: "MerchantItemList",
        },
        {
          name: "评价",
          pathName: "",
        },
      ],
      isSelected: 0,
    };
  },
  methods: {
    chageContent(pathName, index) {
      if (this.isSelected !== index) {
        this.isSelected = index;
        // 回传组件名给父组件
        this.$emit('chageShow',pathName);
      }
    },
  },
};
</script>

<style lang="less" scoped>
nav#MerchantNav {
  display: flex;
  height: 61px;
  padding: 14px 0 28px 0;
  background-color: white;
  & > div {
    flex: 1;
    text-align: center;
    color: #666;
    & > span {
      line-height: 61px;
      font-size: 30px;
    }
  }
}
.selected {
  color: #3190e8;
  border-bottom: 5px solid #3190e8;
  padding-bottom: 10px;
}
</style>