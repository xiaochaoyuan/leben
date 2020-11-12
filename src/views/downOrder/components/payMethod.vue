<template>
  <div class="payBox boxShadow">
    <div>
      <div class="payList" @click="$router.push(`/deliveryFee`)">
        <div>配送费</div>
        <div style="color: rgba(119, 119, 119, 1)">{{sendKm}}公里以内  {{sendKm}}</div>
      </div>
      <div class="payList" @click="choisePayType">
        <div>支付方式</div>
        <div>
          <span v-if="payMethods">{{ payMethods }}</span>
          <span v-else class="colorText">请选择支付方式</span>
          <van-icon name="arrow" size="16" color="rgba(161, 161, 161, 1)" />
        </div>
      </div>
      <div class="payList" @click="goCoupon()">
        <div>优惠劵</div>
        
        <div style="color: rgba(248, 73, 70, 1)">
          {{ num == 0 ? "无" : `${num}张可用` }}
          <van-icon name="arrow" size="16" color="rgba(161, 161, 161, 1)" />
        </div>
      </div>
      <div class="payList" @click="addMoneyBtn()">
        <div>
          加小费
          <span class="tips">配送员能更快接单</span>
        </div>
        <div>
          {{ smallMoney || 0 }}
          <van-icon name="arrow" size="16" color="rgba(161, 161, 161, 1)" />
        </div>
      </div>
    </div>
    <!-- 小费弹出层 -->
    <AddMoney :addMoney="addMoney" @choiseNum="choiseNum"></AddMoney>
    <!-- 支付方式弹窗层 -->
    <PayMethods :payStatus="payStatus" @payType="payType"></PayMethods>
  </div>
</template>
<script>
import PayMethods from "@/components/happy/patMethods"; //支付方式
import AddMoney from "@/components/happy/addMoney"; //加小费
import { couponsManagerList } from "@/api/home";

export default {
  props:['sendKm','includeKm'],
  components: {
    PayMethods,
    AddMoney,
  },
  data() {
    return {
      payMethods: "",
      smallMoney: null, //加小费
      addMoney: 0,
      payStatus: 0,
      num: null,
    };
  },
  mounted() {
    this.getCouponsManagerList();
  },
  methods: {
    goCoupon() {
      if (this.num == 0) {
        return;
      } else {
        this.$router.push(`/coupon`);
      }
    },
    getCouponsManagerList() {
      couponsManagerList({
        type: 3,
      }).then((res) => {
        if (res.code == 1000) {
          this.num = res.data;
          console.log(this.num);
        }
      });
    },
    addMoneyBtn() {
      this.addMoney++;
    },
    choiseNum(num) {
      this.smallMoney = num;
      this.$emit('payMoney',num)
    },
    //支付方式
    payType(type, typeName) {
      this.payMethods = typeName;
      this.$emit("goPay", type, typeName);
    },
    //选择支付方式
    choisePayType() {
      this.payStatus++;
    },
  },
};
</script>

<style lang="scss" scoped>
.payBox {
  width: 343px;
  min-height: 201px;
  background-color: #fff;
  box-sizing: border-box;
  margin: 0 16px;
  margin-top: 13px;
  font-size: 14px;
  .payList {
    display: flex;
    justify-content: space-between;
    height: 50px;
    font-size: 14px;
    line-height: 50px;
    margin: 0 16px;
    border-bottom: 1px solid #eee;
    .tips {
      font-size: 12px;
      margin-left: 14px;
    }
    .van-icon {
      vertical-align: text-top;
    }
  }
}
</style>
