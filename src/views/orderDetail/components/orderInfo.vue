<template>
  <div>
    <div class="info" v-if="status == 8">
      <div>
        <img
          src="@/assets/icon/orderStatus/user.png"
          v-if="!giveUser.headImg"
          alt
        />
        <img :src="$imgUrl + giveUser.headImg" v-else alt class="imgStyle" />
        <div>{{ giveUser.name }}</div>
      </div>
      <div>
        <img src="@/assets/icon/orderStatus/map.png" alt @click="gomap()" />
        <a :href="'tel:' + giveUser.phone">
          <img src="@/assets/icon/orderStatus/tel.png" />
        </a>
      </div>
    </div>
    <!-- 分割渲染 -->
    <div
      class="orderInfo"
      v-if="status == 5 || status == 1"
      :class="{ mt: status == 1 || status == 5 }"
    >
      <div class="userInfo">
        <div>
          <img
            src="@/assets/icon/orderStatus/user.png"
            v-if="!giveUser.headImg"
            alt
          />
          <img :src="$imgUrl + giveUser.headImg" v-else alt class="imgStyle" />
          <div>{{ giveUser.name }}</div>
        </div>
        <div>
          <img
            src="@/assets/icon/orderStatus/map.png"
            alt
            v-if="status == 5"
            @click="gomap()"
          />
          <a :href="'sms:' + giveUser.phone" v-else>
            <img src="@/assets/icon/orderStatus/info.png" alt
          /></a>
          <a :href="'tel:' + giveUser.phone">
            <img src="@/assets/icon/orderStatus/tel.png" />
          </a>
        </div>
      </div>
      <div v-if="imgList.length !== 0">
        <div class="tips">配送员已上传商品图片/发票(放大查看)</div>
        <div class="showImg">
          <van-uploader
            v-model="imgList"
            multiple
            :max-count="0"
            :deletable="false"
          />
        </div>
      </div>
      <div class="priceInfo">
        <span>商品实际价格</span>
        <span>{{ giveUser.addPrice }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["status", "imgList", "giveUser"],
  data() {
    return {
      fileList: [
        { url: require("@/assets/icon/orderStatus/goods.png") },
        { url: require("@/assets/icon/orderStatus/fp.png") },
      ],
    };
  },
  methods: {
    gomap() {
      this.$router.push({
        path: "/giveGoods",
        query: {
          info: JSON.stringify(this.giveUser),
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.mt {
  margin-top: 50px !important;
  margin-bottom: -35px !important;
}
.info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0px 16px 10px;
  width: 343px;
  height: 80px;
  background-color: #fff;
  border-radius: 10px;
  padding: 0 16px;
  box-sizing: border-box;
  margin-top: 47px;
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
      // vertical-align: middle;
      margin: 0 19px;
    }
  }
}
.orderInfo {
  box-sizing: border-box;
  margin: 0px 16px 10px;
  width: 343px;
  // height: 246px;
  background-color: #fff;
  border-radius: 10px;
  padding: 0 16px;
  margin-top: 60px;

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
      a {
        margin-left: 19px;
        margin-top: 6.5px;
      }
      > img {
        width: 32px;
        height: 32px;
      }
    }
  }
  .tips {
    padding: 15px 0 16px 0;
  }
  .showImg {
    /deep/.van-uploader__preview-image {
      width: 73px;
      height: 73px;
    }
  }
  .priceInfo {
    font-size: 16px;
    padding: 10px 0;
    > span:nth-child(2) {
      color: rgba(248, 73, 70, 1);
      padding-left: 10px;
    }
  }
}
.imgStyle {
  width: 47px;
  height: 47px;
  border-radius: 50%;
}
</style>
