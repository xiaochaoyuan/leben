<template>
  <div class="box">
    <div class="topFun">
      <van-icon name="arrow-left" size="20" class="iconLeft" color="rgba(63, 59, 58, 1)" @click="$router.go(-1)" />
      <div @click="quickBtn">闪送</div>
      <div class="help" >
        帮买
        <i class="iconfont icon-weixiao1"></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    quickBtn() {
      this.$router.push("/quick");
      sessionStorage.setItem('status',0)
    },
  },
};
</script>

<style lang="scss" scoped>
.topFun {
  position: relative;
  display: flex;
  height: 66px;
  background-color: rgba(244, 202, 68, 1);
  font-size: 18px;
  justify-content: center;
  align-items: center;
  .help {
    position: relative;
    margin-left: 32px;
    i {
      position: absolute;
      left: 3px;
      bottom: -20px;
      font-size: 30px;
      color: rgba(245, 146, 1, 1);
      font-weight: 600;
    }
  }
  .iconLeft {
    position: absolute;
    left: 18px;
    top: 24px;
  }
}
</style>
