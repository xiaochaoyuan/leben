<template>
  <div class="top">
    <div class="TopBtn">
      <van-icon name="cross" @click="closeIcon" />
    </div>
    <div class="TopText1">
      <span>Hello！欢迎登录</span>
    </div>
    <div class="TopText2" v-if="!phoneLogin">
      <span>手机登录</span>
    </div>
    <div class="TopText2" v-if="!mailboxLogin">
      <span>邮箱登录</span>
    </div>
    <van-form @submit="onSubmit">
      <div class="account" v-if="!phoneLogin">
        <!-- <van-dropdown-menu>
          <van-dropdown-item v-model="value1" :options="option1" />
        </van-dropdown-menu> -->
        <div class="account-code">
          <span style="margin-right:10px">+36</span>
          <div style="margin-right:10px">
            <van-icon name="arrow-down" />
          </div>
        </div>
        <!-- 手机号 -->
        <van-field
          style="padding: 0; line-height: 17px"
          v-model="account"
          name="account"
          placeholder="请输入手机号码"
          :rules="[{ required: true, message: '请输入手机号码' }]"
        />
      </div>
      <div class="account" v-if="!mailboxLogin">
        <van-field
          style="padding: 0; line-height: 17px"
          v-model="account"
          placeholder="请输入邮箱"
          name="account"
          :rules="[{ required: true, message: '请输入邮箱' }]"
        />
      </div>
      <div class="pas">密码</div>
      <div class="account">
        <van-field
          style="padding: 0; line-height: 17px"
          v-model="password"
          name="password"
          type="password"
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
          >登录</van-button
        >
      </div>
    </van-form>
    <div class="switch">
      <div @click="forgetPas">忘记密码</div>
      <div
        v-if="mailboxLogin"
        @click="
          mailboxLogin = false;
          phoneLogin = true;
        "
      >
        邮箱登录
      </div>
      <div
        v-if="phoneLogin"
        @click="
          phoneLogin = false;
          mailboxLogin = true;
        "
      >
        手机号登录
      </div>
    </div>
    <div class="register">还没有乐本账号？</div>
    <div class="registerBtn">
      <van-button
        style="
          background-color: #fff;
          border: 1px solid #333;
          border-radius: 5px;
          font-size: 16px;
          color: #3e3e39;
        "
        round
        block
        type="info"
        native-type="submit"
        @click="toParent"
        >新用户注册</van-button
      >
    </div>
  </div>
</template>

<script>
import { login } from "@/api/home";
export default {
  data() {
    return {
      account: "",
      password: "",
      mailboxLogin: false,
      phoneLogin: true,
      value1: 44,
      option1: [
        { value: "德国", text: 36 },
        { value: "英国", text: 44 },
        { value: "挪威", text: 47 },
        { value: "法国", text: 33 },
        { value: "中国", text: 86 },
        { value: "西班牙", text: 34 },
        { value: "德国", text: 49 },
        { value: "瑞士", text: 41 },
      ],
    };
  },
  methods: {
    //关闭窗口
    closeIcon() {
      this.$emit("close", false);
    },
    toParent() {
      this.$emit("Child", 1);
    },
    forgetPas() {
      this.phoneLogin ? this.$emit("Child", 3) : this.$emit("Child", 4);
    },
    onSubmit(values) {
      login(values).then((res) => {
        if (res.code == 1000) {
          this.$emit("showQuick", true);
          this.$toast.success(res.message);
          sessionStorage.setItem("JWTToken", res.data.authToken);
          sessionStorage.setItem("userId", res.data.loginInfo.userId);
          sessionStorage.setItem("isMember", res.data.loginInfo.isMember);
          // sessionStorage.setItem("active", 0);
        } else {
          this.$toast.fail(res.message);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/.van-field__error-message {
  font-size: 0;
}
.top {
  padding: 11px 27px 0 27px;
}
.TopBtn {
  margin-left: -15px;
  width: 28px;
  height: 28px;
  text-align: center;
  line-height: 28px;
}
.TopText1,
.TopText2,
.pas {
  color: #000;
  margin-top: 81px;
  font-size: 24px;
  font-weight: Regular;
}
.TopText2 {
  color: #333;
  font-size: 16px;
  margin-top: 48px;
}
.account {
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
.account-code {
  display: flex;
  color: #262626;
  line-height: 17px;
  width: 70px;
  height: 17px;
  border-right: 1px solid #e7e7e7;
  margin-right: 15px;
}
.pas {
  color: #333;
  font-size: 16px;
  margin-top: 25px;
}
.logbtn {
  margin-top: 35px;
  background-color: #f4ca44;
}
.registerbtn {
  background-color: #fff;
}
.register {
  color: #aaa;
  margin: 25px auto 21px;
  text-align: center;
}
.switch {
  margin-top: 14px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #616161;
}
</style>
