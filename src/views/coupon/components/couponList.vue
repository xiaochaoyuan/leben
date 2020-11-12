<template>
  <div class="listBox">
    <div
      class="couponList"
      v-for="(item, index) in dataList"
      :key="index"
      @click="goPay(item)"
    >
      <div class="upbox">
        <div class="couponStyle">
          <div class="couponName">优惠券</div>
          <div class="dateStyle">{{ "有效期至" + item.couponsDate }}</div>
        </div>
        <div class="price" v-if="item.couponsType == 1">
          <span>€</span>
          <span>{{ item.jian }}</span>
        </div>
        <div class="zhekou" v-if="item.couponsType == 2">
          <span>{{ item.zheKou }}</span>
          <span>折</span>
        </div>
      </div>
      <div class="circle"></div>
      <div class="downBox">
        <div class="dateStyle">
          <span class="couTitle"> 闪送/帮买</span
          ><span v-if="item.couponsType == 1">满{{ item.man }}€可使用</span>
        </div>
        <van-button round color="rgba(23, 1, 6, 1)">去使用</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { systemCouponsManagerList } from "@/api/home";
export default {
  data() {
    return {
      dataList: [],
    };
  },
  methods: {
    //获取优惠劵 优惠卷类型 1.满减2.折扣 3免配送费 coupons_type
    getSystemCouponsManagerList() {
      systemCouponsManagerList({
        type: 3,
        userId: sessionStorage.getItem("userId"),
      }).then((res) => {
        if (res.code == 1000) {
          this.dataList = res.data.lists;
          console.log(this.dataList);
        }
      });
    },
    //传优惠券id到界面
    goPay(val) {
      this.$store.commit("couponNum", val);
      this.$router.go(-1);
    },
  },
  activated() {
    this.getSystemCouponsManagerList();
  },
};
</script>

<style lang="scss" scoped>
.couponList {
  position: relative;
  width: 343px;
  height: 148px;
  background-color: #fff;
  border-radius: 10px;
  margin: auto;
  margin-top: 10px;
  box-sizing: border-box;
  padding-left: 18px;
  padding-right: 18px;
  font-size: 14px;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.08);
  // .circle {
  //   position: absolute;
  //   left: 0;
  //   top: 78px;
  //   clip: rect(0px 50px 100px 0px);
  //   background-color: rgb(245, 246, 247);
  //   box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.1);
  //   z-index: 1;

  //   width: 10px;
  //   height: 20px;
  //   border-radius: 0 20px 20px 0;
  //   line-height: 100px;
  // }
  .upbox {
    display: flex;
    border-bottom: 1px dashed #ddd;
    padding-left: 6px;
    padding-bottom: 10px;
    .couponStyle {
      width: 224px;
      .couponName {
        font-size: 19px;
        font-weight: 600;
        padding: 22px 0 12px 0;
      }
    }
    .price {
      color: rgba(248, 73, 70, 1);
      margin-top: 15px;
      width: 160px;
      text-align: right;
      margin-right: 10px;
      span:nth-child(2) {
        font-size: 45px;
      }
      span:nth-child(1) {
        display: inline-block;
        font-size: 25px;
        margin-right: 5px;
      }
    }
    .zhekou {
      color: rgba(248, 73, 70, 1);
      margin-top: 15px;
      width: 160px;
      text-align: right;
      margin-right: 10px;
      span:nth-child(1) {
        font-size: 45px;
      }
      span:nth-child(2) {
        display: inline-block;
        font-size: 18px;
        margin-left: 8px;
      }
    }
  }
  .downBox {
    display: flex;
    justify-content: space-between;
    height: 52px;
    line-height: 52px;
    .van-button {
      margin-top: 13px;
      height: 30px;
      width: 79px;
      color: rgba(244, 202, 68, 1) !important;
    }
  }
}
.dateStyle {
  color: rgba(102, 102, 102, 1);
  // background-color: red;
  .couTitle {
    display: inline-block;
    margin-right: 15px;
    padding-left: 5px;
  }
}
</style>