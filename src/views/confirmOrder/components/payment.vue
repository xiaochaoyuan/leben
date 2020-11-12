<template>
  <div class="payBox">
    <div class="info">
      <div class="price">
        <div>
          <div>总价</div>
          <div class="priceColor">{{ totalMoney || 0.0 }}</div>
        </div>
        <div class="colorText" @click="$router.push('/quickDeliveryFee')">
          明细
          <van-icon name="arrow" size="16" color="rgba(161, 161, 161, 1)" />
        </div>
      </div>
      <div @click="goPrice">
        <van-button color="rgba(244, 202, 68, 1)">
          <span class="payText">确认支付</span>
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["totalMoney"],
  data() {
    return {};
  },
  methods: {
    goPrice() {
      this.$emit("subMoney");
    },

  },

};
</script>

<style lang="scss" scoped>
.payBox {
  height: 50px;
  line-height: 50px;
  background-color: #fff;
  margin-top: 10px;
  .info {
    display: flex;
    justify-content: space-between;
    .price {
      display: flex;
      justify-content: space-between;
      width: 239px;
      padding-right: 19px;
      box-sizing: border-box;

      .colorText {
        .van-icon {
          padding-left: 2px;
        }
      }
      > div {
        display: flex;
        align-items: center;
      }
      padding-left: 16px;
      font-size: 14px;
      .priceColor {
        font-size: 22px;
        color: rgba(255, 149, 3, 1);
        margin-left: 10px;
      }

      .tips {
        font-size: 10px;
        color: rgba(119, 119, 119, 1);
      }
    }
  }
  .van-button {
    color: rgba(23, 1, 6, 1);
    font-weight: 600;
    width: 136px;
    height: 50px;
    .payText {
      font-size: 16px;
      color: rgba(23, 1, 6, 1);
    }
  }
}
</style>