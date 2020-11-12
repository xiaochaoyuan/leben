<template>
  <div class="box">
    <div class="topFun">
      <!-- <van-icon name="arrow-left" size="20" class="iconLeft" color="rgba(63, 59, 58, 1)"  @click="$router.go(-1)"/> -->
      <div class="help">
        闪送
        <i class="iconfont icon-weixiao1"></i>
      </div>
      <div @click="help()">帮买</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    help() {
      this.$router.push("/home");
      sessionStorage.setItem("status", 1);
    },
  },
};
</script>

<style lang="scss" scoped>
.topFun {
  // position: relative;
  display: flex;
  height: 58px;
  background-color: #fff;
  font-size: 18px;
  justify-content: center;
  align-items: center;
  .help {
    position: relative;
    margin-right: 32px;
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
    top: 20px;
  }
}
</style>
