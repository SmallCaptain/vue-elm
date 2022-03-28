<template>
  <svg :class="iconStyle" aria-hidden="true">
    <use :xlink:href="getClass"></use>
  </svg>
</template>

<script>
export default {
  name: "iconSvg",
  props:{
      iconClass:{//指定具体图标
          type:String,
          required:true
      },
      iconStyle:{//指定具体样式
          type:String,
          default(){
              return 'defalutStyle';
          }
      }
  },
  computed:{
      getClass(){
          return `#icon-${this.iconClass}`;
      }

  }
};
</script>

<style lang="less" scoped>
.defalutStyle {
  width: 10px;
  height: 10px;
  vertical-align: -0.15px;
  fill: currentColor;
  overflow: hidden;
}
</style>