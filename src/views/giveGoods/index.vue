<template>
  <div class="box">
    <div class="callUser">
      <navHeader :title="title"></navHeader>
      <mapGoole style="width: 100%;height:607px;" class="mapStyle"></mapGoole>
      <infoDetail class="userInfo"></infoDetail>
    </div>
  </div>
</template>

<script>
import navHeader from "@/components/happy/navHeader";
import infoDetail from "./components/infoDetail";
import mapGoole from "@/components/mapGoole";

export default {
  components: {
    navHeader,
    infoDetail,
    mapGoole,
  },

  data() {
    return {
      title: "配送",
    };
  },
};
</script>

<style lang="scss" scoped>
.box {
  .callUser {
    position: relative;
    min-height: 100vh;
    .mapStyle {
      position: absolute;
    }
    .userInfo {
      position: absolute;
      left: 0px;
      bottom: 9px;
    }
  }
}
</style>