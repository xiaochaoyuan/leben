<template>
  <div class="addressBox">
    <addressHeader></addressHeader>
    <addressList></addressList>
  </div>
</template>

<script>
import addressHeader from "./components/addressHeader";
import addressList from "./components/addressList";
export default {
  components: {
    addressHeader,
    addressList
  },

  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.addressBox{
  background-color: #fff;
  min-height: 100vh;
}
</style>