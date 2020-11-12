<template>
  <div class="box">
    <div class="topFun">
      <van-icon name="arrow-left" size="20" class="iconLeft" color="rgba(63, 59, 58, 1)" @click="$router.push('/quickMyOrder')"/>
      <div>订单详情</div>
    </div>
    <div class="downFun"></div>
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
  height: 150px;
  background-color: rgba(244, 202, 68, 1);
  font-size: 18px;
  justify-content: center;
  padding-top: 22px;
  box-sizing: border-box;

  .iconLeft {
    position: absolute;
    left: 18px;
    top: 23px;
  }
}
.downFun{
  height: 55px;
}
</style>
