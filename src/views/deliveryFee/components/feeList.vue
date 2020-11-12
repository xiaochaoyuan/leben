<template>
  <div class="feeBox">
    <!--  -->
    <div class="priceBox flex-bet">
      <div class="title">
        基础配送费用
        <span style="font-size:14px" class="colorText">包含{{includeKm||0}}公里</span>
      </div>
      <div class="price">
        <span>+€</span>
        {{sendKm||0}}
      </div>
    </div>
    <!--  -->
    <div class="priceInfo">
      <div class="title">距离附加费</div>
      <div class="flex-bet">
        <div class="colorText">每增加1公里增加费用</div>
        <div class="payName">
          每公里
          <span>+€</span>
          <span>{{priceKm||0}}</span>
        </div>
      </div>
    </div>
    <!--  -->
    <div class="priceBox flex-bet">
      <div class="title">
        基础重量费用
        <span style="font-size:14px" class="colorText">包含{{includeKg||0}}公里</span>
      </div>
      <div class="price">
        <span>+€</span>
        {{sendKg||0}}
      </div>
    </div>
    <!--  -->
    <div class="priceInfo">
      <div class="title">重量附加费</div>
      <div class="flex-bet">
        <div class="colorText">每增加1公里增加费用</div>
        <div class="payName">
          每公里
          <span>+€</span>
          <span>{{priceKg||0}}</span>
        </div>
      </div>
    </div>
    <!--  -->
    <div class="priceInfo">
      <div class="title">特殊时段费</div>
      <div class="flex-bet" v-for="(item,index) in timeList" :key="index">
        <div class="colorText">{{item.startTime}}-{{item.endTime}}</div>
        <div class="payName">
          <span>+€</span>
          <span>{{item.addPrice||0}}</span>
        </div>
      </div>
    </div>
    <!--  -->
    <div class="flex-bet">
      <div class="title">溢价费用</div>
      <div class="price">
        <span>+€</span>
        {{premium||0}}
      </div>
    </div>
    <div class="priceInfo">
      <div class="title">溢价说明</div>
      <div class="colorText">
        <div>在恶劣天气，下单高峰期等情况下，为促进骑手接单，</div>
        <div>平台可能会临时适当调整价格，以保障良好的服务体验。</div>
      </div>
    </div>
  </div>
</template>

<script>
import { detailType } from "@/api/home";
export default {
  data() {
    return {
      type: "", //1.距离附加费设置2.重量附加费3.特殊时段费用4.溢价费用5.配送明细6.搬家收费配置7.乐币获取费8.哈喽手续费9评论
      types: "", //费用类型：1.闪送 2.帮买
      timeList: [],
      sendKm: "", //基础费用
      includeKm: "", //基础费用包含公里数
      priceKm: "", //没增加一公里的费用
      premium: "", //溢价费用
      includeKg: "", //包含公斤数
      priceKg: "", //每一公斤增加费用
      sendKg: "", //重量基础费用
    };
  },
  methods: {
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
          this.timeList = res.data;
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
  mounted() {
    this.getTypeTime();
    this.getTypeLength();
    this.getTypePremium();
    this.getTypeWeight();
  },
};
</script>

<style lang="scss" scoped>
.feeBox {
  padding: 0 16px;
}
.title {
  font-size: 18px;
}
.price {
  font-size: 18px;
  span {
    font-size: 12px;
  }
}
.payName {
  span:nth-child(1) {
    font-size: 12px;
  }
  span:nth-child(2) {
    font-size: 18px;
  }
}
.priceBox {
  margin: 28px 0 16px 0;
  display: flex;
  align-items: center;
}
.priceInfo {
  margin: 15px 0;
  div:nth-child(1) {
    margin-bottom: 7px;
  }
}
</style>