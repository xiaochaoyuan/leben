<template>
  <div class="box">
    <div class="listBox" v-for="(item, index) in dataList" :key="index">
      <div @click="lookDetail(item.orderNum)">
        <div class="list">
          <div>
            <span>帮买</span>
            <span style="color: rgba(161, 161, 161, 1); margin-left: 15px">{{
              item.orderTime
            }}</span>
          </div>
          <div>
            {{
              {
                4: "已取消",
                2: "待支付",
                7: "待接单",
                8: "接单成功",
                5: "配送中",
                1: "已完成",
                 3: "已取消",
              }[item.orderStatus]
            }}
          </div>
        </div>
        <div class="address">
          <div>
            <div class="icon"></div>
            <div style="width: 285px" class="ellipsis">
              {{ item.pickupAddress }}
            </div>
          </div>
          <div>
            <div class="icon yellowColor"></div>
            <div>
              <div style="width: 285px" class="ellipsis">
                {{ item.shipAddress }}
                <div class="telInfo ellipsis" style="width: 285px">
                  <span>{{ item.shipName }}</span>
                  {{ item.shipPhone }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="btns">
        <div
          v-if="
            item.orderStatus == 7 ||
            item.orderStatus == 2 ||
            item.orderStatus == 1 ||
            item.orderStatus == 4|| item.orderStatus == 3
          "
        >
          <div @click="calcol(item.orderStatus, item.orderNum)">
            {{
              { 2: "取消订单", 7: "取消订单", 1: "删除订单", 4: "删除订单",  3: "删除订单", }[
                item.orderStatus
              ]
            }}
          </div>
        </div>
        <div
          @click="twofun(item.orderStatus, item.payType, item.orderNum)"
          v-if="
            item.orderStatus == 2 ||
            item.orderStatus == 8 ||
            item.orderStatus == 5 ||
            item.orderStatus == 4|| item.orderStatus == 3
          "
          class="btnsWhite"
        >
          <div class="goOn">
            {{
              { 2: "立即支付", 8: "催单", 5: "催单", 4: "再来一单",3: "再来一单" }[
                item.orderStatus
              ]
            }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { orderdelete, notPay, orderRush, newAliPay } from "@/api/home"; //删除订单/取消待支付
import { xinyongCard, zhifuCancel, aliPay, paypalPay } from "@/assets/js/pay";
import { deleteOrder, rushOrder } from "@/assets/js/orderStatus";

export default {
  props: {
    dataList: {
      define: Array,
    },
  },
  data() {
    return {};
  },
  methods: {
    lookDetail(orderNum) {
      this.$router.push({
        path: "/orderDetail",
        query: {
          orderNum,
        },
      });
    },
    //第二个订单1.PayPal 2. 信用卡 3.支付宝
    twofun(status, type, orderId) {
      let _this = this;
      //立即支付
      let bang = sessionStorage.getItem("status");
      if (status == 2) {
        this.$router.push({
          path: "/payStatus",
          query: {
            orderNo: orderId,
          },
        });
      } else if (status == 4||status == 3) {
        if (bang == 1) {
          this.$router.push("/downOrder");
        }
      } else if (status == 8 || status == 5) {
        rushOrder(orderId).then((res) => {
          if (res.code == 1000) {
            this.$toast.success("催单成功");
          }
        });
      }
    },
    //第一个按钮
    calcol(status, orderId) {
      if (status == 1 || status == 4|| status == 3) {
        this.$dialog
          .confirm({
            title: "提示",
            message: "您确定要删除该订单吗?",
          })
          .then(() => {
            deleteOrder(orderId).then((res) => {
              if (res.code == 1000) {
                this.$toast.success("已删除");
                this.$emit("refresh");
              }
            });
          })
          .catch(() => {
            // on cancel
          });
      } else if (status == 2 || status == 7) {
        this.$dialog
          .confirm({
            title: "提示",
            message: "您确定要取消该订单吗?",
          })
          .then(() => {
            //未支付的
            if (status == 2) {
              calcelOrder(orderId).then((res) => {
                if (res.code == 1000) {
                  this.$toast.success("已取消");
                  this.$emit("refresh");
                }
              });
              //已支付
            } else if (status == 7) {
              zhifuCancel(orderId).then((res) => {
                if (res.code == 1000) {
                  this.$toast.success("已取消订单,支付金额将原路返回到账户.");
                  this.$emit("refresh");
                }
              });
            }
          })
          .catch(() => {
            // on cancel
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.listBox {
  padding: 0 16px;
  background-color: #fff;
  height: 240px;
  border-radius: 10px;
  margin: 10px 16px 0px;
  .list {
    display: flex;
    justify-content: space-between;
    padding-top: 23px;
  }
  .address {
    background-color: #fff;
    font-size: 16px;
    border-radius: 10px;
    > div:nth-child(1) {
      display: flex;
      align-items: center;
      height: 80px;
      line-height: 80px;
    }
    > div:nth-child(2) {
      display: flex;
      padding-bottom: 20px;
      border-bottom: 1px solid #eee;
      .telInfo {
        font-size: 14px;
        color: rgba(170, 170, 170, 1);
        padding-top: 7px;
        > span {
          padding-right: 10px;
        }
      }
    }
    .icon {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: #000;
      margin-right: 14px;
    }
    .yellowColor {
      background-color: rgba(244, 202, 68, 1) !important;
      margin-top: 5px;
    }
  }
  .btns {
    display: flex;
    justify-content: flex-end;
    margin-top: 8px;
    font-size: 16px;
    > div {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 32px;
      width: 91.43px;
      border: 1px solid rgba(226, 226, 226, 1);
      margin-left: 10px;
    }
    .btnsWhite {
      background-color: rgba(244, 202, 68, 1);
    }
  }
}
</style>