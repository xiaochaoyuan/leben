<template>
  <div class="paybox">
    <van-popup v-model="payShow" position="bottom" round :style="{ height: '35%' }">
      <div class="contentBox">
        <div class="addPrice">
          <div @click="payShow=false">取消</div>
          <div class="title">选择支付方式</div>
          <div @click="isOk()">确定</div>
        </div>
        <div>
          <van-radio-group v-model="radio">
            <div
              class="payType"
              v-for="(item,index) in payList"
              :key="index"
              @click="choisePay(item.type,item.payName)"
            >
              <div class="paymoney">
                <img :src="item.icon" alt />
                <div>{{item.payName}}</div>
              </div>
              <div>
                <van-radio :name="item.type" icon-size="16px" checked-color="rgba(76, 191, 0, 1)"></van-radio>
              </div>
            </div>
          </van-radio-group>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  props: ["payStatus"],
  data() {
    return {
      payShow: false,
      radio: null,
      paytype: null, //支付方式
      payName: "", //支付名称
      payList: [
        // {
        //   icon: require("@/assets/icon/home/wallet.png"),
        //   payName: "钱包",
        //   type: "4",
        // },
        {
          icon: require("@/assets/icon/home/Alipay.png"),
          payName: "支付宝",
          type: "3",
        },
        {
          icon: require("@/assets/icon/home/paypal.png"),
          payName: "Paypal",
          type: "1",
        },
        {
          icon: require("@/assets/icon/home/card.png"),
          payName: "信用卡",
          type: "2",
        },
      ],
    };
  },
  methods: {
    //选择支付方式
    choisePay(type, payMethods) {
      this.radio = type;
      this.paytype = type;
      this.payName = payMethods;
    },
    isOk() {
      this.$emit("payType", this.paytype, this.payName);
      this.payShow = false;
    },
  },
  watch: {
    payStatus(val) {
      if (val) {
        this.payShow = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.contentBox {
  .addPrice {
    display: flex;
    padding: 0 16px;

    justify-content: space-between;
    height: 54px;
    line-height: 54px;
    border-bottom: 1px solid #eee;
    .title {
      font-size: 16px;
    }
  }
  .numBox {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    padding: 20px 16px 0;

    .priceNum {
      width: 109px;
      height: 40px;
      line-height: 40px;
      background-color: #fff;
      border: 1px solid rgba(236, 236, 236, 1);
      border-radius: 5px;
      margin-bottom: 10px;
      div {
        display: flex;
        justify-content: center;
      }
    }
    .chioseChecked {
      background-color: rgba(244, 202, 68, 1);
    }
  }
  .payType {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 0 19px;
    height: 50px;
    line-height: 50px;
    .paymoney {
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 19px;
        margin-right: 10px;
      }
    }
  }
}
</style>