<template>
  <div class="addInfo">
    <!-- 姓名 -->
    <van-form @submit="onSubmit">
      <div>
        <div class="userName">姓名</div>
        <van-field
          v-model="from.name"
          placeholder="请输入姓名"
          :rules="[{ required: true, message: '请输入姓名' }]"
          name="name"
        />
      </div>
      <!-- 楼号，单元，门牌号，邮编 -->
      <div>
        <div class="userName">楼号，单元，门牌号，邮编</div>
        <van-field
          v-model="from.delivery"
          name="delivery"
          placeholder="请输入楼号，单元，门牌号，邮编"
        />
      </div>
      <div>
        <div class="userName">手机号码</div>
        <van-field
          v-model="from.phone"
          name="phone"
          placeholder="请输入手机号码"
          type="tel"
        />
      </div>
      <!-- 按钮 -->
      <div class="btns">
        <van-button
          type="primary"
          color="rgba(244, 202, 68, 1)"
          block
          :disabled="disabledStatus"
        >
          <span>{{ btn == 0 ? "保存" : "保存并使用" }}</span>
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { debouce } from "@/utils/utils";
import {
  addressDetail,
  editAddressDetail,
  findOne,
  updateOneAddress,
} from "@/api/home";
export default {
  data() {
    return {
      btn: null,
      from: {
        phone: "",
        name: "",
        delivery: "",
        id: null,
      },
      ids: null,
      disabledStatus: true,
      type: null, //0是go 1是from
    };
  },
  methods: {
    //通过form表单提交数据 confirmOrder goInfo  fromInfo
    onSubmit() {
      this.from.id = this.ids;
      updateOneAddress(this.from).then((res) => {
        if (res.code == 1000) {
          this.$toast("修改地址成功");
          if (this.btn == 0) {
            this.$router.go(-1)
          } else {
            setTimeout(() => {
              if (this.type == 0) {
                let obj = {};
                obj.pickupAddress = this.from.delivery;
                obj.pickupName = this.from.name;
                obj.pickupPhone = this.from.phone;
                this.$store.commit("quickgoAds", obj);
                this.$router.push({
                  path: "/confirmOrder",
                });
              } else {
                let obj = {};
                obj.shipAddress = this.from.delivery;
                obj.shipName = this.from.name;
                obj.shipPhone = this.from.phone;
                this.$store.commit("quickFromAds", obj);
                this.$router.push({
                  path: "/confirmOrder",
                });
              }
            }, 2000);
          }
        }
      });
    },
  },
  watch: {
    from: {
      handler: function () {
        if (
          this.from.delivery !== "" &&
          this.from.name !== "" &&
          this.from.phone !== ""
        ) {
          this.disabledStatus = false;
        } else {
          this.disabledStatus = true;
        }
      },
      deep: true,
    },
  },
  activated() {
    this.btn = this.$route.query.btn;
    this.ids = this.$route.query.ids; //闪送
    // this.ids = this.$route.query.ids; //闪送
    this.type = this.$route.query.type; //闪送
    if (this.type == 0) {
      let info = JSON.parse(this.$route.query.info);
    } else {
      let info = JSON.parse(this.$route.query.info);
    }
    let info = JSON.parse(this.$route.query.info);
    if (info) {
      this.from.phone = info.phone;
      this.from.name = info.name;
      this.from.delivery = info.delivery;
      console.log(this.from);
    }
  },
};
</script>

<style lang="scss" scoped>
.addInfo {
  padding: 0 16px;
  .van-cell {
    padding: 13px 14px;
  }
  .userName {
    height: 50px;
    line-height: 50px;
  }
  .street {
    display: flex;
    justify-content: space-between;
  }
  .streetInput {
    width: 208px;
  }
  .houseNum {
    width: 124px;
  }
  .btns {
    margin: 18px 0;
    span {
      font-size: 16px;
      color: #000 !important;
    }
  }
}
</style>