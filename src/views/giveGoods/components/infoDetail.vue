<template>
  <div class="container">
    <div class="info boxShadow">
      <div class="uerrInfo">
        <img
          src="@/assets/icon/orderStatus/user.png"
          v-if="!info.headImg"
          alt
        />
        <img :src="$imgUrl + info.headImg" v-else alt />
        <div>{{ info.name }}</div>
      </div>
      <div>
        <a :href="'tel:' + info.phone">
          <img src="@/assets/icon/orderStatus/tel.png" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { latLgt } from "@/api/home";

export default {
  name: "infoDetail",
  data() {
    return {
      info: {},
    };
  },
  methods: {
    getlatLgt() {
      latLgt({
        userId: this.info.courierId,
      }).then((res) => {
        console.log(res);
      });
    },
  },
  activated() {
    this.getlatLgt();
    this.info = JSON.parse(this.$route.query.info);
    console.log(this.info, "this.info");
    console.log(this.$route.query.info, "this.info");
  },
};
</script>

<style lang="scss" scoped>
.info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0px 16px 0px;
  width: 343px;
  height: 58px;
  background-color: #fff;
  border-radius: 5px;
  padding: 0 16px;
  box-sizing: border-box;
  .uerrInfo {
    img {
      width: 45px;
      height: 45px;
      border-radius: 50%;
    }
  }
  > div:nth-child(1) {
    display: flex;
    align-items: center;

    > img {
      width: 45px;
      height: 45px;
      margin-right: 11px;
    }
  }
  > div:nth-child(2) {
    > img {
      width: 32px;
      height: 32px;
      vertical-align: middle;
    }
  }
}
</style>