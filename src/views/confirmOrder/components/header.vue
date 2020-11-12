<template>
  <div class="box">
    <div class="topFun">
      <van-icon
        name="arrow-left"
        size="20"
        class="iconLeft"
        color="rgba(63, 59, 58, 1)"
        @click="$router.push('/quick')"
      />
      <div>确认订单</div>
    </div>
  </div>
</template>

<script>
export default {

  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
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
