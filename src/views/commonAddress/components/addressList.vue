<template>
  <div>
    <van-swipe-cell v-for="(item, index) in addList" :key="index">
      <div class="chioseAddress">
        <div class="addressBox">
          <div
            style="width: 310px; word-break: break-all"
            @click="choiseAddress(item)"
          >
            <div class="address">
              {{ item.cityName }}{{ item.street }}{{ item.door }}
            </div>
            <div class="info">
              <span>{{ item.userName }}</span>
              <span>{{ item.email }}</span>
              <span>{{ item.phone }}</span>
            </div>
          </div>
          <div
            class="imgStyle"
            @click="$router.push(`/editNewAddress?id=${item.id}`)"
          >
            <img src="../../../assets/icon/home/edit.png" alt />
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
import { addressList, deleteAddress } from "@/api/home";

export default {
  data() {
    return {
      addList: [],
    };
  },
  methods: {
    //选择的地址
    choiseAddress(info) {
      let obj = {};
      obj.shipAddress =info.cityName + info.street + info.door
      obj.shipName =info.username || info.userName;
      obj.shipPhone = info.phone;
      this.$store.commit("helpFromAds", obj);
      this.$router.push({
        path: "/downOrder",
      });
    },
    //删除数据
    delAdderss(id) {
      this.$dialog
        .confirm({
          title: "提示",
          message: "删除后数据不可恢复是否确认?",
        })
        .then(() => {
          let data = new FormData();
          data.append("id", id);
          deleteAddress(data).then((res) => {
            if (res.code == 1000) {
              this.getAddressList();
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    //获取数据列表
    getAddressList() {
      addressList().then((res) => {
        if (res.code == 1000) {
          this.addList = res.data.lists;
        }
      });
    },
  },
  activated() {
    this.getAddressList();
  },
};
</script>

<style lang="scss" scoped>
/deep/.van-button {
  height: 65px;
}
/deep/.van-swipe-cell__right {
  right: -1 !important;
}
.chioseAddress {
  .addressBox {
    position: relative;
    margin: 0 16px;
    border-bottom: 1px solid #eee;
    padding: 10px 0;

    .address {
      font-size: 16px;
      font-weight: 550;
    }
    .info {
      margin-top: 4px;
      color: rgba(153, 153, 153, 1);
      word-wrap: break-word;
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