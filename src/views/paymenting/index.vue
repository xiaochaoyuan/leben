<template>
  <div class="payBox">
    <NavHeader :title="title"></NavHeader>
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
    };
  },
  activated() {

  },
};
</script>

<style lang="scss" scoped>
.payBox{
  height: 100vh;
  background-color:#FFF;
}
</style>