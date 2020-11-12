<template>
  <div class="addressBox">
    <div @click="$router.push(`/quickAddress`)">
      <div class="icon"></div>
      <!-- <div>从哪里取</div> -->
      <div>从哪里取</div>
    </div>
    <div  @click="$router.push(`/receiptAddress`)">
      <div class="icon yellowColor"></div>
      <div>
        <div>
          送到哪里
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    fromInfoAddress:{
      type:Object
    }
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.addressBox {
  margin: 0 8px;
  height: 163px;
  background-color: #fff;
  margin-top: 10px;
  padding: 0 16px;
  font-size: 16px;
  border-radius: 10px;
  color: rgba(170, 170, 170, 1);

  > div {
    display: flex;
    align-items: center;
    height: 81px;
    line-height: 81px;
    border-bottom: 1px solid #eee;
  }
  > div:nth-child(2) {
    border-bottom:none;

  }
  .icon {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #000;
    margin-right: 14px;
  }
  .yellowColor {
    background-color: rgba(244, 202, 68, 1) !important;

  }
}
</style>