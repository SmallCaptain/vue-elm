// 具体地址的删除
<template>
  <li class="msg">
    <div class="msgContain">
      <p class="detailAddress">{{ addressDetail.recive_area_detail }}</p>
      <p class="phone">{{ addressDetail.use_phone }}</p>
    </div>
    <span @click="delItem" v-if="!delFlag">x</span>
  </li>
</template>

<script>
export default {
  name: "reciveAddress",
  props: {
    addressDetail: {
      type: Object,
      default() {
        return {
          recive_area_detail: "无",
          use_phone: "默认",
        };
      },
    },
    delFlag: {
      type: Boolean,
      default: true,
    },
  },
  methods:{
      delItem(){
        //   负责通知父组件 该删除掉这个数据了
        this.$emit('deleAddressItem',this.addressDetail.recive_area_detail);
      }
  }
};
</script>

<style lang="less" scoped>
li.msg {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 123px;
  background-color: #fff8c3;
  margin-bottom: 10px;
  & > div.msgContain {
    display: flex;
    flex-direction: column;
    padding-left: 50px;
    & > p {
      margin: 0;
      padding: 0;
      font-size: 28px;

      &:nth-child(2) {
        padding-top: 15px;
      }
    }
  }
  & > span{
      font-size: 50px;
      padding-right: 13px;
      color:#999;
  }
}
</style>