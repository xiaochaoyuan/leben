<template>
  <div class="top">
    <div class="TopBtn">
      <van-icon name="cross" @click="closeIcon" />
    </div>
    <van-tabs
      v-model="active"
      style="margin-top: 40px; color: #000000"
      :animated="true"
    >
      <van-tab title="手机号注册">
        <div style="margin-top: 55px">
          <div class="TopText2">
            <span>手机号码</span>
          </div>
          <van-form @submit="onSubmit">
            <div class="account">
              <div class="account-code">
                <span style="margin-right: 10px">+86</span>
                <div style="margin-right: 10px">
                  <van-icon name="arrow-down" />
                </div>
              </div>
              <van-field
                style="padding: 0; line-height: 17px"
                name="phone"
                v-model="phone"
                placeholder="请输入手机号码"
                :rules="[{ required: true, message: '请输入手机号码' }]"
              />
              <div class="Code" @click="getyzm">
                <span>{{ yzmtext }}</span>
              </div>
            </div>
            <div class="pas">验证码</div>
            <div class="account">
              <van-field
                style="padding: 0; line-height: 17px"
                name="code"
                v-model="code"
                placeholder="请输入验证码"
                :rules="[{ required: true, message: '请输入验证码' }]"
              />
            </div>
            <div class="pas">密码</div>
            <div class="account">
              <van-field
                style="padding: 0; line-height: 17px"
                name="password"
                type="password"
                v-model="password"
                placeholder="请输入密码"
                :rules="[{ required: true, message: '请输入密码' }]"
              />
            </div>
            <div class="logbtn">
              <van-button
                style="
                  background-color: #f4ca44;
                  border: none;
                  border-radius: 5px;
                  font-size: 16px;
                  color: #3e3e39;
                "
                round
                block
                type="info"
                native-type="submit"
              >
                <!--  -->
                下一步
              </van-button>
            </div>
          </van-form>
        </div>
      </van-tab>
      <van-tab title="邮箱注册">
        <div style="margin-top: 55px">
          <div class="TopText2">
            <span>邮箱地址</span>
          </div>
          <van-form @submit="eSubmit">
            <div class="account">
              <van-field
                style="padding: 0; line-height: 17px"
                v-model="email"
                name="email"
                placeholder="请输入邮箱地址"
                :rules="[{ required: true, message: '请输入邮箱地址' }]"
              />
              <div class="Code" @click="getEmail">
                <span>{{ emyztext }}</span>
              </div>
            </div>
            <div class="pas">验证码</div>
            <div class="account">
              <van-field
                style="padding: 0; line-height: 17px"
                v-model="code"
                name="code"
                placeholder="请输入验证码"
                :rules="[{ required: true, message: '请输入验证码' }]"
              />
            </div>
            <div class="pas">密码</div>
            <div class="account">
              <van-field
                style="padding: 0; line-height: 17px"
                v-model="password"
                type="password"
                name="password"
                placeholder="请输入密码"
                :rules="[{ required: true, message: '请输入密码' }]"
              />
            </div>
            <div class="logbtn">
              <van-button
                style="
                  background-color: #f4ca44;
                  border: none;
                  border-radius: 5px;
                  font-size: 16px;
                  color: #3e3e39;
                "
                round
                block
                type="info"
                native-type="submit"
              >
                <!--  -->
                下一步
              </van-button>
            </div>
          </van-form>
        </div>
      </van-tab>
      <van-tab disabled></van-tab>
    </van-tabs>

    <div class="agreement">
      <van-checkbox v-model="checked" icon-size="16px"></van-checkbox>
      <span style="margin-left: 10px"
        >我已阅读且同意《用户服务协议》和《隐私协议》</span
      >
    </div>
  </div>
</template>

<script>
import { authRegister, sendSMS, sendMail } from "@/api/home";
export default {
  data() {
    return {
      active: 0, //0为电话验证,1为邮箱验证
      code: "", //验证码
      password: "", //密码
      email: "", //邮箱地址
      // verification: "", //邮箱的验证码
      phone: "",
      checked: false,
      yzmtext: "获取验证码",
      emyztext: "获取验证码",
      btnBool: false,
    };
  },
  methods: {
    //关闭窗口
    closeIcon() {
      this.$emit("Child", 2);
    },
    //手机号码注册提交
    onSubmit(values) {
      if (this.checked) {
        values.checkType = 0;
        authRegister(values).then((res) => {
          if (res.code == 1000) {
            this.$emit("Child", 2);
            this.$toast("注册成功");
          } else if (res.code == 502) {
            this.$toast("验证码错误");
          } else if (res.code == 503) {
            this.$toast("账户已经被注册了");
          } else {
            this.$toast("注册失败请重新注册");
          }
        });
      } else {
        this.$toast("请阅读相关协议");
      }
    },

    //邮箱提交
    eSubmit(values) {
      if (this.checked) {
        values.checkType = 1;
        authRegister(values).then((res) => {
          if (res.code == 1000) {
            this.$emit("Child", 2);
            this.$toast("注册成功");
          } else if (res.code == 502) {
            this.$toast("验证码错误");
          } else if (res.code == 503) {
            this.$toast("账户已经被注册了");
          } else {
            this.$toast("注册失败请重新注册");
          }
        });
        console.log("submit", values);
      } else {
        this.$toast("请阅读相关协议");
      }
    },
    //手机获取验证码
    getyzm() {
      if (this.phone == "") {
        this.$toast("请输入手机号");
        return;
      } else if (this.yzmtext !== "获取验证码") {
        this.$toast("请稍后再试");
        return;
      }
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
      if (this.email == "") {
        this.$toast("请输入邮箱");
        return;
      } else if (this.emyztext !== "获取验证码") {
        this.$toast("请稍后再试");
        return;
      }
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
/deep/.van-field__error-message {
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
  text-align: center;
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
</style>
<style>
.van-tabs__line {
  background-color: #f4ca44;
}
.van-tab {
  font-size: 18px;
  color: #000;
}
.van-hairline--top-bottom::after,
.van-hairline-unset--top-bottom::after {
  border: none;
}
</style>
