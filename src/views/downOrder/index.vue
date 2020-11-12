<template>
  <div class="box">
    <OrderHearder></OrderHearder>
    <div class="addressBox">
      <AddRess
        :status="status"
        @chioseTime="chioseTime"
        @shipAddressAddress="shipAddressAddress"
      ></AddRess>
    </div>
    <Goods @helpGoods="goods" ref="goods"></Goods>
    <ChoiseType @price="price"></ChoiseType>
    <PayMethod
      @goPay="getPayType"
      @payMoney="payTips"
      :sendKm="sendKm"
      :includeKm="includeKm"
    ></PayMethod>
    <ReMarks></ReMarks>
    <ConfirmPay @submit="subBtn()" :totalMoney="totalMoney"></ConfirmPay>
  </div>
</template>
<script>
import { buyOrder, newAliPay, detailType } from "@/api/home";
import { getDate, timeRrange, getHours } from "@/assets/js/up";
import OrderHearder from "./components/orderHearder";
import ChoiseType from "./components/choiseType";
import AddRess from "./components/address";
import Goods from "./components/goods";
import PayMethod from "./components/payMethod";
import ReMarks from "./components/remarks";
import ConfirmPay from "./components/confirmPay";
export default {
  components: {
    OrderHearder,
    AddRess,
    Goods,
    ChoiseType,
    PayMethod,
    ReMarks,
    ConfirmPay,
  },

  data() {
    return {
      totalMoney: null, //总金额
      status: null, //地址信息
      from: {
        payType: "", //支付方式1.PayPal 2. 信用卡 3.支付宝4.钱包
        tip: 0, //小费的金额
        type: 3, //订单类型1.外卖2.超市3.帮买4.闪送5.搬家6.用车
        goods: "", //帮买的商品名称
        pickupAddress: "", //(帮买)取件地址
        pickupName: "", //帮买)取货人名称
        pickupPhone: "", //取货人电话
        pickupTime: "立即帮买", //取件时间
        mileage: 0, //公里数
        pickupAddress: "就近帮买",
        shipAddress: "", //收件地址
        shipName: "", //收件名字
        shipPhone: "", //收件电话
        forecastPrice: "", //商品预估价格
        remark: "", //备注信息
      },
      sendKm: null, //基础费用
      includeKm: null, //基础费用包含公里数
      priceKm: null, //没增加一公里的费用
      premium: null, //溢价费用
      includeKg: null, //包含公斤数
      priceKg: null, //每一公斤增加费用
      sendKg: null, //重量基础费用
      teshuMoney: 0, //特殊时段费用
    };
  },
  methods: {
    shipAddressAddress(val) {
      console.log("val", val);
      if (val) {
        let send = this.sendKm; //基础费用includeKm
        let sendFj = null;
        if (this.from.mileage - this.includeKm >= 0) {
          sendFj = (this.from.mileage - this.includeKm) * this.priceKm; //距离附加费
        }
        let premium = this.premium;
        let weight = this.sendKg;
        let teshuMoney = this.teshuMoney; //特殊时段费用
        this.totalMoney = (
          Number(send) +
          Number(sendFj) +
          Number(premium) +
          Number(weight) +
          Number(teshuMoney)
        ).toFixed(2);
      }
    },
    //预估商品费用
    price(val) {
      console.log(val);
      this.from.forecastPrice = val;
    },
    //取件时间
    chioseTime(time) {
      this.from.pickupTime = time;
    },
    //付款方式
    getPayType(val) {
      console.log(val);
      this.from.payType = val;
    },
    //付小费的金额
    payTips(val) {
      console.log(val);
      this.from.tip = val;
      this.totalMoney += val;
    },
    //帮买的商品名称
    goods(val) {
      this.from.goods = val;
      console.log(this.from.goods);
    },
    //确定支付
    /*
    buyAddress (帮买)购买地址
    couponsId 优惠劵id
    goods  (帮买)物品
    payType 支付方式1.PayPal 2. 信用卡 3.支付宝4.钱包
    pickupAddress (帮买)取件地址
    pickupName (帮买)取货人名称
    pickupPhone (帮买)取货人电话
    pickupTime (帮买)取件时间
    shipAddress 帮买)收件地址
    shipName (帮买)收件人姓名
    shipPhone (帮买)收件人电话
    tip  (帮买)小费 
    type  订单类型1.外卖2.超市3.帮买4.闪送5.搬家6.用车
    weight  (帮买)重量
    */
    subBtn() {
      this.from.shipAddress = this.$store.state.helpFromAds.shipAddress;
      this.from.shipName = this.$store.state.helpFromAds.shipName;
      this.from.shipPhone = this.$store.state.helpFromAds.shipPhone;
      if (this.from.pickupTime == "立即帮买") {
        this.from.pickupTime = getDate(Date.parse(new Date()));
      }
      this.from.remark = this.$store.state.remake;
      if (
        this.from.shipAddress == "" ||
        this.from.shipName == "" ||
        this.from.shipPhone == ""
      ) {
        this.$toast("请填写配送信息");
        return;
      } else if (this.from.goods == "") {
        this.$toast("请填写帮买商品");
        return;
      } else if (this.from.forecastPrice == "") {
        this.$toast("请填写商品预估价格");
        return;
      } else if (this.from.payType == "") {
        this.$toast("请选择支付方式");
        return;
      }
      buyOrder(this.from).then((res) => {
        if (res.code == 1000) {
          this.$router.push({
            path: "/payStatus",
            query: {
              orderNo: res.data,
            },
          });
          //3是支付宝 2是信用卡
          // if (this.from.payType == 3) {
          //   let data = new FormData();
          //   data.append("orderNo", res.data);
          //   data.append("type", 3);
          //   newAliPay(data).then((res) => {
          //     if (res.code == 1000) {
          //       this.$router.push({
          //         path: "/payGateWay",
          //         query: {
          //           html: res.data,
          //         },
          //       });
          //     }
          //   });
          // } else if (this.from.payType == 2 || this.from.payType == 1) {
          //   this.$router.push({
          //     path: "/payStatus",
          //     query: {
          //       orderNo: res.data,
          //     },
          //   });
          // }
          //1完成2待支付
          // this.$router.push(`/payError?orderNun=${res.data}`);

          // let status = 2;
          // if (status == 2) {

          // } else {
          //   this.$router.push(`/paymenting?status=${1}`);
          // }
          // resolve(res.data);
        }
      });
    },
    //基础配送费用距离
    getTypeLength() {
      detailType({ type: 1, types: 2 }).then((res) => {
        if (res.code == 1000 && res.data.length != 0) {
          this.sendKm = res.data[0].sendKm;
          this.includeKm = res.data[0].includeKm;
          this.priceKm = res.data[0].priceKm;
        }
      });
    },
    getTypeWeight() {
      detailType({ type: 2, types: 2 }).then((res) => {
        if (res.code == 1000 && res.data.length != 0) {
          this.includeKg = res.data[0].includeKg;
          this.priceKg = res.data[0].priceKg;
          this.sendKg = res.data[0].sendKg;
        }
      });
    },
    //特殊时段费用
    getTypeTime() {
      detailType({ type: 3, types: 2 }).then((res) => {
        if (res.code == 1000 && res.data.length != 0) {
          let timeList = res.data; //特殊时段
          console.log(timeList);
          timeList.forEach((item) => {
            if (timeRrange(item.startTime, item.endTime)) {
              this.teshuMoney = item.addPrice;
            }
            return;
          });
        }
      });
    },
    //溢价费用
    getTypePremium() {
      detailType({ type: 4, types: 2 }).then((res) => {
        if (res.code == 1000 && res.data.length != 0) {
          this.premium = res.data[0].premium;
        }
      });
    },
  },
  activated() {
    this.from.goods = this.$route.query.goods;
    this.getTypeTime();
    this.getTypeLength();
    this.getTypePremium();
    this.getTypeWeight();
    if (this.$route.query.info) {
      this.status = JSON.parse(this.$route.query.info);
      let info = this.status;
      this.from.shipAddress = info.cityName + info.street + info.door;
      this.from.shipName = info.username || info.userName;
      this.from.shipPhone = info.phone;
      console.log(this.from);
    }
  },
  mounted() {
    console.log(this.$refs.goods);
  },
};
</script>
<style lang="scss" scoped>
.box {
  position: relative;
  background-color: rgba(248, 248, 248, 1);
  .addressBox {
    position: absolute;
    top: 70px;
    left: 16px;
    border-radius: 10px;
  }
}
</style>
