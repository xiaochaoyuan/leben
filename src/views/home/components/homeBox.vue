<template>
  <div class="homeBox">
    <div class="itemBox" v-for="(item,index) in list" :key="index">
      <img :src="item.icon" alt />
      <div>{{item.text}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "homeBox",
  data() {
    return {
      list: [
        {
          id: 0,
          icon: require("@/assets/icon/home/running.png"),
          text: "全城跑腿",
          url: "",
        },
        {
          id: 1,
          icon: require("@/assets/icon/home/serve.png"),
          text: "专人服务",
          url: "",
        },
        {
          id: 2,
          icon: require("@/assets/icon/home/pay.png"),
          text: "放心支付",
          url: "",
        },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
.homeBox {
  display: flex;
  flex-wrap: wrap;
  .itemBox {
    width: 33.33%;
    text-align: center;
    margin-bottom: 20px;
    >div{
      margin-top: 5px;
    }
  }
}
</style>