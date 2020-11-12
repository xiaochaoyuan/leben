<template>
  <div class="orderStatusBox">
    <div class="status">{{ orderStatus }}</div>
    <div class="tips">{{ orderTips }}</div>
    <div class="btns">
      <div v-if="status == 4 || status == 2 || status == 1 || status == 7|| status == 3">
        <div @click="cancel(status)">{{ btnsStatusOne }}</div>
      </div>
      <div
        v-if="
          status == 0 ||
          status == 2 ||
          status == 8 ||
          status == 5 ||
          status == 1 ||
          status == 4||
          status == 3
        "
      >
        <div @click="orderType(status, orderNum, type)" class="goOn">
          {{ btnsStatusTwo }}
        </div>
      </div>
    </div>
    <!-- 取件码 -->
    <div class="code">
      <div>
        <div>取件码：</div>
        <div class="num">{{ awbNum }}</div>
      </div>
      <img
        src="@/assets/icon/orderStatus/num.png"
        v-clipboard:copy="awbNum"
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
  props: ["status", "awbNum", "orderNum", "type"],
  data() {
    return {};
  },
  methods: {
    copy: function (e) {
      this.$toast("复制成功");
    },
    orderType(status, orderNum, type) {
      let bang = sessionStorage.getItem("status");
      if (status == 2) {
        this.$router.push({
          path: "/payStatus",
          query: {
            orderNo: orderNum,
          },
        });
      }
      if (status == 4 || status == 1 || status == 7|| status == 3) {
        if (bang == 1) {
          this.$router.push("/downOrder");
        }
      } else if (status == 8 || status == 5) {
        let data = new FormData();
        let orderId = this.$route.query.orderNum;
        data.append("orderNum", orderId);
        orderRush(data).then((res) => {
          if (res.code == 1000) {
            this.$toast.success("催单成功");
          }
        });
      }
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
  },
  computed: {
    btnsStatusTwo() {
      switch (this.status) {
        case "4":
          return "再来一单";
          break;
        case "3":
          return "再来一单";
          break;
        case "2":
          return "立即支付";
          break;
        case "8":
          return "催单";
          break;
        case "5":
          return "催单";
          break;
        case "1":
          return "再来一单";
          break;
      }
    },
    btnsStatusOne() {
      switch (this.status) {
        case "4":
          return "删除订单";
          break;
        case "3":
          return "删除订单";
          break;
        case "2":
          return "取消订单";
          break;
        case "1":
          return "删除订单";
          break;
        case "7":
          return "取消订单";
          break;
      }
    },
    orderTips() {
      switch (this.status) {
        case "4":
          return "订单已取消，欢迎再次使用";
          break;
        case "3":
          return "订单已取消，欢迎再次使用";
          break;
        case "2":
          return "系统将在30分钟后自动取消，请尽快支付";
          break;
        case "7":
          return "系统正在为您匹配接单人员请耐心等待";
          break;
        case "8":
          return "配送人员正在购买商品，请耐心等待";
          break;
        case "5":
          return "配送人员正在购买商品，请耐心等待";
          break;
        case "1":
          return "配送人员正在购买商品，请耐心等待";
          break;
      }
    },
    orderStatus() {
      switch (this.status) {
        case "4":
          return "订单已取消";
          break;
        case "3":
          return "订单已取消";
          break;
        case "2":
          return "待支付";
          break;
        case "7":
          return "待接单";
          break;
        case "8":
          return "接单成功";
          break;
        case "5":
          return "配送中";
          break;
        case "1":
          return "订单完成";
          break;
      }
    },
  },
  mounted() {},
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
        // background-color: red;
      }
    }
  }
  .code {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    padding-bottom: 15px;
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
