<template>
  <div class="goodsBox boxShadow">
    <div class="fs16 wangGoods">填写想帮买的商品</div>
    <van-field
      ref="input"
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      placeholder="点击输入你的商品要求,如某品牌，规格等等..."
      @blur="helpGoods"
    />
    <!-- 常用标签 -->
    <div class="userIcon">
      <span v-for="(item,index) in dataList" :key="index" @click="goodsInfo(item)">{{item}}</span>
    </div>
  </div>
</template>

<script>
import { buyOrderGoods } from "@/api/home";
export default {
  data() {
    return {
      message: "", //需要购买商品的信息
      infos: [],
      dataList: [],
    };
  },
  mounted() {
    this.getBuyOrderGoods();
  },
  methods: {
    //帮买的常用物品
    getBuyOrderGoods() {
      buyOrderGoods().then((res) => {
        if (res.code == 1000) {
          let arr = res.data;
          if (arr.length > 0) {
            arr.forEach((item) => {
              this.dataList.push(item.goods);
            });
          }
        }
      });
    },
    //帮忙的商品名称 可以自己手动输入也可以自己填写
    helpGoods() {
      this.$emit("helpGoods", this.message);
      console.log(this.message);
    },
    //快捷选择商品 如果点击第二次的时候就取消它
    goodsInfo(info) {
      if (this.infos.indexOf(info) == -1) {
        this.infos.push(info);
      } else {
        this.infos.forEach((item, index) => {
          if (item === info) {
            this.infos.splice(index, 1);
          }
        });
      }
      this.message = this.infos.join(",");
      this.$emit("helpGoods", this.message);
    },
  },
  activated(){
    this.message=this.$route.query.goods
    

  }
};
</script>

<style lang="scss" scoped>
/deep/.van-cell::after {
  border-bottom: none;
}
/deep/.van-cell {
  padding: 0 8px;
}
/deep/.van-field__control {
  &::-webkit-input-placeholder {
    color: rgba(119, 119, 119, 1);
    font-size: 14px;
  }
}
.goodsBox {
  width: 343px;
  min-height: 165px;
  background-color: #fff;
  box-sizing: border-box;
  margin: 0 16px;
  margin-top: 50px;
  .wangGoods {
    padding: 22px 8px 8px;
  }
  .van-field {
    font-size: 14px;
  }
}
.userIcon {
  padding-left: 8px;
  padding-bottom: 5px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  span {
    display: inline-block;
    padding: 0 15px;
    background-color: rgba(245, 245, 247, 1);
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 15px;
    margin: 0 10px 10px 0;
  }
}
</style>
