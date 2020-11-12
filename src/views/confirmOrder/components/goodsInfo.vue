<template>
  <div class="container">
    <div class="payList boxShadow">
      <div>
        <img src="@/assets/icon/payInfo/goods.png" alt />
        物品信息
      </div>
      <div :class="{ ischoise: goodsName == '' }" @click="show = true">
        {{ goodsName || "点击设置" }}
        <van-icon name="arrow" size="16" color="rgba(161, 161, 161, 1)" />
      </div>
    </div>
    <!-- 物品信息弹出框 -->
    <van-popup
      v-model="show"
      position="bottom"
      round
      :style="{ height: '61.5%' }"
    >
      <div class="contentBox">
        <div class="addPrice">
          <div @click="show = false">取消</div>
          <div class="title">品类/重量</div>
          <div @click="subBts">确认</div>
        </div>
        <div class="goodsTitle">物品</div>
        <div class="numBox">
          <div
            class="priceNum"
            :class="{ chioseChecked: flag == index }"
            v-for="(item, index) in goodsType"
            :key="index"
            @click="choisePrice(item.typeNameGer, index, item.id, item.price)"
          >
            <div>{{ item.typeNameGer || item.typeNameCh }}</div>
          </div>
        </div>
        <!-- 重量设置 -->
        <div class="weight">
          <div>
            <div>重量</div>
            <div class="colorText maxWeight">最大99公斤</div>
          </div>
          <div>
            <div class="btn">
              <div @click="subBtn()">−</div>
            </div>
            <div>
              <span>{{ symbol + num + "公斤" }}</span>
            </div>
            <div class="btn add">
              <div @click="addprice()">+</div>
            </div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  props: ["goodsType"],
  data() {
    return {
      show: false,
      flag: null,
      goodsid: null, //物品的id
      num: 1,
      symbol: ` < `,
      goods: null,
      goodsName: "",
      priceList: [],
      price: null,
      qdprice: null,
      newId: null,
    };
  },
  methods: {
    addprice() {
      if (this.num == 99) {
        this.$toast("最大重量为99公斤");
        return;
      } else {
        this.num++;
      }
    },
    //提交的时候不能重复提交
    subBts() {
      this.show = false;
      this.goodsName = this.goods;
      this.qdprice = this.price;
      this.$emit(
        "chioseGoods",
        this.goodsName,
        this.goodsid,
        this.qdprice,
        this.num
      );
    },
    choisePrice(val, i, id, price) {
      this.price = price;
      this.goods = val;
      this.goodsid = id; //商品的id
      this.flag = i;
      this.num = 1;
    },
    subBtn() {
      if (this.num == 1) {
        return;
      } else {
        this.num--;
      }
    },
  },
  watch: {
    num() {
      this.$emit("choiseWeight", this.num);
    },
        goodsid: {
      handler(newName, oldName) {
        console.log(newName, oldName);
      },
      // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.payList {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  margin: 10px 16px 0px;
  padding: 0 16px;
  background-color: #fff;
  > div:nth-child(1) {
    display: flex;
    align-items: center;
    img {
      width: 24px;
      height: 24px;
      margin-right: 12px;
    }
  }
  .van-icon {
    vertical-align: text-top;
  }
}
.contentBox {
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
  .goodsTitle {
    padding: 19px 16px;
  }
  .numBox {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0px 16px 0;
    padding-right: 1px;

    .priceNum {
      width: 109px;
      height: 40px;
      line-height: 40px;
      background-color: #fff;
      border: 1px solid rgba(236, 236, 236, 1);
      border-radius: 5px;
      margin-bottom: 10px;
      margin-right: 5px;
      div {
        display: flex;
        justify-content: center;
      }
    }
    .chioseChecked {
      background-color: rgba(244, 202, 68, 1);
    }
  }
  .payType {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 0 19px;
    height: 50px;
    line-height: 50px;
    .paymoney {
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 19px;
        margin-right: 10px;
      }
    }
  }
  .weight {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px 16px 0;
    > div:nth-child(2) {
      display: flex;
      .btn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 24px;
        height: 24px;
        background-color: rgba(238, 238, 238, 1);
        border-radius: 50%;
        font-size: 25px;
        margin: 0 4px;
      }
      .add {
        background-color: rgba(244, 202, 68, 1);
      }
    }
    .maxWeight {
      margin-top: 5px;
    }
  }
}
.ischoise {
  color: rgb(248, 73, 70);
}
</style>