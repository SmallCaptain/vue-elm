<template>
  <div class="contain">
    <div class="methion">
      <!-- 到期数量提醒 -->
      <span class="deadLineMethion">
        有<span>{{ redPacketData.deadNum }}</span
        >个红包即将到期
      </span>
      <!-- 红包说明 -->
      <span @click="toInfo" class="redPackInfo">
        <i class="el-icon-question"></i>
        <span>{{ redPacket.name }}</span>
      </span>
    </div>
    <!-- 具体红包 -->
    <div class="redPacket">
      <div class="redPacketItem">
        <red-packet-item
          v-for="(item, index) in redPacketData.redPacketInfo"
          :key="index"
          :redPacketItem="item"
        />
      </div>
      <!-- 提示 -->
      <div class="redPacketMethion">
        {{ useInfo.title }}: {{ useInfo.info }}
      </div>
      <!-- 查看历史红包 -->
    </div>
    <footer class="footerNav">
      <nav>
        <div
          @click="toFunc"
          class="item"
          v-for="(item, index) in bottomNav"
          :key="index"
        >
          {{ item.name }}
        </div>
      </nav>
    </footer>
  </div>
</template>

<script>
import RedPacketItem from "./RedPacketItem.vue";
export default {
  components: { RedPacketItem },
  name: "RedPacket",
  data() {
    return {
      redPacket: {
        name: "红包说明",
        routeName: "",
      },
      //   红包数据
      redPacketData: {
        totalNum: 0,
        deadNum: 0,
        redPacketInfo: [
        //   {
        //     packet_id: 1,
        //     user_id: "_Lx8JpSFDRaGxwWO1B6bR",
        //     dead_time: "2023-05-10",
        //     type: "分享红包",
        //     use_phone: "15260502398",
        //     amounts: 40.5,
        //     condiction: "满20元可用",
        //     stale_dated: 0,
        //     leav_time: 10,
        //   },
        ],
      },
      //   提示信息
      useInfo: {
        title: "限品类",
        info: "限品类：快餐便当、特色菜系、小吃夜宵、甜品饮品、异国料理",
      },
      // 底部导航信息
      bottomNav: [
        {
          name: "兑换红包",
          routeName: "",
        },
        {
          name: "推荐有奖",
          routeName: "",
        },
      ],
    };
  },
  methods: {
    toInfo() {},
    toFunc() {},
    async getData() {
      let data = await new Promise((resolve, reject) => {
        this.$axios
          .post("user/RedPacket")
          .then((result) => {
            resolve(result.data);
          })
          .catch((err) => {
            console.log(`err`, err);
            reject(null);
          });
      });
      if (data !== null) {
          this.redPacketData=data;
      }
    },
  },
  created() {
      this.getData();
  },
};
</script>

<style lang="less" scoped>
div.contain {
  padding: 0px 32px;
  & > div.methion {
    display: flex;
    justify-content: space-between;
    height: 93px;
    line-height: 93px;
    & > span.deadLineMethion {
      color: #666;
      font-size: 25px;
      & > span {
        margin: 0 10px;
        color: red;
      }
    }
    & > span.redPackInfo {
      color: #3190e8;
      & > i {
        font-size: 30px;
        margin-right: 10px;
      }
      & > span {
        font-size: 25px;
      }
    }
  }
  & > div.redPacket {
    & > div.redPacketMethion {
      padding: 18px;
      color: #999;
      font-size: 19px;
    }
  }
  & > footer.footerNav {
    position: fixed;
    width: 100vw;
    height: 93px;
    background-color: white;
    bottom: 0;
    left: 0;
    & > nav {
      height: 100%;
      display: flex;
      & > div.item {
        flex: 1;
        font-size: 32px;
        color: #555;
        text-align: center;
        line-height: 93px;
      }
    }
  }
}
</style>