<template>
  <div class="payBox">
    <!-- <NavHeader :title="title"></NavHeader> -->
      <div class="box">
    <div class="topFun">
      <div>支付失败</div>
    </div>
  </div>
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
      title: "",
      status: "", //支付状态
    };
  },
  activated() {
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