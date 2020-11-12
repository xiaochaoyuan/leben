<template>
  <div class="addBox">
    <navHeader :title="title"></navHeader>
    <div class="goAddress" @click="$router.push(`/shippingAddress`)">
      <div>从到哪里取</div>
      <van-icon
        name="arrow"
        size="18"
        color="rgba(63, 59, 58, 1)"
        @click="$router.go(-1)"
      />
    </div>
    <addInfo @inputValue="inputValue"></addInfo>
    <conmonAddress
      :addressInfo="userInfoAddress"
      @deleteAddress="deleteAddress"
    ></conmonAddress>
    <div class="btns" @click="save()">
      <van-button type="primary" color="rgba(244, 202, 68, 1)" block>
        <span>确认</span>
      </van-button>
    </div>
  </div>
</template>
<script>
import { getDate } from "../../assets/js/up"; //获取当前时间
import { saveOrder, addressFind, deleteOne } from "@/api/home";
import navHeader from "@/components/happy/navHeader";
import addInfo from "./components/addInfo";
import conmonAddress from "./components/conmonAddress";
export default {
  components: {
    navHeader,
    addInfo,
    conmonAddress,
  },
  data() {
    return {
      title: "取件地址",
      from: {},
      userInfoAddress: null,
    };
  },
  methods: {
    //删除常用地址
    deleteAddress(id) {
      this.$dialog
        .confirm({
          title: "提示",
          message: "删除后数据不可恢复是否确认?",
        })
        .then(() => {
          deleteOne(id).then((res) => {
            if (res.code == 1000) {
              this.getAddressList();
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    //获取列表
    getAddressList() {
      addressFind(0).then((res) => {
        if (res.code == 1000) {
          this.userInfoAddress = res.data.slice(0, 4);
          console.log(this.userInfoAddress);
        }
      });
    },
    //传入的quickgoAds
    inputValue(val) {
      this.from = val;
    },
    //保存地址并使用
    save() {
      this.from.type = 0;
      console.log(this.from.delivery, "this.from");
      if (
        this.from.delivery == undefined ||
        this.from.name == undefined ||
        this.from.phone == undefined
      ) {
        this.$toast("请填写完整地址");
        return
      }
      saveOrder(this.from).then((res) => {
        if (res.code == 1000) {
          let obj = {};
          obj.pickupAddress = this.from.delivery;
          obj.pickupName = this.from.name;
          obj.pickupPhone = this.from.phone;
          this.$store.commit("quickgoAds", obj);
          this.$router.push({
            path: "/confirmOrder",
          });
          // this.$router.push({
          //   path: "/confirmOrder",
          //   query: { fromInfo: JSON.stringify(this.from) },
          // });
        }
      });
      // $router.push(`/confirmOrder`)
    },
  },
  activated() {
    this.getAddressList();
  },
};
</script>

<style lang="scss" scoped>
.addBox {
  background-color: #fff;
  min-height: 100vh;
  .goAddress {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    margin: 0 16px;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #eee;
    font-size: 16px;
    color: rgba(119, 119, 119, 1);
  }
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
</style>