<template>
  <div class="box">
    <div class="topFun">
      <van-icon
        name="arrow-left"
        size="20"
        class="iconLeft"
        color="rgba(63, 59, 58, 1)"
        @click="$router.go(-1)"
      />
      <div>添加地址</div>
     
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

.box {
  border-bottom: 1px solid rgba(243, 243, 243, 1);
}
.topFun {
  position: relative;
  display: flex;
  height: 58px;
  line-height: 58px;
  background-color: #fff;
  font-size: 18px;
  justify-content: center;

  .iconLeft {
    position: absolute;
    left: 14px;
    top: 20px;
  }

}
</style>
