<template>
  <div class="top">
    <div class="TopBtn">
      <van-icon name="cross" @click="closeIcon" />
    </div>
    <div class="wjpas">忘记密码</div>
    <div style="margin-top:61px">
      <van-form @submit="onSubmit">
        <div class="TopText2" v-if="!tochild">
          <span>手机号码</span>
        </div>
        <div class="account" v-if="!tochild">
          <div class="account-code">
            <span style="margin-right:10px">+86</span>
            <div style="margin-right:10px">
              <van-icon name="arrow-down" />
            </div>
          </div>
          <!-- 手机号码 -->
          <van-field
            style="padding:0;line-height: 17px;"
            v-model="phone"
            name="phone"
            placeholder="请输入手机号码"
            :rules="[{ required: true, message: '请输入手机号码' }]"
          />
          <div class="Code" @click="getyzm">
            <span>{{yzmtext}}</span>
          </div>
        </div>
        <!-- 邮箱地址 -->
        <div class="TopText2" v-if="tochild">
          <span>邮箱地址</span>
        </div>
        <div class="account" v-if="tochild">
          <van-field
            style="padding:0;line-height: 17px;"
            v-model="email"
            name="email"
            placeholder="请输入邮箱地址"
            :rules="[{ required: true, message: '请输入邮箱地址' }]"
          />
          <div class="Code" style="margin-left:80px" @click="getEmail">
            <span>{{emyztext}}</span>
          </div>
        </div>
        <div class="pas">验证码</div>
        <div class="account">
          <van-field
            style="padding:0;line-height: 17px;"
            v-model="code"
            name="code"
            placeholder="请输入验证码"
            :rules="[{ required: true, message: '请输入验证码' }]"
          />
        </div>
        <!-- 密码 -->
        <div class="pas">密码</div>
        <div class="account">
          <van-field
            style="padding:0;line-height: 17px;"
            v-model="password"
            type="password"
            name="password"
            placeholder="请设置新密码"
            :rules="[{ required: true, message: '请输入密码' }]"
          />
        </div>
        <div class="logbtn">
          <van-button
            style="background-color: #f4ca44;border:none;border-radius: 5px;  font-size: 16px;
  color: #3e3e39;"
            round
            block
            type="info"
            native-type="submit"
          >完成</van-button>
        </div>
      </van-form>
    </div>

    <div class="agreement">
      <van-checkbox v-model="checked" icon-size="16px"></van-checkbox>
      <span style="margin-left:10px">我已阅读且同意《用户服务协议》和《隐私协议》</span>
    </div>
  </div>
</template>

<script>
import { authGetback, sendSMS, sendMail } from "@/api/home"; //找回密码的接口
export default {
  props: {
    tochild: Boolean, //邮箱为true
  },
  data() {
    return {
      code: "",
      phone: "",
      email: "",
      password: "",
      checked: false,
      yzmtext: "获取验证码",
      emyztext: "获取验证码",
    };
  },
  created() {},
  methods: {
    closeIcon() {
      this.$emit("close", false);
    },
    onSubmit(values) {
      if (this.tochild) {
        values.checkType = 1;
      } else {
        values.checkType = 0;
      }
      if (this.checked) {
        authGetback(values).then((res) => {
          console.log(res, "res");
          this.$emit("Child", 5);
        });
      } else {
        this.$toast("请阅读相关协议");
      }
    },
    //手机获取验证码
    getyzm() {
      sendSMS({
        phone: this.phone,
        type: 0,
      }).then((res) => {
        if (res.code == 1000) {
          this.btnBool = true;
          let i = 60;
          let timer = setInterval(() => {
            this.yzmtext = i + "s";
            i--;
            if (i < 0) {
              this.btnBool = false;
              this.yzmtext = "获取验证码";
              clearInterval(timer);
            }
          }, 1000);
        }
        console.log(res);
      });
    },
    //邮箱验证码的注册
    getEmail() {
      sendMail({
        to: this.email,
      }).then((res) => {
        if (res.code == 1000) {
          this.btnBool = true;
          let i = 60;
          let timer = setInterval(() => {
            this.emyztext = i + "s";
            i--;
            if (i < 0) {
              this.btnBool = false;
              this.emyztext = "获取验证码";
              clearInterval(timer);
            }
          }, 1000);
        }
        console.log(res);
      });
    },
  },
};
</script>

<style scoped lang="scss">

.top {
  padding: 11px 27px 0 27px;
}
/deep/.van-field__error-message{
  font-size: 0;
}
.TopBtn {
  margin-left: -15px;
  width: 28px;

  height: 28px;
  text-align: center;
  line-height: 28px;
}
.account {
  color: #000;
  display: flex;
  width: 100%;
  height: 45px;
  margin-top: 10px;
  border-bottom: 0.5px solid #e7e7e7;
  padding-top: 10px;
  line-height: 40px;
  box-sizing: border-box;
  font-size: 16px;
}
.TopText2 {
  color: #333;
  font-size: 16px;
  margin-top: 48px;
}
.account-code {
  display: flex;
  color: #262626;
  line-height: 17px;
  width: 70px;
  height: 17px;
  border-right: 1px solid #e7e7e7;
  margin-right: 10px;
}
.Code {
  border-left: 1px solid #e7e7e7;
  width: 200px;
  line-height: 17px;
  height: 17px;
  font-size: 16px;
  color: #000;
  padding-left: 10px;
  box-sizing: border-box;
}
.pas {
  color: #333;
  font-size: 16px;
  margin-top: 25px;
}
.agreement {
  margin-top: 18px;
  display: flex;
  font-size: 12px;
}
.logbtn {
  margin-top: 35px;
  background-color: #f4ca44;
}
.wjpas {
  margin-top: 41px;
  font-size: 24px;
  color: #000;
}
</style>
