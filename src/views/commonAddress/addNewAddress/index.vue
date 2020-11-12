<template>
  <div class="addNewBox">
      <newAddressHeader></newAddressHeader>
      <addressInfo></addressInfo>
  </div>
</template>

<script>
import newAddressHeader from "./components/newAddressHeader";
import addressInfo from "./components/addressInfo";
export default {
  components: {
    newAddressHeader,
    addressInfo
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>

</style>