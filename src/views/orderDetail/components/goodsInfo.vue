<template>
  <div class="goodsInfo">
    <div>物品信息</div>
    <div>{{goodsInfo}}</div>
  </div>
</template>

<script>
export default {
  props: {
    goodsInfo: {
      define: String,
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.goodsInfo {
  margin: 0 16px;
  padding: 0 16px;
  background-color: #fff;
  height: 139px;
  margin-top: 10px;
  font-weight: 550;
  border-radius: 10px;
  > div:nth-child(1) {
    font-size: 16px;
    padding: 27px 0 15px 0;
  }
}
</style>
