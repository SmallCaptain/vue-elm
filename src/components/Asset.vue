// 资产组件 公用
// 目前复用于我的余额 和 我的积分
<template>
  <div class="AssetContainer">
    <div class="AssectMain">
      <!-- 提示栏 -->
      <div class="methion" @click="toIntroduction(assetCopy.methion.explainTo)">
        <!-- 当前余额 -->
        <span>{{ assetCopy.methion.name }}</span>
        <!-- 余额说明 -->
        <div>
          <i class="el-icon-question"></i>
          <span>{{ assetCopy.methion.explain }}</span>
        </div>
      </div>
      <!-- 数量栏 -->
      <div class="amount">
        <span class="amounts">{{ assetCopy.amount }}</span>
        <span class="unit">{{ assetCopy.unit }}</span>
      </div>
      <!-- 按纽 -->
      <div class="btn">
        <!-- 需要父组件提供按钮 有不同实现逻辑 -->
        <slot name="submitBtn"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Asset",
  props: {
    asset: {
      type: Object,
    },
  },
  data() {
      return {
          assetCopy:{}
      }
  },
  created(){
      this.assetCopy=this.asset;
  },
  methods:{
      toIntroduction(data){
        this.$router.push({
          name:data
        })
      }
  }
};
</script>

<style lang="less" scoped>
div.AssetContainer {
  width: 100%;
  height: 340px;
  background-color: #3190e8;
  box-sizing: border-box;
  padding: 14px;
  & > div.AssectMain {
    background-color: white;
    height: 100%;
    border: 1px solid transparent;
    border-radius: 8px;
    padding: 18px;
    box-sizing: border-box;
    & > div.methion {
      //提示
      display: flex;
      justify-content: space-between;

      & > span {
        color: #666;
        font-size: 25px;
      }
      & > div {
          display: flex;
        & > i {
          color: #3190e8;
          font-size: 32px;
          padding-right: 10px;
        }
        & > span {
          color: #3190e8;
          font-size: 25px;
        }
      }
    }
    & > div.amount {
        & > span.amounts{
            font-size: 85px;
        }
        & > span.unit{
            font-size: 32px;
        }
    }
    & > div.btn {
        margin-top: 47px;
    }
  }
}
</style>