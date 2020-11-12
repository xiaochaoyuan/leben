<template>
  <div id="home-warp">
    <!-- 头部 -->
    <topBar></topBar>
    <home-header />
    <div>
      <van-divider
        :style="{
          color: 'rgba(23, 1, 6, 1)',
          borderColor: '#ccc',
          padding: '0 16px',
        }"
      >
        <span class="fs16">乐本帮买特色</span>
      </van-divider>
    </div>
    <home-box />
  </div>
</template>
<script>
import topBar from "../../components/happy/topBar";
import HomeHeader from "./components/homeHeader";
import HomeBox from "./components/homeBox";
import HomeFooter from "@/components/happy/homeFooter";
export default {
  name: "home",
  components: { HomeFooter, HomeBox, HomeHeader, topBar },
  data() {
    return {
      goodsList: [],
    };
  },
  methods: {},
};
</script>

<style scoped lang="scss">
#home-warp {
  height: 100vh;
  background-color: #fff;
}
</style>