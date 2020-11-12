<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
    <div class="footer">
      <HomeFooter v-if="$route.meta.showTab"></HomeFooter>
    </div>
  </div>
</template>
<script>
import HomeFooter from "./components/happy/homeFooter";
export default {
  components: {
    HomeFooter,
  },
  data() {
    return {};
  },
  
};
</script>

<style lang="scss">
#app {
  background: rgba(248, 248, 248, 1);
  font-size: 14px;
  min-width: 320px;
  height: 100%;
  position: relative;
}
.home-footer-warp[data-v-42e25979] .van-tabbar[data-v-42e25979] {
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translate(-50%);
}

.van-search .van-cell {
  background-color: #f7f8fa !important;
}
* {
  margin: 0;
  padding: 0;
}
/deep/.van-field__control {
  background-color: #fff !important;
}
// .van-popup--bottom {
//   bottom: 0;
//   left: 0;
//   /* width: 100%; */
//   position: absolute;
// }
// html,body{
//     width: 100%;
//     height: 100%;
//     position: absolute;
//     left: 0;top: 0;
//     overflow: hidden;
//     overflow-y: auto;
//     background-color: #f5f5f5;
//     &::-webkit-scrollbar{width:0px}
// }
</style>
