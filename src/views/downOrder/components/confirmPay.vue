<template>
  <div class="payBox">
    <div class="info">
      <div class="price">
        <div>
          总价
          <span class="priceColor">{{totalMoney||0.00}}</span>
          <div class="tips">此价格不包含预估商品费用</div>
        </div>
      </div>
      <div @click="subBtn()">
        <van-button color="rgba(244, 202, 68, 1)">
          <span class="payText">确认支付</span>
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props:['totalMoney'],
  data() {
    return {
      flag: true,
    };
  },
  methods: {
    subBtn() {
      if (this.flag) {
        this.flag = false;
        setTimeout(() => {
          this.flag = true;
        }, 3000);
      }
      this.$emit("submit");
      // this.$router.push(`/paymenting`)
    },
  },
};
</script>

<style lang="scss" scoped>
.payBox {
  width: 100%;
  height: 50px;
  background-color: #fff;
  margin-top: 10px;
  .info {
    display: flex;
    justify-content: space-between;
    .price {
      padding-left: 16px;
      font-size: 14px;
      .priceColor {
        font-size: 22px;
        color: rgba(255, 149, 3, 1);
      }
      .tips {
        display: block;
        font-size: 12px;
        transform: scale(0.8);
        color: rgba(119, 119, 119, 1);
        transform-origin: 0% 0%;
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