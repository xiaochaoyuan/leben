<template>
  <div class="addNewBox">
      <newAddressHeader></newAddressHeader>
      <editAddressInfo></editAddressInfo>
  </div>
</template>

<script>
import newAddressHeader from "./components/newAddressHeader";
import editAddressInfo from "./components/editAddressInfo";
export default {
  components: {
    newAddressHeader,
    editAddressInfo
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>

</style>