<template>
  <div class="orderBox">
    <OrderDetailHeader></OrderDetailHeader>
    <div class="status">
      <OrderStatus
        :status="status"
        :awbNum="awbNum"
        :orderNum="orderNum"
        @cancelOrder="cancelOrder"
        :type="type"
      ></OrderStatus>
    </div>
    <div>
      <OrderInfo
        :status="status"
        :imgList="imgList"
        :giveUser="giveUser"
      ></OrderInfo>
    </div>
    <AddressInfo :address="address"  :status="status"></AddressInfo>
    <GoodsInfo :goodsInfo="goodsInfo"></GoodsInfo>
    <OrderDetail :detailInfo="detailInfo" :orderCost="orderCost"></OrderDetail>
  </div>
</template>

<script>
import OrderDetailHeader from "./components/orderDetailHeader";
import OrderStatus from "./components/orderStatus";
import OrderInfo from "./components/orderInfo";
import AddressInfo from "./components/addressInfo";
import GoodsInfo from "./components/goodsInfo";
import OrderDetail from "./components/orderDetail";
import { orderInfoDetail, orderCostDetail } from "@/api/home"; //获取订单的详情和明细/取消待支付订单
export default {
  components: {
    OrderDetailHeader,
    OrderStatus,
    OrderInfo,
    AddressInfo,
    GoodsInfo,
    OrderDetail,
  },
  data() {
    return {
      type:'',//支付类型
      orderNum: "",
      awbNum: "", //配送员取件码
      status: "",
      imgList: [], //图片的集合
      orderCost: {},
      detailInfo: {
        orderNum: "",
        pickupTime: "", //取件时间
        goods: "", //物品信息
        weight: "", //重量
        remark: "", //备注
        payType: "", //支付方式
        payPrice: "", //支付金额
        mileage: "",
        forecastPrice: "", //预估价格
      },
      goodsInfo: "", //物品信息
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
        addPrice: "", //实际价格
        name: "", //配送员名字
        phone: "", //配送员电话
        courierId: "", //配送员id
        headImg: "", //配送员头像
      },
    };
  },
  methods: {
    //刷新
    cancelOrder() {
      this.getOrderInfoDetail();
    },
    //明显
    getOrderCostDetail() {
      let orderId = this.orderNum;
      let data = new FormData();
      data.append("orderId", orderId);
      orderCostDetail(data).then((res) => {
        if (res.code == 1000) {
          this.orderCost = res.data;
        }
      });
    },
    getOrderInfoDetail() {
      let orderId = this.orderNum;

      orderInfoDetail(orderId).then((res) => {
        if (res.code == 1000) {
          this.$toast.clear();
          this.awbNum = res.data.awbNum;
          this.type=res.data.payType
          this.status = res.data.orderStatus.toString();
          if (res.data.image.length>0) {
            console.log("进来了");
             this.imgList=[]
            let imgs =res.data.image;
            console.log(imgs,'imgs');
            console.log(res.data.image);
            imgs.forEach((item, index) => {
              let a = {
                url: "",
              };
              a.url = this.$imgUrl + item;
              this.imgList.push(a);
              console.log( this.imgList,' this.imgList');
            });
          }
          this.goodsInfo = res.data.goods;
          Object.keys(this.detailInfo).forEach((keys) => {
            this.detailInfo[keys] = res.data[keys];
          });
          Object.keys(this.address).forEach((keys) => {
            this.address[keys] = res.data[keys];
          });
          Object.keys(this.giveUser).forEach((keys) => {
            this.giveUser[keys] = res.data[keys];
          });
          console.log(this.giveUser,'this.giveUser');
        }
      });
    },
  },
  activated() {
    this.orderNum = this.$route.query.orderNum;
    this.$toast.loading({
      message: "加载中...",
      forbidClick: true,
      duration: 0,
    });
    this.getOrderCostDetail();
    this.getOrderInfoDetail();
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
