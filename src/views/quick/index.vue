<template>
  <div class="box">
    <div class="quickBox" @click="showCustomPopupClick">
      <QuickHeader></QuickHeader>
      <div class="location">
        <Location></Location>
      </div>
      <mapGoole style="width: 100%; height: 600px"></mapGoole>
      <div class="addressChoise">
        <addressInfo></addressInfo>
      </div>
    </div>
    <CustomPopup ref="CustomPopupRef" v-show="status">
      <div slot="PoperContent" class="PoperContentView">
        <div class="ServiceNoteTitle W100">
          <login @quickStatus="showFun" @closeStatus="cloiseBtn"></login>
        </div>
      </div>
    </CustomPopup>
  </div>
</template>

<script>
import login from "../login/index";
import QuickHeader from "./components/quickHeader";
import addressInfo from "./components/addressInfo";
import Location from "./components/location";
import mapGoole from "../../components/mapGoole";
import CustomPopup from "@/components/happy/customPopup"; //主要是登录页面
export default {
  components: {
    QuickHeader,
    addressInfo,
    Location,
    mapGoole,
    CustomPopup,
    login,
  },

  data() {
    return {
      visible: false,
      status: true,
      fromInfoAddress: {},
    };
  },
  watch: {
    //监听路由的变化弹窗注册框
    $route(to, from) {
      if (to.path === "/quick" && sessionStorage.getItem("JWTToken") !== "") {
        this.$refs.CustomPopupRef.showCustom();
      }
    },
  },
  methods: {
    // //关闭框框
    cloiseBtn(status) {
      this.$refs.CustomPopupRef.maskClick();
    },
    showFun(status) {
      this.$refs.CustomPopupRef.maskClick();
    },
    showCustomPopupClick() {
      // //如果没有token就调转到登录页面
      let token = sessionStorage.getItem("JWTToken");
      if (!token) {
        this.$refs.CustomPopupRef.showCustom();
      }
    },
    closerButton() {
      this.$refs.CustomPopupRef.maskClick();
    },
  },
  activated() {
    this.$refs.CustomPopupRef.maskClick();
    if (this.$route.query.id == 1) {
      console.log("开始了");
      this.$refs.CustomPopupRef.maskClick();
    }
  },
};
</script>

<style lang="scss" scoped>
.box {
  // position: relative;
  width: 100%;
  height: 100%;
  .quickBox {
    .addressChoise {
      position: fixed;
      left: 50%;
      bottom: 60px;
      width: 375px;
      transform: translate(-50%);
    }
    .location {
      position: absolute;
      top: 55px;
      width: 375px;
      z-index: 999;
    }
  }
}

.PoperContentView {
  height: 667px;
  background: #ffffff;
}
</style>
