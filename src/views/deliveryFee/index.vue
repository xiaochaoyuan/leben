<template>
  <div class="freeBox">
        <navHeader :title="title"></navHeader>
      <feeList/>
  </div>
</template>

<script>

import feeList from "./components/feeList";
  
import navHeader from "@/components/happy/navHeader";
export default {
  components: {
    navHeader,
    feeList
  },
  data() {
    return {
      title:'配送费明细'

    };
  },
};
</script>

<style lang="scss" scoped>
.freeBox{
    background-color: #fff;
    min-height: 100vh;
   font-size: 14px;


}
</style>