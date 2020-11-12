<template>
  <div class="myOrderHeader">
    <div>
      <div @click="shan">闪送</div>
      <div class="addClass">帮买</div>
      <img src="@/assets/icon/home/service.png" alt  @click="$router.push(`/contactPeople`)"/>
    </div>
    <van-tabs v-model="activeName" @click="choiseType()">
      <van-tab title="全部" name="0">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :immediate-check="false"
          >
            <ItemList :dataList="dataList" @refresh="refresh"></ItemList>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="进行中" name="1">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :immediate-check="false"
          >
            <ItemList :dataList="dataList" @refresh="refresh"></ItemList>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="已完成" name="2">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :immediate-check="false"
          >
            <ItemList :dataList="dataList" @refresh="refresh"></ItemList>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import ItemList from "./itemList";
import { queryBuyOrderList } from "@/api/home";

export default {
  components: {
    ItemList,
  },
  data() {
    return {
      loading: false,
      finished: false,
      activeName: "0",
      count: 0,
      isLoading: false,
      dataList: [],
      total: null, //总数

      form: {
        currentPage: 1, //当前页
        orderStatus: 0, //0全部,1进行中,2已完成
        pageSize: 10, //每页数据
        type: 3, //3帮买，4闪送
      },
    };
  },
  methods: {
    shan(){
      this.$router.push('/quickMyOrder')
      sessionStorage.setItem('status',0)
    },
    //下拉刷新
    onLoad() {
      setTimeout(() => {
        // 异步更新数据
        this.form.currentPage++;
        this.loading = false;
        this.getQueryBuyOrderList();
        if (this.total >= this.dataList.length) {
          console.log("444");

          this.finished = true;
        }
      }, 2000);
    },
    //刷新列表
    refresh() {
      this.dataList = [];
      this.form.currentPage = 1;
      this.getQueryBuyOrderList();
    },
    choiseType() {
      this.form.orderStatus = this.activeName;
      this.getQueryBuyOrderList();
      this.form.currentPage = 1;
      this.dataList = [];
    },
    onRefresh() {
      setTimeout(() => {
        // this.$toast("刷新成功");
        this.form.currentPage = 1;
        this.getQueryBuyOrderList();
        this.dataList = [];
      }, 1000);
    },
    //获取订单详情
    getQueryBuyOrderList() {
      queryBuyOrderList(this.form).then((res) => {
        if (res.code == 1000) {
          this.isLoading = false;
          this.dataList = this.dataList.concat(res.data.records);
          this.total = res.data.total;
        }
      });
    },
  },
  activated() {
    this.dataList = [];
    this.form.currentPage = 1;
    this.getQueryBuyOrderList();
  },
};
</script>

<style lang="scss" scoped>
/deep/.van-tabs {
  margin-bottom: 50px;
}
/deep/.van-tab--active {
  color: rgba(244, 202, 68, 1);
}
/deep/.van-tabs__line {
  background-color: rgba(244, 202, 68, 1);
}
/deep/.van-tabs__line {
  width: 45px !important;
}
/deep/.van-hairline--top-bottom::after {
  border-width: 0;
}
.myOrderHeader {
  > div:nth-child(1) {
    display: flex;
    justify-content: center;
    position: relative;
    > div {
      width: 36px;
      height: 47px;
      margin: 0 16px;
    }
    font-size: 18px;
    background-color: #fff;
    height: 60px;
    line-height: 60px;

    img {
      position: absolute;
      top: 14px;
      right: 16px;
      width: 24px;
      height: 24px;
    }
  }
  .addClass {
    border-bottom: 3px solid rgba(245, 146, 1, 1);
  }
}
</style>