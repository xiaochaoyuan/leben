<template>
  <div class="itemBox">
    <span>{{ $t('text.globalCurrency') }}</span>
    <div
      class="itemFun"
      v-for="(item, index) in dataList"
      :key="index"
      @click="goLook(index,item.url)"
    >
      <div>
        <img :src="item.icon" alt />
        <div>{{ item.funName }}</div>
      </div>
      <van-icon name="arrow" size="15" color="rgba(119, 119, 119, 1)" />
    </div>
    <van-popup v-model="show">
      <div class="show">
        <van-radio-group v-model="radio">
          <van-radio name="1">中文</van-radio>
          <van-radio name="2" style="margin-top:20px">Deutsche</van-radio>
        </van-radio-group>
        <van-button style="margin-top: 30px;width: 150px;" type="primary" @click="changeLanguage">确认</van-button>
      </div>
    </van-popup>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      radio: "1",
      dataList: [
        {
          icon: require("@/assets/icon/myInfo/address.png"),
          funName: this.$t("text.globalCurrency"),
          url: "/addressManagement",
        },
        {
          icon: require("@/assets/icon/myInfo/address.png"),
          funName: "优惠券",
          url: "/coupon",
        },
        {
          icon: require("@/assets/icon/myInfo/mobile.png"),
          funName: "联系客服",
          url: "/contactPeople",
        },
        {
          icon: require("@/assets/icon/myInfo/option.png"),
          funName: "意见反馈",
          url: "/feedback",
        },
        {
          icon: require("@/assets/icon/myInfo/address.png"),
          funName: "语言选择",
        },
      ],
    };
  },
  methods: {
    changeLanguage() {
      if (this.radio) {
        if (this.radio == 1) {
          this.$i18n.locale = "zh-cn";
          this.show = false;
        } else {
          this.$i18n.locale = "en-us";
          console.log(this.$i18n.locale);
          this.show = false;
        }
      } else {
        Toast("请选择");
      }
    },
    goLook(index, url) {
      if (index == 4) {
        this.show = true;
      } else {
        this.$router.push(`${url}`);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.itemBox {
  font-size: 18px;
  margin-top: 20px;

  .itemFun {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    line-height: 50px;
    > div {
      display: flex;
      align-items: center;
      img {
        width: 24px;
        height: 24px;
        vertical-align: text-bottom;
        margin-right: 11px;
      }
    }
  }
}
.show {
  width: 250px;
  height: 250px;
  padding: 50px;
  padding-top: 60px;
  box-sizing: border-box;
}
</style>
