<template>
  <div class="orderStatusBox">
    <div class="status">
      {{
        {
          4: "订单已取消",
          3: "订单已取消",
          2: "待支付",
          7: "待接单",
          8: "取件中",
          5: "配送中",
          1: "订单完成",
        }[status]
      }}
    </div>
    <div class="tips">
      {{
        {
          3: "订单已取消，欢迎再次使用",
          4: "订单已取消，欢迎再次使用",
          2: "系统将在30分钟后自动取消，请尽快支付",
          7: "系统正在为您匹配接单人员请耐心等待",
          8: "配送人员正在前往取件，请耐心等待",
          5: "配送人员正在火速配送，下方为您的收件码",
          1: "本次服务已完成,欢迎再次使用",
        }[status]
      }}
    </div>
    <div class="btns">
      <div
        v-if="
          status == 4 ||
          status == 2 ||
          status == 7 ||
          status == 1 ||
          status == 3
        "
      >
        <div @click="cancel(status)">
          {{
            {
              4: "删除订单",
              2: "取消订单",
              7: "取消订单",
              3: "取消订单",
              1: "删除订单",
            }[status]
          }}
        </div>
      </div>
      <div
        v-if="
          status == 4 ||
          status == 2 ||
          status == 8 ||
          status == 5 ||
          status == 1 ||
          status == 3
        "
      >
        <div @click="orderType(status)" class="goOn">
          {{
            {
              4: "再来一单",
              3: "再来一单",
              2: "立即支付",
              8: "催单",
              5: "确认完成",
              1: "再来一单",
            }[status]
          }}
        </div>
      </div>
    </div>
    <!-- 取件码 -->
    <div class="code">
      <div>
        <div>取件码：</div>
        <div class="num">{{ qjNum }}</div>
      </div>
      <img
        src="../../../assets/icon/orderStatus/num.png"
        v-clipboard:copy="qjNum"
        v-clipboard:success="copy"
        alt
      />
    </div>
  </div>
</template>
<script>
import { notPay, orderRush, orderdelete, newAliPay } from "@/api/home"; //待支付/催单/删除
import { deleteOrder, calcelOrder, rushOrder } from "@/assets/js/orderStatus"; //已支付删除取消催单
import { zhifuCancel, aliPay, paypalPay, xinyongCard } from "@/assets/js/pay"; //已支付取消

export default {
  props: ["status", "qjNum", "payType"],
  data() {
    return {};
  },
  methods: {
    copy: function (e) {
      this.$toast("复制成功");
    },
    // 第一个按钮
    cancel(status) {
      let orderId = this.$route.query.orderNum;
      if (status == 2 || status == 7) {
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
                  this.$emit("cancelOrder");
                }
              });
              //已支付
            } else if (status == 7) {
              zhifuCancel(orderId).then((res) => {
                if (res.code == 1000) {
                  this.$toast.success("已取消订单,支付金额将原路返回到账户.");
                  this.$emit("cancelOrder");
                }
              });
            }
          })
          .catch(() => {
            // on cancel
          });
      } else if (status == 4 || status == 1 || status == 3) {
        this.$dialog
          .confirm({
            title: "提示",
            message: "您确定要删除该订单吗?",
          })
          .then(() => {
            deleteOrder(orderId).then((res) => {
              if (res.code == 1000) {
                this.$toast.success("已删除");
                this.$router.go(-1);
              }
            });
          })
          .catch(() => {
            // on cancel
          });
      }
    },
    // 第二个按钮
    orderType(status) {
      let orderId = this.$route.query.orderNum;
      let type = this.payType;
      let shan = sessionStorage.getItem("status");
      if (status == 8) {
        rushOrder(orderId).then((res) => {
          if (res.code == 1000) {
            this.$toast.success("催单成功");
          }
        });
      } else if (status == 4 || status == 1 || status == 3) {
        if (shan == 0) {
          this.$router.push(`/confirmOrder`);
        }
      } else if (status == 2) {
        this.$router.push({
          path: "/payStatus",
          query: {
            orderNo: orderId,
          },
        });
        // //支付宝支付
        // if (type == 3) {
        //   let _this=this
        //   aliPay(orderId,_this);
        // } else if (type == 1) {
        //   paypalPay(orderId);
        // } else if (type == 2) {
        //   xinyongCard(orderId);
        // }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.orderStatusBox {
  box-sizing: border-box;
  width: 343px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.06);
  padding: 0 16px;
  .status {
    font-size: 20px;
    padding-top: 20px;
    padding-bottom: 5px;
    font-weight: 550;
  }
  .tips {
    font-size: 12px;
    padding-bottom: 10px;
  }
  .btns {
    display: flex;
    font-size: 16px;
    padding-bottom: 15px;
    padding-top: 5px;

    > div {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 32px;
      width: 91.43px;
      border: 1px solid rgba(226, 226, 226, 1);
      margin-right: 10px;
      .goOn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background-color: rgba(244, 202, 68, 1);
      }
    }
  }
  .code {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    // padding: 13px 0;
    padding-bottom: 13px;
    width: 100%;
    > div:nth-child(1) {
      display: flex;
      align-items: center;
    }
    img {
      width: 24px;
      height: 24px;
    }
    .num {
      font-size: 26px;
    }
  }
}
</style>
