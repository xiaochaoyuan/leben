<template>
  <div class="home-footer-warp">
    <van-tabbar v-model="current" @change="changeTab()">
      <van-tabbar-item name="0">
        <span class="textSize">首页</span>
        <template #icon="props">
          <img
            :src="props.active ? icon.normal : icon.active"
            class="imgSize"
          />
        </template>
      </van-tabbar-item>
      <van-tabbar-item name="1">
        <span class="textSize">订单</span>
        <template #icon="props">
          <img
            :src="props.active ? icon1.gnnormal : icon1.gnactive"
            class="imgSize"
          />
        </template>
      </van-tabbar-item>
      <van-tabbar-item name="2">
        <span class="textSize">我的</span>
        <template #icon="props">
          <img
            :src="props.active ? icon.mynormal : icon.myactive"
            class="imgSize"
          />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  name: "homeFooter",
  data() {
    return {
      current: "0",
      icon1: {
        gnnormal: require("@/assets/icon/home/checkOrder.png"),
        gnactive: require("@/assets/icon/home/order.png"),
      },
      icon: {
        normal: require("@/assets/icon/home/home.png"),
        active: require("@/assets/icon/home/checkHome.png"),
        // gnnormal: require("@/assets/icon/home/checkOrder.png"),
        // gnactive: require("@/assets/icon/home/order.png"),
        mynormal: require("@/assets/icon/home/checkMy.png"),
        myactive: require("@/assets/icon/home/my.png"),
      },
    };
  },
  methods: {
    // 区分闪送和帮买的tab点击订单和我的如果没有token则需要到登录页面
    changeTab() {
      sessionStorage.setItem("active", this.current);
      let status = sessionStorage.getItem("status");
      if (status == 0) {
        if (this.current == 1) {
          console.log("快捷订单");
          this.$router.push("/quickMyOrder");
        } else if (this.current == 0) {
          this.$router.push("/quick");
        } else {
          this.$router.push("/myInfo");
        }
      } else {
        if (this.current == 1) {
          this.$router.push("/myOrder");
        } else if (this.current == 0) {
          this.$router.push("/home");
        } else {
          this.$router.push("/myInfo");
        }
      }
    },
  },
  mounted() {
    let a = sessionStorage.getItem("active");
    if (a) {
      this.current = a;
    }
  },
};
</script>

<style scoped lang="scss">
.home-footer-warp[data-v-42e25979] .van-tabbar {
  width: 375px;
}
/deep/.van-tabbar-item {
  line-height: 0.7;
}
.home-footer-warp {
  /deep/.van-tabbar {
    height: 50px !important;
  }
  .imgSize {
    width: 21px;
    height: 21px;
  }
  .textSize {
    display: inline-block;
    font-size: 20px;
    transform: scale(0.5);
  }
}
.van-tabbar-item--active {
  color: #000;
}
</style>