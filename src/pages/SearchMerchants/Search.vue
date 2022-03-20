<template>
  <div id="Search">
    <div class="SearchContent">
      <input
        type="text"
        placeholder="请输入商家或美食名称"
        autocomplete="off"
        v-model="searchText"
        @focus="showDel"
        @blur="hidDel"
      />
      <div class="del" @click="delText" v-show="this.searchText !== ''">x</div>

      <button ref="search" @click="toSearch">提交</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      searchText: "",
      delFlag : false
    };
  },
  props:{
      text:{
          type:String
      }
  },
  methods: {
    toSearch() {
      this.$emit("toSearch", this.searchText);
    },
    delText(){
        this.searchText = "";
        this.$emit('delText');
    },
    showDel(){
        this.delFlag = true;
    },
    hidDel(){
        this.delFlag = false;
    }
  },
  watch:{
      text(newV){
          this.searchText = newV;
          this.$refs.search.click();
      }
  }
};
</script>

<style lang="less" scoped>
div#Search {
  background-color: #fff;
  padding: 24px;

  & > div.SearchContent {
    position: relative;
    display: flex;

    & > input {
      flex: 4;
      font-size: 32px;
      font-weight: bold;
      border: none;
      outline: none;
      height: 70px;
      background-color: #f2f2f2;
      color: #333;
      padding: 0 12px;
      margin-right: 10px;
    }
    & > button {
      flex: 1;
      width: 150px;
      font-size: 32px;
      font-weight: bold;
      background-color: #3190e8;
      color: #fff;
      border: none;
      outline: none;
      border-radius: 8px;
      padding: 0 12px;
    }
    & > div.del{
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 25%;
        font-size: 32px;
    }
  }
}
</style>