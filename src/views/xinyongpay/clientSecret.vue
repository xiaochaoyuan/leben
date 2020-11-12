<template>
  <div class="detailBox">
    <section>
      <div><van-icon name="cross" @click="calcelBtn()" /></div>
      <div class="payStatus">确认支付</div>
      <div class="detailInfo">
        <div>
          <div>里程费({{ orderCost.mileage || 0 }}公里）</div>
          <div>{{ orderCost.addCost || 0 }}</div>
        </div>
        <div>
          <div>溢价费</div>
          <div>{{ orderCost.premium || 0 }}</div>
        </div>
        <div>
          <div>重量费</div>
          <div>{{ orderCost.weightCost || 0 }}</div>
        </div>
        <div>
          <div>商品基础费</div>
          <div>{{ orderCost.goodsPrice || 0 }}</div>
        </div>
        <div>
          <div>优惠券</div>
          <div>{{ orderCost.sale || 0 }}</div>
        </div>
        <div>
          <div>小费</div>
          <div>{{ orderCost.tip || 0 }}</div>
        </div>
        <div>
          <div>特殊时段费用</div>
          <div>{{ orderCost.specialCost || 0 }}</div>
        </div>
        <div>
          <div>支付金额</div>
          <div style="color: rgba(248, 73, 70, 1)">
            {{ orderCost.payPrice || 0 }}
          </div>
        </div>
      </div>
      <van-button
        type="primary"
        style="width: 100%; margin: 30px auto"
        color="rgba(244, 202, 68, 1)"
        block
        @click="payOrder"
        ><span style="color: #000; font-size: 16px">确认支付</span></van-button
      >
    </section>
  </div>
</template>

<script>
import { orderCostDetail } from "@/api/home"; //确定下单的按钮
import { xinyongCard, paypalPay, aliPay } from "@/assets/js/pay";
export default {
  data() {
    return {
      orderCost: "",
      orderNo: "",
      payType: null, //支付方式1是paypal 2是信用卡 3是支付宝
    };
  },
  methods: {
    //0是闪送1是帮买
    calcelBtn() {
      this.$router.push({
        path: "/paywaiting",
        query: {
          orderId: this.orderNo,
        },
      });
    },
    //明显
    getOrderCostDetail() {
      let data = new FormData();
      data.append("orderId", this.orderNo);
      orderCostDetail(data).then((res) => {
        if (res.code == 1000) {
          this.orderCost = res.data;
          this.payType = res.data.payType;
        }
      });
    },
    //点击支付
    payOrder() {
      let statusType = this.payType;
      if (statusType == 2) {
        xinyongCard(this.orderNo);
      } else if (statusType == 1) {
        paypalPay(this.orderNo);
      } else {
        let _this = this;
        aliPay(this.orderNo, _this);
      }
    },
  },
  activated() {
    this.orderNo = this.$route.query.orderNo;
    this.getOrderCostDetail();
  },
};
</script>

<style lang="scss" scoped>
.detailBox {
  background-color: #fff;
  height: 100vh;
  padding: 30px;
  padding-bottom: 0;
  box-sizing: border-box;
}
.priceInfo {
  font-size: 16px;
  height: 60px;
  line-height: 60px;
  width: 100%;
  padding: 0 16px;
  border-bottom: 1px solid #eee;
}
.payStatus {
  font-size: 26px;
  margin: 10px 0;
  margin-top: 30px;
}
.detailInfo {
  padding-top: 25px;
  > div {
    display: flex;
    justify-content: space-between;
    height: 37px;
    line-height: 37px;
  }
}
.van-icon {
  font-size: 26px;
}
</style>