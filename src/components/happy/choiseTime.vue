<template>
  <div>
    <van-popup v-model="timeShow" position="bottom" round :style="{ height: '40%' }">
      <van-picker
        ref="choiseTime"
        show-toolbar
        title="取件时间"
        :columns="columns"
        @cancel="timeShow = false"
        @confirm="confirmStatus"
        @change="changeTime"
      />
    </van-popup>
  </div>
</template>

<script>
import { getDate } from "@/assets/js/up";
export default {
  props: ["showTime", "timeStatus"],

  data() {
    return {
      timeShow: false,
      sss: ["", "00", "10", "20", "30", "40", "50"],
      mmm: [
        "立即帮买",
        "00",
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
      ],
      columns: [
        // 第一列
        {
          values: ["", "今天", "明天"],
          defaultIndex: 0,
        },
        // 第二列
        {
          values: [
            "立即帮买",
            "00",
            "01",
            "02",
            "03",
            "04",
            "05",
            "06",
            "07",
            "08",
            "09",
            "10",
            "11",
            "12",
            "13",
            "14",
            "15",
            "16",
            "17",
            "18",
            "19",
            "20",
            "21",
            "22",
            "23",
          ],
          defaultIndex: 0,
        },
        {
          values: ["", "00", "10", "20", "30", "40", "50"],
          defaultIndex: 0,
        },
      ],
    };
  },
  watch: {
    showTime(val) {
      if (val) {
        let time = getDate(Date.parse(new Date()));
        let s = time.slice(11, 13); //小时
        let m = time.slice(14, 16); //分钟
        let arr = this.columns[1].values;
        let arrs = this.columns[2].values;
        let newArr = []; //时
        let newS = []; //分
        arr.forEach((item, index) => {
          if (m > 50) {
            if (item > s + 1) {
              newArr.push(item);
            }
          } else {
            if (item >= s) {
              newArr.push(item);
            }
          }
        });
        arrs.forEach((item, index) => {
          if (item > m) {
            newS.push(item);
          }
        });
        newS.unshift("");
        this.columns[1].values = newArr;
        this.columns[2].values = newS;
        this.timeShow = true;
      }
      console.log(val);
    },
  },
  methods: {
    confirmStatus(e) {
      console.log(e);
      this.$emit("buyTime", e);
      this.timeShow = false;
      e = "";
    },
    changeTime(picker, values) {
      console.log(values[1]);
      let time = getDate(Date.parse(new Date()));
      let s = time.slice(11, 13); //小时
      let m = time.slice(14, 16); //分钟
      let arrs = this.columns[2].values;
      let newS = []; //分
      if (values[0] == "明天") {
        this.columns[1].values = this.mmm;
        this.columns[2].values = this.sss;
      } else {
        if (values[1] > s) {
          this.columns[2].values = this.sss; //分钟数大于选的时间
        } else {
          arrs.forEach((item) => {
            if (item > m) {
              newS.push(item);
            }
          });
          this.columns[2].values = newS;
        }
      }

      // let s = values[1]; //小时
      // let m = values[2]; //分钟
    },
  },
  activated() {
    // console.log(this.timeStatus);
    this.columns[1].values[0] = this.timeStatus;
  },
};
</script>

<style lang="scss" scoped>
</style>