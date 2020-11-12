<template>
  <div class="myOrderHeader">
    <div>
      <div class="addClass">闪送</div>
      <div @click="help()">帮买</div>
      <img src="@/assets/icon/home/service.png"   @click="$router.push(`/contactPeople`)" alt />
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
            <itemList :dataList="dataList" @refresh="refresh"></itemList>
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
            <itemList :dataList="dataList" @refresh="refresh"></itemList>
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
            <itemList :dataList="dataList" @refresh="refresh"></itemList>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import itemList from "./itemList";
import { queryBuyOrderList } from "@/api/home";

export default {
  components: {
    itemList,
  },
  data() {
    return {
      isLoading: false,
      loading: false,
      finished: false,
      activeName: "0",
      dataList: [],
      list: [],
      total: null, //总数
      form: {
        currentPage: 1, //当前页
        orderStatus: 0, //0全部,1进行中,2已完成
        pageSize: 10, //每页数据
        type: 4, //3帮买，4闪送
      },
    };
  },
  methods: {
    help() {
      this.$router.push("/myOrder");
      sessionStorage.setItem("status", 1);
    },
    //刷新列表
    refresh() {
      this.dataList = [];
      this.form.currentPage = 1;
      this.getQueryBuyOrderList();
    },
    onRefresh() {
      setTimeout(() => {
        // this.$toast("刷新成功");
        this.form.currentPage = 1;
        this.getQueryBuyOrderList();
        this.dataList = [];
      }, 1000);
    },
    //下拉刷新
    onLoad() {
      setTimeout(() => {
        // 异步更新数据
        this.form.currentPage++;
        this.loading = false;
        this.getQueryBuyOrderList();
        if (this.total >= this.dataList.length) {
          this.finished = true;
        }
      }, 2000);
    },
    choiseType() {
      this.form.orderStatus = this.activeName;
      this.getQueryBuyOrderList();
      this.form.currentPage = 1;
      this.dataList = [];
    },
    //获取订单详情
    getQueryBuyOrderList() {
      console.log("444444");
      queryBuyOrderList(this.form).then((res) => {
        if (res.code == 1000) {
          this.isLoading = false;
          this.total = res.data.total;
          this.dataList = this.dataList.concat(res.data.records);
          // this.dataList = res.data.records;
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
  width: 0px !important;
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