<template>
  <div class="confirmbox">
    <navHeader :title="title"></navHeader>
    <mapGoole style="width: 100%; height: 350px" class="mapStyle"></mapGoole>

    <div class="funBox">
      <addressInfo
        :goInfo="goInfo"
        :fromInfo="fromInfo"
        @changepickupAddress="changepickupAddress"
        @shipAddressAddress="shipAddressAddress"
      ></addressInfo>
      <goodsInfo
        :goodsType="goodsType"
        @chioseGoods="chioseGoods"
        @choiseWeight="choiseWeight"
      ></goodsInfo>
      <payInfo
        @goPay="goPay"
        @addPrice="addPrice"
        @chioseTime="chioseTime"
      ></payInfo>
      <reMarks></reMarks>
      <payMent @subMoney="subMoney" :totalMoney="totalMoney"></payMent>
    </div>
  </div>
</template>
<script>
import navHeader from "./components/header";
import addressInfo from "./components/addressInfo";
import goodsInfo from "./components/goodsInfo";
import payInfo from "./components/payInfo";
import reMarks from "./components/remarks";
import payMent from "./components/payment";
import mapGoole from "@/components/mapGoole";
import { getDate, timeRrange, getDistance } from "@/assets/js/up.js";
import {
  buyOrder,
  systemTypeList,
  newAliPay,
  detailType,
  appByStripePay,
} from "@/api/home"; //确定下单的按钮

export default {
  components: {
    navHeader,
    addressInfo,
    payInfo,
    goodsInfo,
    reMarks,
    payMent,
    mapGoole,
  },
  provide: {
    data: "好的",
  },
  data() {
    return {
      addressStatus: null, //地址监听
      title: "确认订单",
      totalMoney: 0, //总金额
      goInfo: {},
      fromInfo: {},
      goodsType: [], //物品类型
      from: {
        payType: "", //支付方式1.PayPal 2. 信用卡 3.支付宝4.钱包
        tip: 0, //小费的金额
        type: 4, //订单类型1.外卖2.超市3.帮买4.闪送5.搬家6.用车
        goods: "", //帮买的商品名称
        pickupAddress: "", //(帮买)取件地址
        pickupName: "", //帮买)取货人名称
        pickupPhone: "", //取货人电话
        pickupTime: "", //取件时间
        remark: "", //备注
        mileage: 0, //公里数
        weight: 0, //重量
        couponsId: "", //优惠券id
        goodsId: null, //商品的id
      },
      sendKm: null, //基础费用
      includeKm: null, //基础费用包含公里数
      priceKm: null, //没增加一公里的费用
      premium: null, //溢价费用
      includeKg: null, //包含公斤数
      priceKg: null, //每一公斤增加费用
      sendKg: null, //重量基础费用
      teshuMoney: 0, //特殊时段费用
      //-----------经纬度
      pickupLat: null,
      pickuplng: null,
      shipLat: null,
      shiplng: null,
      choiseid: 0,
      goodsWeight: 0,
    };
  },
  //计算价格
  watch: {
    addressStatus: {
      handler(newName, oldName) {
        console.log(this.pickuplng, this.shiplng, "this.shiplng");
        if (this.pickuplng != null && this.shiplng != null) {
          if (this.from.mileage - this.includeKm >= 0) {
            sendFj = (this.from.mileage - this.includeKm) * this.priceKm; //距离附加费
          }
        }
        this.from.mileage = getDistance(
          this.pickuplng,
          this.pickupLat,
          this.shiplng,
          this.shipLat
        ); //计算距离
        console.log(this.from.mileage, " this.from.mileage");
        let send = this.sendKm; //基础费用includeKm
        let sendFj = null;
        let sendKg = this.sendKg;
        let premium = this.premium; //溢价费
        let teshuMoney = this.teshuMoney; //特殊时段费用
        console.log(send, sendFj, sendKg, premium, teshuMoney);
        this.totalMoney = (
          Number(send) +
          Number(sendFj) +
          Number(premium) +
          Number(teshuMoney)
        ).toFixed(2);

        console.log(this.totalMoney, " this.totalMoney");
      },
      immediate: true,
      deep: true,
    },
  },

  methods: {
    //监听是否填写了地址
    changepickupAddress(val, pickupLat, pickuplng) {
      this.pickupLat = pickupLat;
      this.pickuplng = pickuplng;
      this.addressStatus += val;
    },
    shipAddressAddress(val, shipLat, shiplng) {
      console.log("填写了2");
      this.shipLat = shipLat;
      this.shiplng = shiplng;
      this.addressStatus += val;
    },
    //获取type类型
    getSystemType() {
      systemTypeList({
        type: 1,
      }).then((res) => {
        if (res.code == 1000) {
          this.goodsType = res.data;
        }
      });
    },
    //支付时间
    chioseTime(val) {
      this.from.pickupTime = val;
      console.log(this.from.pickupTime, " this.from.pickupTime");
    },
    //物品信息商品价格price单价weight重量
    chioseGoods(val, id, price, weight) {
      this.from.goods = val;
      this.from.goodsId = id;
      this.from.weight = weight;
      let sendKg = this.sendKg; //重量基础费用
      let sendfj = null;
      let pre = price; //商品费用
      if (weight - this.includeKg >= 0) {
        sendfj = (weight - this.includeKg) * this.priceKg;
      }
      if (this.choiseid == id && this.goodsWeight == weight) {
        this.totalMoney = (Number(sendKg) + Number(pre)).toFixed(2);
      } else {
        this.totalMoney = (
          Number(sendKg) +
          Number(pre) +
          Number(sendfj)
        ).toFixed(2);
      }
    },
    //选择重量
    choiseWeight(val) {
      this.from.weight = val;
    },
    //确定支付按钮
    subMoney() {
      console.log("确定是否");
      let subData = this.from;
      subData.pickupTime = getDate(Date.parse(new Date()));
      subData.remark = this.$store.state.quickRemake;
      let goadd = this.$store.state.quickgoAds;
      let fromadd = this.$store.state.quickFromAds;
      console.log(goadd);
      subData.pickupAddress = goadd.pickupAddress;
      subData.pickupName = goadd.pickupName;
      subData.pickupPhone = goadd.pickupPhone;
      subData.shipAddress = fromadd.shipAddress;
      subData.shipName = fromadd.shipName;
      subData.shipPhone = fromadd.shipPhone;
      if (
        this.from.shipAddress == "" ||
        this.from.shipName == "" ||
        this.from.shipPhone == "" ||
        this.from.pickupName == "" ||
        this.from.pickupPhone == "" ||
        this.from.pickupAddress == ""
      ) {
        this.$toast("请填写配送信息");
        return;
      } else if (this.from.goods == "") {
        this.$toast("请填写帮买商品");
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
        }
      });
    },
    //支付方式
    goPay(type) {
      console.log(type);
      this.from.payType = type;
    },
    //小费
    addPrice(num) {
      console.log(num, "小费");
      this.from.tip = num;
      this.totalMoney = (Number(num) + Number(this.totalMoney)).toFixed(2);
    },
    //基础配送费用距离
    getTypeLength() {
      detailType({ type: 1, types: 1 }).then((res) => {
        if (res.code == 1000 && res.data.length != 0) {
          this.sendKm = res.data[0].sendKm;
          this.includeKm = res.data[0].includeKm;
          this.priceKm = res.data[0].priceKm;
        }
      });
    },
    getTypeWeight() {
      detailType({ type: 2, types: 1 }).then((res) => {
        if (res.code == 1000 && res.data.length != 0) {
          this.includeKg = res.data[0].includeKg;
          this.priceKg = res.data[0].priceKg;
          this.sendKg = res.data[0].sendKg;
        }
      });
    },
    //特殊时段费用
    getTypeTime() {
      detailType({ type: 3, types: 1 }).then((res) => {
        if (res.code == 1000 && res.data.length != 0) {
          let timeList = res.data; //特殊时段
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
      detailType({ type: 4, types: 1 }).then((res) => {
        if (res.code == 1000 && res.data.length != 0) {
          this.premium = res.data[0].premium;
        }
      });
    },
  },
  //   pickupAddress (帮买)取件地址
  // pickupName (帮买)取货人名称
  // pickupPhone (帮买)取货人电话
  // pickupTime (帮买)取件时间
  // shipAddress 帮买)收件地址
  // shipName (帮买)收件人姓名
  // shipPhone (帮买)收件人电话
  activated() {
    let goInfo = this.$route.query.goInfo;
    let fromInfo = this.$route.query.fromInfo;
    let couponsId = this.$route.query.id;
    if (couponsId) {
      this.from.couponsId = couponsId;
    }
    if (goInfo) {
      this.goInfo = JSON.parse(this.$route.query.goInfo);
      this.from.pickupAddress = this.goInfo.delivery;
      this.from.pickupName = this.goInfo.name;
      this.from.pickupPhone = this.goInfo.phone;
      console.log(this.goInfo, " this.goInfo");
    }
    if (fromInfo) {
      this.from.shipAddress = this.fromInfo.delivery;
      this.from.shipName = this.fromInfo.name;
      this.from.shipPhone = this.fromInfo.phone;
      this.fromInfo = JSON.parse(this.$route.query.fromInfo);
      console.log(this.fromInfo, " this.fromInfo");
    }
  },
  mounted() {
    this.getSystemType();
    this.getTypeTime();
    this.getTypeLength();
    this.getTypePremium();
    this.getTypeWeight();
  },
};
</script>

<style lang="scss" scoped>
.confirmbox {
  position: relative;
  min-height: 130vh;

  .funBox {
    position: absolute;
    left: 0;
    bottom: 0;
  }
}
</style>