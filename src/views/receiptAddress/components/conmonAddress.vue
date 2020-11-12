<template>
  <div>
    <div class="addtitle">常用地址</div>
    <van-swipe-cell v-for="(item, index) in addressInfo" :key="index">
      <div class="chioseAddress">
        <div class="addressBox">
          <div style="width: 90%" @click="choiseAddress(item)">
            <div class="address">{{ item.delivery }}</div>
            <div class="info">
              <span>{{ item.name }}</span>
              <span>{{ item.phone }}</span>
            </div>
          </div>
          <div class="imgStyle" @click="editAddress(item.id, item)">
            <img src="@/assets/icon/home/edit.png" alt />
          </div>
        </div>
      </div>
      <template #right>
        <van-button
          square
          type="danger"
          text="删除"
          @click="delAdderss(item.id)"
        />
      </template>
    </van-swipe-cell>
  </div>
</template>
<script>
export default {
  props: {
    addressInfo: {
      type: Array,
    },
  },
  data() {
    return {};
  },
  methods: {
    //选中的地址
    choiseAddress(info) {
      console.log(info);
      let obj = {};
      obj.shipAddress = info.delivery;
      obj.shipName = info.name;
      obj.shipPhone = info.phone;
      console.log(obj,'obj');
      this.$store.commit("quickFromAds", obj);
      console.log(this.$store.state.quickFromAds,'555');
      this.$router.push({
        path: "confirmOrder",
      });
      // this.$router.push({
      //   path: "confirmOrder",
      //   query: {
      //     fromInfo: JSON.stringify(info),
      //   },
      // });
    },
    //删除数据
    delAdderss(id) {
      this.$emit("deleteAddress", id);
    },
    //编辑数据
    editAddress(id, val) {
      this.$router.push({
        path: "quickEditNewAddress",
        query: {
          ids: id,
          type: 1,
          info: JSON.stringify(val),
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/.van-button {
  height: 64px;
}
.addtitle {
  font-size: 18px;
  font-weight: 550;
  margin: 13px 16px 6px;
}
.chioseAddress {
  .addressBox {
    position: relative;
    margin: 0 16px;
    border-bottom: 1px solid #eee;
    padding: 10px 0;

    .address {
      font-size: 14px;
      font-weight: 550;
    }
    .info {
      margin-top: 4px;
      font-size: 16px;
      color: rgba(153, 153, 153, 1);
      span:nth-child(2) {
        padding: 0 10px;
      }
    }
    .imgStyle {
      position: absolute;
      right: 0;
      top: 25px;
      width: 20px;
      height: 20px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>