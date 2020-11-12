<template>
  <div>
    <div class="fillBox">
      <div class="detail">
        <van-field
          v-model="from.delivery"
          placeholder="填写楼号，单元，门牌号，邮编，收货更快"
          name="delivery"
          @input="inputValue"
        />
      </div>
    </div>
    <div class="userInfo">
      <div>
        <van-field v-model="from.name" placeholder="收货人姓名" @input="inputValue" />
      </div>
      <div>|</div>
      <div>
        <van-field v-model="from.phone" placeholder="收货人手机号码" @input="inputValue" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      from: {
        name: "", //发件人姓名
        // address:'',//发件人地址
        delivery: "", //手写发件人地址
        phone: "", //发件人电话
      },
    };
  },
  methods: {
    inputValue() {
      this.$emit("inputValue", this.from);
    },
  },
  activated() {
    this.from = {};
  },
};
</script>

<style lang="scss" scoped>
/deep/.van-cell {
  padding: 0;
  padding-left: 3px;
}
/deep/.van-field__control {
  height: 27px;
  &::-webkit-input-placeholder {
    color: rgba(119, 119, 119, 1);
    font-size: 16px;
  }
}
.fillBox {
  margin: 0 16px;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  .detail {
    height: 26px;
    line-height: 26px;
    border-left: 4px solid rgba(244, 202, 68, 1);
    margin-top: 5px;
  }
}
.userInfo {
  display: flex;
  font-size: 16px;
  color: #ddd;
  padding: 10px 0;
  margin: 0 16px;
  height: 27px;
  line-height: 25px;
  border-bottom: 1px solid #eee;

  > div:nth-child(1) {
    width: 100px;
    margin-right: 20px;
  }
  > div:nth-child(2) {
    margin-right: 20px;
  }
}
</style>