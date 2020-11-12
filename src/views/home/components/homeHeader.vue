<template>
  <div class="home-header-warp">
    <div class="home-header-content-warp">
      <div class="flex searchBox">
        <van-field v-model="inputSearch" placeholder="想买点什么..." />
        <van-button
          @click="$router.push(`/downOrder`)"
          round
          type="default"
          color="rgba(244, 202, 68, 1)"
          class="roundBtn"
        >
          <span style="color:rgba(62, 58, 57, 1)">下单</span>
        </van-button>
      </div>
      <homeHeaderList></homeHeaderList>
    </div>
  </div>
</template>

<script>
import homeHeaderList from "./homeHeaderList";

export default {
  components: {
    homeHeaderList,
  },
  name: "homeHeader",
  data() {
    return {
      inputSearch: "", //搜索的内容
    };
  },
};
</script>

<style scoped lang="scss">
@import "src/styles/main.scss";

.home-header-warp {
  height: 272px;
  position: relative;
  padding-bottom: 35px;

  &:after {
    position: absolute;
    left: 0;
    right: 0;
    content: "";
    background: #f4ca44;
    z-index: 2;
    height: 178px;
  }

  .home-header-content-warp {
    height: 272px;
    position: absolute;
    width: 343px;
    top: 0;
    left: 16px;
    right: 15px;
    z-index: 10;
    border-radius: 4px;
    background: #ffffff;
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.12);

    .searchBox {
      width: 85%;
      padding: 14px 17px;
      padding-right: 0;
      border-bottom: 1px solid #eee;
      display: flex;
      align-content: center;
      justify-content: center;
      margin: 0 auto;
      .van-button{
        margin-top: 5px;
      }
    }
  }
}
.van-field {
  font-size: 18px;
  padding-left: 0;
}
.van-cell::after {
  border-bottom: none;
}
.van-field__control {
  font-size: 18px;
}
</style>