<template>
  <div class="typeBox boxShadow">
    <div class="btns">
      <van-radio-group
        v-model="radio"
        direction="horizontal"
        @change="typeChange()"
      >
        <van-radio
          name="1"
          icon-size="16px"
          checked-color="rgba(244, 202, 68, 1)"
        >
          <span class="fs16">就近帮买</span>
        </van-radio>
        <van-radio
          name="2"
          icon-size="16px"
          checked-color="rgba(244, 202, 68, 1)"
        >
          <span class="fs16">指定地址帮买</span>
        </van-radio>
      </van-radio-group>
    </div>
    <div class="choiseAddress" v-show="typeStatus">
      <van-field
        v-model="value1"
        right-icon="arrow"
        placeholder="请选择指定地址进行帮买"
        @focus="changeAdd()"
      />
    </div>
    <div class="goodsPrice">
      <van-field
        @click="show = true"
        v-model="priceNum"
        label="预估商品费用"
        right-icon="arrow"
        placeholder="预估价格"
        input-align="right"
      />
      <div class="tips">实际商品费用在骑手购买完成后可通过乐本支付</div>
    </div>
    <!-- 预估商品的价格 -->
    <van-popup
      v-model="show"
      position="bottom"
      round
      :style="{ height: '35%' }"
    >
      <div class="contentBox">
        <div class="addPrice">
          <div @click="show = false">取消</div>
          <div class="title">预估商品费用</div>
          <div @click="confrim">确定</div>
        </div>
        <!-- tips -->
        <div class="inputPrice">
          <div>实际商品费用在骑手购买完成后线下进行支付</div>
          <van-form>
            <van-field
              v-model="price"
              placeholder="请输入价格"
              input-align="center"
              name="price"
              type="number"
              @input="validator"
            />
          </van-form>
          <div>最高可代购价值500的商品</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
export default {
  data() {
    return {
      radio: "1",
      value1: "",
      typeStatus: false,
      show: false,
      price: "", //预估商品费用
      priceNum: "",
      pattern: /^([1-9]|[1-9]\\d|500)$/,
      flag: false,
    };
  },
  methods: {
    //选择地址
    changeAdd(){
      this.$router.push(`/shippingAddress`)
    },
    validator(val) {
      console.log(val, "val");
      if (
        /^(500|([1-4]\d{2}|\d|\d{2})(\.\d+)?)$/.test(
          val.toString()
        )
      ) {
        this.flag = true;
      } else {
        if (val == "") {
          this.flag = true;
        } else {
          this.$toast("代购价值不能超过500的商品");
          this.flag = false;
        }
      }
    },

    addnum() {
      console.log("555");
    },
    //确定预估商品费用
    confrim() {
      if (this.flag) {
        this.show = false;
        this.priceNum = this.price;
        this.$emit("price", this.price);
      }
    },
    //选择帮买的方式
    typeChange() {
      if (this.radio == 2) {
        this.typeStatus = true;
      } else {
        this.typeStatus = false;
      }
    },
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
/deep/.van-radio__icon--checked .van-icon {
  color: #000;
}
/deep/.van-cell::after {
  border-bottom: none;
}
.typeBox {
  width: 343px;
  // min-height: 187px;
  background-color: #fff;
  box-sizing: border-box;
  margin: 0 16px;
  margin-top: 10px;
  padding: 0 16px;
  .btns {
    padding-top: 25px;
    padding-bottom: 10px;
    .van-radio {
      margin-right: 20px;
    }
  }
  /deep/.van-cell {
    padding-left: 0;
    padding-right: 0;
  }
  .choiseAddress {
    border-bottom: 1px solid #eee;
  }
  .goodsPrice {
    margin-top: 5px;
    .van-cell::after {
      border: none;
    }
    .tips {
      font-size: 12px;
      color: rgba(248, 73, 70, 1);
      margin-top: 5px;
      padding-bottom: 15px;
    }
  }
}
.contentBox {
  .inputPrice {
    text-align: center;
    margin-top: 4px;
    .van-field {
      box-sizing: border-box;
      border: 1px solid rgba(251, 102, 34, 1);
      width: 335px;
      height: 45px;
      line-height: 45px;
      margin: 0 auto;
      padding: 0;
      /deep/.van-field__control {
        &::-webkit-input-placeholder {
          color: rgba(251, 102, 34, 1);
        }
      }
    }
    > div {
      color: rgba(170, 170, 170, 1);
      padding: 15px 0;
    }
  }
  .addPrice {
    display: flex;
    padding: 0 16px;
    justify-content: space-between;
    height: 54px;
    line-height: 54px;
    border-bottom: 1px solid #eee;
    .title {
      font-size: 16px;
    }
  }
}
</style>
