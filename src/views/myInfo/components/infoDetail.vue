<template>
  <div class="infoBox">
    <div>
      <div class="imgBox">
        <img :src="$imgUrl + info.headImg" alt v-if="info.headImg" />
        <img src="@/assets/icon/myInfo/userImg.png" v-else alt />
      </div>
      <div>
        {{ info.username }}
        <div>用户ID{{ info.id }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      define: Object,
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.infoBox {
  padding-top: 71px;
  > div {
    display: flex;
    align-items: center;
    height: 58px;
    border-bottom: 1px solid #ddd;
    padding-bottom: 20px;
    > div:nth-child(1) {
      padding-right: 5px;
    }
    > div:nth-child(2) {
      font-size: 18px;
      > div {
        font-size: 12px;
        margin-top: 4px;
      }
    }
  }
}
.imgBox{
img{
    width: 76px;
  height: 76px;
  border-radius: 50%;
}
}
</style>