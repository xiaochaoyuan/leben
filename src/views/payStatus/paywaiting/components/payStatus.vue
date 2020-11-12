<template>
  <div class="payStatus">
    <div class="suceess">
      <img src="@/assets/icon/orderStatus/await.png" alt />
      <div class="payText">等待支付</div>
      <!-- <div class="tips">
        您此单获得11乐币，评价后还可以额外获得
        <span>20</span>乐币
      </div> -->
      <div class="btns">
        <div class="goHome" @click="goHome()">
          <span>返回首页</span>
        </div>
        <div class="detail" @click="lookDetail">订单详情</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      status: "",
    };
  },
  methods: {
    goHome() {
      if (this.status == 0) {
        this.$router.push(`/quick`);
      } else {
        this.$router.push(`/home`);
      }
    },
    lookDetail() {
      let orderNum =this.$route.query.orderId
      if (this.status == 0) {
        this.$router.push({
          path:`/quickOrderDetail`,
          query:{
            orderNum:orderNum
          }
        });
      } else {
        this.$router.push({
          path: "/orderDetail",
          query: {
             orderNum:orderNum
          },
        });
      }
    },
  },
  activated() {
    this.status = sessionStorage.getItem("status");
  },
};
</script>

<style lang="scss" scoped>
.payStatus {
  height: 271px;
  background-color: #fff;
  .suceess {
    padding-top: 43px;
    text-align: center;
    img {
      width: 61px;
      height: 61px;
    }
    .payText {
      margin-top: 14px;
      font-size: 18px;
      font-weight: 550;
    }
    .tips {
      margin-top: 13px;
      span {
        color: rgba(255, 149, 3, 1);
      }
    }
    .btns {
      display: flex;
      justify-content: space-between;
      margin: 0 47px;
      margin-top: 18px;
      div {
        width: 133px;
        height: 45px;
        line-height: 45px;
        border-radius: 27.5px;
        span {
          color: rgba(51, 51, 51, 1);
        }
      }
      .goHome {
        background-color: rgba(244, 202, 68, 1);
      }
      .detail {
        border: 1px solid rgba(119, 119, 119, 1);
      }
    }
  }
}
</style>