<template>
  <div class="container">
    <div class="upbox" @click="$router.push(`/commonAddress`)">
      <div class="iconAddress">
        <img src="@/assets/icon/downOrder/address.png" alt />
      </div>
      <div class="addressText" v-if="$store.state.helpFromAds.shipAddress">
        <div class="fs16 ellipsis">
          {{ shipAddress }}
        </div>
        <div class="colorText ellipsis">
          <div>{{ $store.state.helpFromAds.shipName }}</div>
          <div>{{ $store.state.helpFromAds.shipPhone }}</div>
        </div>
      </div>
      <div class="choiseAddress" v-else>
        <div class="fs16 ellipsis">请选择配送地址</div>
      </div>
      <div class="arrowRight">
        <van-icon name="arrow" size="20" color="rgba(119, 119, 119, 1)" />
      </div>
    </div>
    <div class="downBox" @click="helpTime()">
      <div>
        <img src="@/assets/icon/downOrder/clock.png" alt />
      </div>
      <div class="fs16">{{ buyStatus }}</div>
      <div class="arrowRight">
        <van-icon name="arrow" size="20" color="rgba(119, 119, 119, 1)" />
      </div>
    </div>
    <div>
      <choiseTime
        :showTime="showTime"
        @buyTime="buyTime"
        timeStatus="立即帮买"
      ></choiseTime>
    </div>
  </div>
</template>
<script>
import choiseTime from "@/components/happy/choiseTime"; //时间控件
import { getDate } from "@/assets/js/up";
export default {
  components: {
    choiseTime,
  },
  props: {
    status: {
      type: Object,
      define: {},
    },
  },
  computed: {
    shipAddress() {
      return this.$store.state.helpFromAds.shipAddress;
    },
  },
  watch: {
    shipAddress() {
      this.$emit("shipAddressAddress", 1);
    },
    status(status) {
      if (status) {
        this.addStatus = true;
        this.addInfo = status.cityName + status.street + status.door;
        this.userInfo = status.username || status.userName;
        this.phoneInfo = status.phone;
      } else {
        this.addStatus = false;
      }
    },
  },
  data() {
    return {
      showTime: 0,
      buyStatus: "立即帮买",
      addStatus: false, //判断客户是否选择了地址
      addInfo: "", //地址信息
      userInfo: "", //人员信息
      phoneInfo: "", //电话信息
    };
  },
  methods: {
    helpTime() {
      this.showTime++;
    },
    buyTime(e) {
      console.log(e);
      let time = "";
      if (e[1] == "立即帮买") {
        time = getDate(Date.parse(new Date()));
        console.log(time);
      } else if (e[0] == "明天") {
        time = getDate(Date.parse(new Date()), 1, e[1], e[2]);
      } else if (e[0] == "今天" || e[0] == "") {
        time = getDate(Date.parse(new Date()), 0, e[1], e[2]);
      }
      this.buyStatus = time;
      this.$emit("chioseTime", this.buyStatus);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 343px;
  height: 120px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.06);

  .upbox {
    box-sizing: border-box;
    display: flex;
    height: 70px;
    padding-top: 14px;
    .iconAddress {
      img {
        width: 24px;
        height: 24px;
        margin: 11px 16px 0 13px;
      }
    }
    .addressText {
      width: 260px;
      height: 100%;
      border-bottom: 1px solid rgba(248, 248, 248, 1);
      .colorText {
        display: flex;
        margin-top: 5px;
        height: 20px;
        line-height: 20px;
        div:nth-child(1) {
          margin-right: 10px;
        }
      }
    }
    .choiseAddress {
      width: 260px;
      height: 50px;
      line-height: 50px;
    }
    .arrowRight {
      margin: 13px 10px 0 0;
    }
  }
}
.downBox {
  box-sizing: border-box;
  display: flex;
  height: 50px;
  line-height: 50px;
  div:nth-child(1) {
    img {
      width: 24px;
      height: 24px;
      margin: 11px 16px 0 13px;
    }
  }
  div:nth-child(2) {
    width: 260px;
    height: 100%;
  }
}
</style>
