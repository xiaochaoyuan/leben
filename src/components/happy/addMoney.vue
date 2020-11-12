<template>
  <div class="addMoneyBox">
    <van-popup v-model="show" position="bottom" round :style="{ height: '30%' }">
      <div class="contentBox">
        <div class="addPrice">
          <div @click="cancal()">取消</div>
          <div class="title">加小费</div>
          <div @click="isGo()">确定</div>
        </div>
        <div class="numBox">
          <div
            class="priceNum"
            :class="{'chioseChecked':flag==index}"
            v-for="(item,index) in priceList"
            :key="index"
            @click="choisePrice(item.text,item.id)"
          >
            <div>{{item.text}}</div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  props: ["addMoney"],
  data() {
    return {
      show: false,
      flag: null,
      moneyNum: null,
      priceList: [
        {
          text: 2,
          id: 0,
        },
        {
          text: 4,
          id: 1,
        },
        {
          text: 6,
          id: 2,
        },
        {
          text: 8,
          id: 3,
        },
      ],
    };
  },
  methods: {
    choisePrice(val, i) {
      this.moneyNum = val;
      this.flag = i;
    },
    isGo() {
      this.show = false;
      this.$emit("choiseNum", this.moneyNum);
      console.log(this.moneyNum);
    },
    cancal(){
      this.show=false
    }
  },
  watch: {
    addMoney(val) {
      this.show = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.addMoneyBox {
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
  .numBox {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    padding: 20px 16px 0;

    .priceNum {
      width: 109px;
      height: 40px;
      line-height: 40px;
      background-color: #fff;
      border: 1px solid rgba(236, 236, 236, 1);
      border-radius: 5px;
      margin-bottom: 10px;
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
}
</style>