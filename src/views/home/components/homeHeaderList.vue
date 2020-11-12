<template>
  <div>
    <div class="typeBox">
      <div
        class="typeBoxItem"
        v-for="item in goodsList"
        :key="item.id"
        @click="goMai(item.typeNameGer)"
      >
        <img :src="$imgUrl + item.image" alt />
        <div>{{ item.typeNameGer }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { systemTypeList } from "@/api/home";

export default {
  name: "homeHeaderList",
  data() {
    return {
      goodsList: [],
    };
  },
  methods: {
    goMai(info) {
      this.$router.push({
        path: "/downOrder",
        query: {
          goods: info,
        },
      });
    },
    getSystemTypeList() {
      systemTypeList({
        type: 2,
      }).then((res) => {
        if (res.code == 1000) {
          this.goodsList = res.data;
          console.log(res.data);
        }
      });
    },
  },
  activated() {
    this.getSystemTypeList();
  },
};
</script>

<style scoped lang="scss">
.typeBox {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .typeBoxItem {
    text-align: center;
    width: 25%;
    padding: 19px 0;
    box-sizing: border-box;

    img {
      width: 32px;
      height: 32px;
      margin-bottom: 7px;
    }
  }
}
</style>