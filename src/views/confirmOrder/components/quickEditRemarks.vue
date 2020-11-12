<template>
  <div class="remarksBox">
    <div class="topFun">
      <van-icon
        name="arrow-left"
        size="20"
        class="iconLeft"
        color="rgba(63, 59, 58, 1)"
        @click="$router.go(-1)"
      />
      <div>备注</div>
    </div>
    <div>
      <van-field
        v-model="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="100"
        placeholder="请备注物品的详情信息。例：易碎品，请轻拿轻放。最多不超过100个字..."
      />
    </div>
    <div class="btns" @click="subRemake()">
      <van-button type="primary" color="rgba(244, 202, 68, 1)" block>
        <span>确认</span>
      </van-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      message: "",
    };
  },

  methods: {
    subRemake() {
      this.$store.commit("quickRemake", this.message);
      this.$router.go(-1)
    },
  },

  mounted() {
    this.message = "";
    console.log("44");
  },
};
</script>

<style lang="scss" scoped>
.remarksBox {
  position: relative;
  background-color: #fff;
  min-height: 100vh;
  .btns {
    position: absolute;
    left: 0;
    bottom: 13px;
    width: 100%;
    box-sizing: border-box;
    padding: 0 16px;
    .van-button {
      border-radius: 5px;
    }
    span {
      font-size: 16px;
      color: #000 !important;
    }
  }
}
.topFun {
  position: relative;
  display: flex;
  height: 57px;
  line-height: 57px;
  background-color: #fff;
  font-size: 18px;
  justify-content: center;
  border-bottom: 1px solid rgba(236, 236, 236, 1);

  .iconLeft {
    position: absolute;
    left: 18px;
    top: 20px;
  }
}
</style>


