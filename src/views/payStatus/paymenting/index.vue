<template>
  <div class="payBox">
      <div class="box">
    <div class="topFun">
      <!-- <van-icon
        name="arrow-left"
        size="20"
        class="iconLeft"
        color="rgba(63, 59, 58, 1)"
        @click="$router.go(-1)"
      /> -->
      <div>{{title}}</div>
    </div>
  </div>
    <!-- <NavHeader :title="title"></NavHeader> -->
    <PayStatus></PayStatus>
    <!-- <Exchange></Exchange> -->
  </div>
</template>

<script>
import NavHeader from "@/components/happy/navHeader";
import PayStatus from "./components/payStatus";
import Exchange from "./components/exchange";

export default {
  components: {
    NavHeader,
    PayStatus,
    Exchange,
  },

  data() {
    return {
      title: "支付完成",
      status: "", //支付状态
    };
  },
  activated() {
    console.log('支付');
    this.status = this.$route.query.status;
    if (this.status == 2) {
      this.title = "等待支付";
      console.log(this.title);
    }
  },
};
</script>

<style lang="scss" scoped>
.payBox{
  height: 100vh;
  background-color:#FFF;
}
.topFun {
  position: relative;
  display: flex;
  height: 58px;
  line-height: 58px;
  background-color: #fff;
  font-size: 18px;
  justify-content: center;
  border-bottom: 1px solid #eee;

  .iconLeft {
    position: absolute;
    left: 10px;
    top: 20px;
  }
}
</style>