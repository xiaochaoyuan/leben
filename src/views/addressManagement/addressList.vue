<template>
  <div class="addbox">
    <addressHeader></addressHeader>
    <!-- 帮买地址 -->
    <van-swipe-cell v-for="(item, index) in addList" :key="index">
      <div class="chioseAddress">
        <div class="addressBox">
          <div style="width: 310px; word-break: break-all">
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
            @click="$router.push(`/editNewAddress?id=${item.id}&btn=0`)"
          >
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
    <!-- 闪送地址 -->
    <van-swipe-cell v-for="(item, index) in quickList" :key="item.id">
      <div class="chioseAddress">
        <div class="addressBox">
          <div style="width: 310px; word-break: break-all">
            <div class="address">
              {{ item.delivery }}
            </div>
            <div class="info">
              <span>{{ item.name }}</span>
              <span>{{ item.phone }}</span>
            </div>
          </div>
          <div
            class="imgStyle"
            @click="editgo(item.id,item)"
          >
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
import { addressLists, deleteAddress } from "@/api/home";
import addressHeader from "./addressHeader";

export default {
  components: {
    addressHeader,
  },
  data() {
    return {
      addList: [],
      quickList: [],
    };
  },
  methods: {
    editgo(id,info){
     
     this. $router.push({
       path:'/quickEditNewAddress',
       query:{
         ids:id,
         btn:0,
         info:JSON.stringify(info)
       }
     })
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
      addressLists().then((res) => {
        if (res.code == 1000) {
          this.addList = res.data.lists;
          this.quickList = res.data.app;
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
.addbox {
  min-height: 100vh;
  background-color: #fff;
}
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