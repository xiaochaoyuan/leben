<template>
  <div class="remarksBox">
    <div class="topFun">
      <van-icon
        name="arrow-left"
        size="20"
        class="iconLeft"
        color="rgba(63, 59, 58, 1)"
        @click="$router.go(-1)"
      />
      <div>意见反馈</div>
      <div class="submit" @click="subOpinion()">提交</div>
    </div>
    <div>
      <van-field
        v-model="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="100"
        placeholder="请输入您的意见，我们将认真阅读并尽快与您取得联系"
      />
    </div>
  </div>
</template>

<script>
import { addOpinion } from "@/api/home";
export default {
  data() {
    return {
      message: "",
    };
  },
  methods: {
    subOpinion() {
      addOpinion({
        feedback: this.message,
      }).then((res) => {
        if (res.code == 1000) {
          this.$toast.success("反馈成功");
          this.$router.push(`/myInfo`);
          this.message = "";
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/.van-field__control {
  font-size: 16px;
  &::-webkit-input-placeholder {
    color: rgba(146, 146, 146, 1);
  }
}
.remarksBox {
  position: relative;
  background-color: #fff;
  min-height: 100vh;
}
.topFun {
  position: relative;
  display: flex;
  height: 57px;
  line-height: 57px;
  background-color: #fff;
  font-size: 18px;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  border-bottom: 1px solid rgba(236, 236, 236, 1);
  .submit {
    font-size: 16px;
  }
}
</style>


