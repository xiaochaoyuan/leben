<template>
  <div class="exchangeBox">
    <div class="region">
      <div class="title">乐币兑换区</div>
      <div>更多</div>
    </div>
    <div class="typeBox">
      <div class="couponList" v-for="(item,index) in datalist" :key="index">
        <div class="couponDetail">
          <div class="imgBox">
            <div class="imgSize">
              <div class="imgName">
                <div>{{item.type==1?'超':item.type==2?'外':'闪'}}</div>
                {{item.type==1?'市':item.type==2?'卖':'送'}}
              </div>
              <div class="price">
                <span>{{item.price}}</span>
                <span>€</span>
              </div>
              <img src="@/assets/icon/home/supermarket.png" alt v-if="item.type==1" />
              <img src="@/assets/icon/home/outFood.png" alt v-else-if="item.type==2" />
              <img src="@/assets/icon/home/quick.png" alt v-else />
            </div>
          </div>
          <div class="tips">超市优惠券满50,可用有效期2020.4.24日</div>
          <div class="btns">
            <div>{{item.money}}乐币兑换</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      datalist: [
        {
          type: "超市",
          price: "15",
          money: "1500",
          type: 1,
        },

        {
          type: "外卖",
          price: "15",
          money: "1500",
          type: 2,
        },
        {
          type: "闪送",
          price: "15",
          money: "1500",
          type: 3,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.exchangeBox {
  padding: 0 16px;
  .region {
    display: flex;
    justify-content: space-between;
    padding-top: 24px;
    margin-bottom: 22px;
    div:nth-child(1) {
      font-size: 16px;
      border-left: 5px solid rgba(244, 202, 68, 1);
      padding-left: 9px;
    }
  }
  .typeBox {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .couponList {
    width: 166px;
    height: 275px;
    background-color: #fff;
    padding: 0 11px;
    margin-bottom: 10px;
    box-sizing: border-box;
    .couponDetail {
      height: 166px;
      .imgBox {
        text-align: center;
        padding: 60px 0;
        .imgName {
          position: absolute;
          left: 36px;
          top: 6px;
          color: #fff;
          font-size: 12px;
        }
        .price {
          position: absolute;
          left: 74px;
          top: 11px;
          color: #fff;
          span:nth-child(1) {
            font-size: 21px;
            padding-right: 2px;
          }
          span:nth-child(2) {
            font-size: 8px;
          }
        }
        .imgSize {
          position: relative;

          img {
            width: 90px;
            height: 45px;
          }
        }
      }

      .tips {
        font-size: 12px;
        line-height: 22px;
      }
      .btns {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
        margin-top: 8px;
        border-radius: 5px;
        width: 145px;
        height: 37px;
        background-color: rgba(244, 202, 68, 1);
        font-size: 15px;
      }
    }
  }
}
</style>