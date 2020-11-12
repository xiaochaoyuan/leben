<template>
  <div class="orderDetailBox">
    <div class="title">订单详情</div>
    <div>
      <div class="titleType">订单编号</div>
      <div class="num">
        <span id="orderNum">{{ detailInfo.orderNum }}</span>
        <img
          src="@/assets/icon/orderStatus/orderNum.png"
          v-clipboard:copy="detailInfo.orderNum"
          v-clipboard:success="copy" 
          alt
        />
      </div>
    </div>
    <div>
      <div class="titleType">取件时间</div>
      <div class="num">{{ detailInfo.pickupTime }}</div>
    </div>
    <div>
      <div class="titleType">参考价格</div>
      <div class="num yellowColor">{{ detailInfo.forecastPrice }}</div>
    </div>
    <div>
      <div class="titleType">备注信息</div>
      <div class="num">{{ detailInfo.remark||'无' }}</div>
    </div>
    <div>
      <div class="titleType">支付方式</div>
      <div class="num">
        {{
          detailInfo.payType == 1
            ? "PayPal"
            : detailInfo.payType == 2
            ? "信用卡"
            : "支付宝"
        }}
      </div>
    </div>
    <div>
      <div class="titleType">支付金额</div>
      <div class="num">
        {{ detailInfo.payPrice }}
        <span class="yellowColor" @click="show = true">明细</span>
      </div>
    </div>
    <!-- 弹出层 -->
    <div>
      <van-popup
        v-model="show"
        closeable
        position="bottom"
        round
        :style="{ height: '62%' }"
      >
        <div>
          <div class="priceInfo">价格明细</div>
          <div class="detailInfo">
            <div>
              <div>里程费（{{ detailInfo.mileage || 0 }}公里)</div>
              <div>{{ orderCost.addCost || 0 }}</div>
            </div>
            <div>
              <div>溢价费</div>
              <div>{{ orderCost.premium || 0 }}</div>
            </div>
            <div>
              <div>重量费</div>
              <div>{{ orderCost.weightCost || 0 }}</div>
            </div>
            <div>
              <div>优惠券</div>
              <div>{{ orderCost.sale || 0 }}</div>
            </div>
            <div>
              <div>小费</div>
              <div>{{ orderCost.tip || 0 }}</div>
            </div>
            <div>
              <div>特殊时段费用</div>
              <div>{{ orderCost.specialCost || 0 }}</div>
            </div>
            <div>
              <div>支付金额</div>
              <div style="color: rgba(248, 73, 70, 1)">
                {{ orderCost.payPrice || 0 }}
              </div>
            </div>
          </div>
          <!-- 计价说明 -->
          <div class="description" @click="goMoneyDetail">
            <div>计价说明</div>
          </div>
        </div>
      </van-popup>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    detailInfo: {
      define: Object,
    },
    orderCost: {
      define: Object,
    },
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    copy: function (e) {
      this.$toast("复制成功");
    },
    goMoneyDetail() {
      this.$router.push("/quickDeliveryFee");
    },
  },
  activated() {
    this.show = false;
  },
};
</script>

<style lang="scss" scoped>
.orderDetailBox {
  margin: 0 16px 18px;
  padding: 0 16px;
  background-color: #fff;
  height: 343px;
  margin-top: 10px;
  border-radius: 10px;
  > div {
    display: flex;
    justify-content: space-between;
    height: 44px;
    .titleType {
      color: rgba(119, 119, 119, 1);
      width: 90px;
    }
    .num {
      color: rgba(62, 58, 57, 1);
      img {
        vertical-align: middle;
        padding-left: 5px;
        margin-bottom: 3px;
      }
    }
  }
  .title {
    font-size: 16px;
    padding: 25px 0 0px 0;
    font-weight: 550;
  }
  .yellowColor {
    color: rgba(255, 149, 3, 1) !important;
    padding-left: 10px;
  }
  // 弹出层
  /deep/.van-icon-cross::before {
    margin-top: 8px;
  }

  .priceInfo {
    font-size: 16px;
    height: 60px;
    line-height: 60px;
    width: 100%;
    padding: 0 16px;
    border-bottom: 1px solid #eee;
  }
  .detailInfo {
    padding: 0 66px;
    padding-top: 25px;
    > div {
      display: flex;
      justify-content: space-between;
      height: 37px;
      line-height: 37px;
    }
  }
  .description {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    margin-top: 5px;
    width: 81px;
    height: 30px;
    border: 1px solid rgba(204, 204, 204, 1);
    color: rgba(170, 170, 170, 1);
  }
}
</style>