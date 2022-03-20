// 页脚导航栏部分
<template>
  <div id="FooterNav">
    <ul>
      <li v-for="(item, index) in navData" :key="index">
        <div class="content">
          <div class="in">
            <i
              @click="toPath(item.pathName, index)"
              :class="item.icon"
              :style="{
                color: item.pathName === isSelected ? '#26ABFF' : '#666666',
              }"
            ></i>
          </div>
          <span>{{ item.name }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "FooterNav",
  data() {
    return {
      navData: [
        {
          name: "外卖",
          icon: "el-icon-eleme",
          pathName: "takeout",
        },
        {
          name: "搜索",
          icon: "el-icon-search",
          pathName: "SearchMerchants",
        },
        {
          name: "订单",
          icon: "el-icon-tickets",
          pathName: "3",
        },
        {
          name: "个人",
          icon: "el-icon-s-custom",
          pathName: "personal",
        },
      ],
    };
  },
  computed: {
    isSelected: {
      get() {
        return this.$store.state.nav.routeName;
      },
      set(data) {
        console.log(data);
      },
    },
  },
  methods: {
    toPath(path) {
      let routeName = this.$store.state.nav.routeName;
      if (routeName !== path) {
        this.$store.dispatch("nav/setRouteName", path);
        this.$router.push({
          name: path,
        });
      }
    },
  },
  created() {
    let path = this.$store.state.nav.routeName;
    this.isSelected = path;
  },
};
</script>

<style lang="less" scoped>
@height: 90px;
div#FooterNav {
  height: @height !important;
  background-color: #ffffff;
  width: 100vw;
  border-top: 3px solid #f6f6f6;
  & > ul {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    height: 100%;
    & > li {
      flex: 1;
      & > div.content {
        display: flex;
        flex-direction: column;
        height: 100%;
        & > div.in {
          flex: 2;
          position: relative;
          & > i {
            position: absolute;
            color: #666666;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            font-size: 50px;
          }
        }
        & > span {
          flex: 1;
          line-height: 100%;
          text-align: center;
          color: #666666;
          font-size: 20px;
        }
      }
    }
  }
}
</style>