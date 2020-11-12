<template>
  <!-- 1是订单完成 -->
  <div class="orderInfo" v-if="(status == 5) | (status == 1)">
    <div class="userInfo" :class="{ mt: status == 1 || status == 5 }">
      <div>
        <img
          src="@/assets/icon/orderStatus/user.png"
          v-if="!giveUser.headImg"
          class="imgStyle"
          alt
        />
        <img :src="$imgUrl + giveUser.headImg" v-else alt class="imgStyle" />
        <div>{{ giveUser.name }}</div>
      </div>
      <div>
        <a :href="'sms:' + giveUser.phone" v-if="status == 1">
          <img src="@/assets/icon/orderStatus/info.png" alt
        /></a>
        <a v-else>
          <img
            src="@/assets/icon/orderStatus/map.png"
            alt
            @click="$router.push('/giveGoods')"
        /></a>
        <a :href="'tel:' + giveUser.phone">
          <img src="@/assets/icon/orderStatus/tel.png" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["status", "giveUser"],
  data() {
    return {
      fileList: [
        { url: require("@/assets/icon/orderStatus/goods.png") },
        { url: require("@/assets/icon/orderStatus/fp.png") },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.mt {
  margin-top: 50px;
}
.orderInfo {
  box-sizing: border-box;
  margin: 0px 16px 0;
  width: 343px;
  height: 80px;
  background-color: #fff;
  border-radius: 10px;
  padding: 0 16px;
  .userInfo {
    display: flex;
    justify-content: space-between;
    height: 45px;
    line-height: 45px;
    padding-top: 18px;
    > div:nth-child(1) {
      display: flex;
      > img {
        width: 45px;
        height: 45px;
        margin-right: 11px;
      }
    }
    > div:nth-child(2) {
      margin-top: 6.5px;
      a {
        margin-left: 19px;
      }
      > img {
        width: 32px;
        height: 32px;
      }
    }
  }
}
.imgStyle {
  width: 47px;
  height: 47px;
  border-radius: 50%;
}
</style>
