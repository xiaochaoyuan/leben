<template>
  <div class="remarksBox" @click="$router.push(`/editRemarks?state=${flag}`)">
    <div>
      <div>
        <img src="@/assets/icon/downOrder/remarks.png" alt />
      </div>
      <div>备注</div>
      <van-field
        type="textarea"
        v-model="msg"
        placeholder="点击输入备注信息"
        rows="1"
        autosize
        input-align="right"
      />
      <van-icon name="arrow" size="16" color="rgba(161, 161, 161, 1)" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg: "", //备注的信息
      flag:null
    };
  },
  watch: {
    // $route: {
    //   handler: function (val, oldVal) {
    //     console.log('555');
    //     if (val.path === "/confirmOrder") {
    //       console.log('555');
    //       this.msg = this.$store.state.quickRemake;
    //       this.flag=0
    //     } else {
    //       this.msg = this.$store.state.remake;
    //       this.flag=1

    //     }
    //   },
    //   // 深度观察监听
    //   deep: true,
    // },
  },
  mounted(){
    // console.log('444');
  }
};
</script>

<style lang="scss" scoped>
.remarksBox {
  width: 343px;
  min-height: 50px;
  background-color: #fff;
  box-sizing: border-box;
  margin: 0 16px;
  margin-top: 10px;
  > div {
    display: flex;
    align-items: center;
    padding: 0 17px 0 8px;
    img {
      vertical-align: middle;
    }
    .van-field {
      // width: 257px;
      flex: 1;
    }
  }
}
</style>
