<template>
  <div class="payBox boxShadow">
    <div>
      <div class="payList" @click="choisePayType">
        <div><img src="@/assets/icon/payInfo/pay.png" alt />支付方式</div>
        <div>
          <span v-if="payMethodsName">{{ payMethodsName }}</span>
          <span v-else class="colorText">请选择支付方式</span>

          <van-icon name="arrow" size="16" color="rgba(161, 161, 161, 1)" />
        </div>
      </div>
      <div class="payList" @click="helpTime()">
        <div><img src="@/assets/icon/payInfo/colck.png" alt />取件时间</div>
        <div>
          {{ buyStatus }}
          <van-icon name="arrow" size="16" color="rgba(161, 161, 161, 1)" />
        </div>
      </div>
      <div class="payList" @click="goCoupon()">
        <div><img src="@/assets/icon/payInfo/coupon.png" alt />优惠劵</div>
        <div style="color: rgba(248, 73, 70, 1)">
          {{ num == 0 ? "无" : `${num}张可用` }}
          <van-icon name="arrow" size="16" color="rgba(161, 161, 161, 1)" />
        </div>
      </div>
      <div class="payList" @click="addMoneyBtn()">
        <div>
          <img src="@/assets/icon/payInfo/addMoney.png" alt />
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
    <!-- 支付方式弹窗-->
    <PayMethods :payStatus="payStatus" @payType="payType"></PayMethods>
    <!-- 时间弹出框 -->
    <ChoiseTime
      :showTime="showTime"
      @buyTime="buyTime"
      timeStatus="立即取件"
    ></ChoiseTime>
  </div>
</template>
<script>
import PayMethods from "@/components/happy/patMethods"; //支付方式
import ChoiseTime from "@/components/happy/choiseTime"; //时间控件
import AddMoney from "@/components/happy/addMoney"; //加小费
import { getDate } from "@/assets/js/up";
import { couponsManagerList } from "@/api/home";

export default {
  components: {
    PayMethods,
    ChoiseTime,
    AddMoney,
  },
  data() {
    return {
      num: "", //优惠劵的数量
      addMoney: 0,
      showTime: 0,
      timeShow: false,
      buyStatus: "立即取件",
      payStatus: 0,
      defaultIndex: 0,
      payMethodsName: "",
      smallMoney: null, //加小费
    };
  },
  activated() {
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
    choiseNum(num) {
      this.smallMoney = num;
      this.$emit("addPrice", num);
    },
    helpTime() {
      this.showTime++;
    },
    addMoneyBtn() {
      this.addMoney++;
    },
    buyTime(e) {
      console.log(e);
      let time = "";
      if (e[1] == "立即取件") {
        time = getDate(Date.parse(new Date()));
        console.log(time);
      } else if (e[0] == "明天") {
        time = getDate(Date.parse(new Date()), 1, e[1], e[2]);
      } else if (e[0] == "今天" || e[0] == "") {
        time = getDate(Date.parse(new Date()), 0, e[1], e[2]);
      }
      this.buyStatus = time;
      this.$emit("chioseTime", this.buyStatus);
    },
    //支付方式
    payType(type, typeName) {
      this.payMethodsName = typeName;
      this.$emit("goPay", type, typeName);
    },
    choisePrice(i) {
      this.flag = i;
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
  height: 201px;
  background-color: #fff;
  box-sizing: border-box;
  margin: 10px 16px 0;
  font-size: 14px;
  border-radius: 5px;
  .payList {
    display: flex;
    justify-content: space-between;
    height: 50px;
    font-size: 14px;
    line-height: 50px;
    margin: 0 16px;
    border-bottom: 1px solid #eee;
    > div:nth-child(1) {
      display: flex;
      align-items: center;
      img {
        width: 24px;
        height: 24px;
        margin-right: 12px;
      }
    }
    .tips {
      font-size: 12px;
      margin-left: 14px;
      color: rgba(119, 119, 119, 1);
      margin-top: 1px;
    }
    .van-icon {
      vertical-align: text-top;
    }
  }
}
</style>
