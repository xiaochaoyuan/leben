<template>
  <div class="orderBox">
    <orderDetailHeader></orderDetailHeader>
    <div class="status">
      <orderStatus
        :status="status"
        @cancelOrder="cancelOrder"
        :qjNum="qjNum"
        :payType="payType"
      ></orderStatus>
    </div>
    <orderInfo :status="status"  :giveUser="giveUser"></orderInfo>
    <addressInfo :address="address" :status="status"></addressInfo>
    <orderDetail :detailInfo="detailInfo" :orderCost="orderCost"></orderDetail>
  </div>
</template>

<script>
import orderDetailHeader from "./components/orderDetailHeader";
import orderStatus from "./components/orderStatus";
import orderInfo from "./components/orderInfo";
import addressInfo from "./components/addressInfo";
import { orderInfoDetail, orderCostDetail } from "@/api/home"; //获取订单的详情和明细/取消待支付订单
import orderDetail from "./components/orderDetail";
export default {
  components: {
    orderDetailHeader,
    orderStatus,
    orderInfo,
    addressInfo,
    orderDetail,
  },
  data() {
    return {
      status: "",
      payType: "", //支付方式
      awbNum: "", //验证码
      // 明细
      orderCost: {},
      //取件码
      qjNum: "",
      //订单详情
      detailInfo: {
        orderNum: "",
        pickupTime: "", //取件时间
        goods: "", //物品信息
        weight: "", //重量
        remark: "", //备注
        payType: "", //支付方式
        payPrice: "", //支付金额
        mileage: "",
      },
      address: {
        pickupAddress: "",
        pickupName: "",
        pickupPhone: "",
        shipAddress: "",
        shipName: "",
        shipPhone: "",
      },
      //  配送人员信息
      giveUser: {
        name: "", //配送员名字
        phone: "", //配送员电话
        courierId: "", //配送员id
        headImg: "", //配送员头像
      },
    };
  },
  methods: {
    //改变了订单的状态
    cancelOrder() {
      this.getOrderInfoDetail();
    },
    //获取明细的详情
    getOrderCostDetail() {
      let orderId = this.$route.query.orderNum;
      let data = new FormData();
      data.append("orderId", orderId);
      orderCostDetail(data).then((res) => {
        if (res.code == 1000) {
          this.orderCost = res.data;
        }
      });
    },
    //获取订单详情
    getOrderInfoDetail() {
      let orderId = this.$route.query.orderNum;
      orderInfoDetail(orderId).then((res) => {
        if (res.code == 1000) {
          this.status = res.data.orderStatus;
          this.qjNum = res.data.awbNum;
          this.payType = res.data.payType;
          console.log(this.qjNum, "this.awbNum");
          Object.keys(this.detailInfo).forEach((keys) => {
            this.detailInfo[keys] = res.data[keys];
          });
          Object.keys(this.address).forEach((keys) => {
            this.address[keys] = res.data[keys];
          });
          Object.keys(this.giveUser).forEach((keys) => {
            this.giveUser[keys] = res.data[keys];
          });
        }
      });
    },
  },
  activated() {
    // this.status = this.$route.query.status;
    this.getOrderInfoDetail();
    this.getOrderCostDetail();
    console.log(this.status);
  },
};
</script>

<style lang="scss" scoped>
.orderBox {
  position: relative;
  .status {
    position: absolute;
    top: 70px;
    left: 16px;
    border-radius: 10px;
  }
}
</style>
