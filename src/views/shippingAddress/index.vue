<template>
  <div class="addressBox">
    <div class="searchBox">
      <div class="address">
        成都市
        <van-icon name="arrow-down" color="rgba(62, 58, 57, 1)" />
      </div>
      <div>
        <form action="/">
          <van-search
            v-model="value"
            show-action
            placeholder="请输入配送地址"
            @input="getmapAddeess()"
            @cancel="cancel"
          />
        </form>
      </div>
    </div>
    <!-- 地址的选择列表 -->
    <div v-if="dataList.length > 0">
      <div
        class="list"
        v-for="(item, index) in dataList"
        :key="index"
        @click="$router.push(`/confirmOrder`)"
      >
        <div>
          <div>{{ item.description }}</div>
          <!-- <div class="colorText">{{ item.door }}</div> -->
        </div>
      </div>
    </div>
    <MapGoole
      style="width: 100%; height: 100vh"
      class="mapStyle"
      v-else
    ></MapGoole>
  </div>
</template>

<script>
import { addressList } from "../../api/home";
import { queryautocomplete } from "../../api/map";
import MapGoole from "../../components/mapGoole";

export default {
  components: {
    MapGoole,
  },
  data() {
    return {
      value: "",
      dataList: [],
    };
  },

  methods: {

    getmapAddeess() {
      console.log(this.value);
    if(this.value==''){
      this.dataList=[]
      return
    }
      queryautocomplete({
        input: this.value,
      }).then((res) => {
        console.log("44");
        if (res.status == 200) {
          this.dataList = res.data.predictions;
        }
        console.log(res);
      });
    },
    //取消按钮
    cancel() {
      this.$router.go(-1);
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.addressBox {
  background-color: #fff;
  min-height: 100vh;
  font-size: 14px;
  .address {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 76px;
    font-size: 16px;
    .van-icon {
      margin-left: 5px;
    }
  }
  .searchBox {
    display: flex;
    height: 54px;
    line-height: 54px;
    padding-left: 16px;
    border-bottom: 1px solid #eee;
  }
}

.van-search__content {
  border-radius: 27px;
  width: 231px;
  height: 30px;
}

.van-search .van-cell {
  background-color: rgba(236, 236, 236, 1);
  background-color: red;
  border-radius: 27px;
}
.van-search__action {
  font-size: 16px;
  margin-right: 5px;
}
.list {
  padding: 20px 0;
  margin: 0 16px;
  border-bottom: 1px solid #eee;
}
</style>