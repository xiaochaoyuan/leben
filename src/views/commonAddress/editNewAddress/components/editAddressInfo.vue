<template>
  <div class="addInfo">
    <!-- 姓名 -->
    <van-form @submit="onSubmit">
      <div>
        <div class="userName">姓名</div>
        <van-field
          v-model="from.username"
          placeholder="请输入姓名"
          :rules="[{ required: true, message: '请输入姓名' }]"
          name="username"
        />
      </div>
      <!-- 街道和门牌号 -->
      <div class="street">
        <div>
          <div class="userName">街道</div>
          <van-field
            v-model="from.street"
            placeholder="请输入街道"
            class="streetInput"
            name="street"
            :rules="[{ required: true, message: '请输入街道' }]"
          />
        </div>
        <div>
          <div class="userName">门牌</div>
          <van-field
            v-model="from.door"
            name="door"
            placeholder="请输入门牌号"
            class="houseNum"
          />
        </div>
      </div>
      <!-- 街道和门牌号 -->
      <div class="street">
        <div>
          <div class="userName">邮编</div>
          <van-field
            v-model="from.email"
            name="email"
            placeholder="请输入邮编"
            class="streetInput"
          />
        </div>
        <div>
          <div class="userName">城市</div>
          <van-field
            v-model="from.cityName"
            name="cityName"
            placeholder="请输入城市"
            class="houseNum"
          />
        </div>
      </div>
      <!-- 国家 -->
      <div>
        <div class="userName">国家</div>
        <van-field
          v-model="from.country"
          name="country"
          placeholder="请输入国家"
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
      <div>
        <div class="userName">确认手机号码</div>
        <van-field
          v-model="from.confrimPhone"
          placeholder="请输入确认手机号码"
          type="tel"
          name="confrimPhone"
        />
      </div>
      <div>
        <div class="userName">邮箱</div>
        <van-field
          v-model="from.zipCode"
          name="zipCode"
          placeholder="请输入邮箱"
        />
      </div>
      <!-- 按钮 -->
      <div class="btns">
        <van-button type="primary" color="rgba(244, 202, 68, 1)" block>
          <span>{{ btn == 0 ? "保存" : "保存并使用" }}</span>
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { addressDetail, editAddressDetail } from "@/api/home";
export default {
  data() {
    return {
      btn: null,
      from: {
        phone: "",
        username: "",
        street: "",
        door: "",
        email: "",
        cityName: "",
        country: "",
        zipCode: "",
        confrimPhone: "", //确认号码
      },
      id: "",
    };
  },
  methods: {
    //帮买
    getaddressDetail() {
      addressDetail({
        id: this.id,
      }).then((res) => {
        console.log(res);
        if (res.code == 1000) {
          let data = res.data;
          Object.keys(this.from).forEach((key) => {
            this.from[key] = data[key];
          });
          this.from.confrimPhone = this.from.phone;
        }
      });
    },
    //通过form表单提交数据
    onSubmit(form) {
      form.id = this.id;
      if (!form.phone === form.confrimPhone) {
        this.$toast("两次输入不一致");
        return;
      }
      delete form.confrimPhone;
      editAddressDetail(form).then((res) => {
        if (res.code == 1000) {
          this.$toast("修改地址成功");
          if (this.btn == 0) {
            this.$router.go(-1);
          } else {
            setTimeout(() => {
              this.$router.push({
                path: "/downOrder",
                query: {
                  info: JSON.stringify(form),
                },
              });
            }, 2000);
          }
        }
      });
    },
  },
  activated() {
    this.id = this.$route.query.id; //帮买
    this.btn = this.$route.query.btn; //有值就是个人中心传过来的

    if (this.id) {
      this.getaddressDetail();
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