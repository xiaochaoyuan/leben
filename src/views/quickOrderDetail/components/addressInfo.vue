<template>
  <div class="addressInfoBox" :class="{'mt':status==1||status==5}">
    <div>
      <div class="icon"></div>
      <div>
        {{address.pickupAddress}}
        <div class="telInfo">
          <span>{{address.pickupName}}</span>
          {{address.pickupPhone}}
        </div>
      </div>
    </div>
    <div>
      <div class="icon yellowColor"></div>
      <div>
        <div>
          {{address.shipAddress}}
          <div class="telInfo">
            <span>{{address.shipName}}</span>
            {{address.shipPhone}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    address: {
      define: Object,
    },
    status:{
      define:String
    }
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.mt{
  margin-top: 10px!important;
  
}
.addressInfoBox {
  
  margin: 0 16px;
  height: 168px;
  background-color: #fff;
  margin-top: 50px;
  font-weight: 550;
  padding: 0 16px;
  font-size: 16px;
  border-radius: 10px;
  > div:nth-child(1) {
    display: flex;
    align-items: center;
    height: 83px;
    border-bottom: 1px solid #ddd;

    .telInfo {
      font-size: 14px;
      color: rgba(170, 170, 170, 1);
      padding-top: 7px;
      > span {
        padding-right: 10px;
      }
    }
  }
  > div:nth-child(2) {
    display: flex;
    padding-top: 20px;
    .telInfo {
      font-size: 14px;
      color: rgba(170, 170, 170, 1);
      padding-top: 7px;
      > span {
        padding-right: 10px;
      }
    }
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
    margin-top: 5px;
  }
}
</style>
