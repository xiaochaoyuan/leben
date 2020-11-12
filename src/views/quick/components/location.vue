<template>
  <div class="locationBox">
    <div>
      <div class="iconBox">
        <div class="icon"></div>
        <div>成都市...</div>
      </div>
      <van-icon name="arrow-down" size="20" color="rgba(0, 0, 0, 1)" />
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
.locationBox {
  margin: 11px 9px 0;
  .iconBox {
    display: flex;
    align-items: center;
  }
  > div {
    padding: 0 16px;
    display: flex;
    align-items: center;

    justify-content: space-between;
    height: 50px;

    background-color: #fff;
    .icon {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background-color: rgba(244, 202, 68, 1);
      margin-right: 11px;
    }
  }
}
</style>