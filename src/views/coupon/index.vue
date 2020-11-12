<template>
  <div class="couponBox">
    <!-- 头部导航 -->
    <navHeader :title="title"></navHeader>

    <!-- 劵的列表页 -->
    <couponList></couponList>
  </div>
</template>

<script>
import navHeader from "@/components/happy/navHeader";

import couponList from "./components/couponList";
export default {
  components: {
    navHeader,
    couponList,
  },

  data() {
    return { title: "优惠券" };
  },
};
</script>

<style lang="scss" scoped>
</style>