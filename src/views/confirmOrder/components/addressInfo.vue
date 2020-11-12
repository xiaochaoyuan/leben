<template>
  <div class="addressBox boxShadow">
    <div @click="$router.push(`/quickAddress`)">
      <div class="icon"></div>
      <div>
        <div
          class="addressChoise"
          v-if="!$store.state.quickgoAds.pickupAddress"
        >
          从哪里取
        </div>
        <div v-else>
          <!-- {{$store.state.quickgoAds.pickupAddress}} -->{{ pickupAddress }}
          <div class="colorText fs16">
            {{ $store.state.quickgoAds.pickupName }}
            {{ $store.state.quickgoAds.pickupPhone }}
          </div>
        </div>
      </div>
    </div>
    <div @click="$router.push(`/receiptAddress`)">
      <div class="icon yellowColor"></div>
      <div style="border-bottom: none">
        <div
          class="addressChoise"
          v-if="!$store.state.quickFromAds.shipAddress"
        >
          送到哪里
        </div>
        <div v-else>
          {{ shipAddress }}
          <div class="colorText fs16">
            {{ $store.state.quickFromAds.shipName
            }}{{ $store.state.quickFromAds.shipPhone }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { maplocation } from "../../../api/map";

export default {
  data() {
    return {
      msg: "",
    };
  },
  computed: {
    pickupAddress() {
      console.log("触发了");

      return this.$store.state.quickgoAds.pickupAddress;
    },
    shipAddress() {
      return this.$store.state.quickFromAds.shipAddress;
    },
  },
  mounted() {
    console.log(this.$key);
  },
  watch: {
    //深度监听
    pickupAddress: {
      handler(newName, oldName) {
        let ads = this.$store.state.quickgoAds.pickupAddress;
        maplocation({
          address: ads,
        }).then((res) => {
          if (res.status == 200 && res.data.results.length > 0) {
            let pickupLat = res.data.results[0].geometry.location.lat;
            let pickuplng = res.data.results[0].geometry.location.lng;
            this.$emit("changepickupAddress", 1, pickupLat, pickuplng);
          }
        });
      },
      immediate: true,
      deep: true,
    },
    shipAddress: {
      handler(newName, oldName) {
        let ads = this.$store.state.quickFromAds.shipAddress;
        maplocation({
          address: ads,
        }).then((res) => {
          if (res.status == 200 && res.data.results.length > 0) {
            let shipLat = res.data.results[0].geometry.location.lat;
            let shiplng = res.data.results[0].geometry.location.lng;
            this.$emit("shipAddressAddress", 1, shipLat, shiplng);
            console.log("谷歌地图2");
          }
        });
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.addressBox {
  margin: 0 16px;
  background-color: #fff;
  padding: 0 16px;
  font-size: 14px;
  border-radius: 5px;
  > div {
    display: flex;
    align-items: center;
    height: 40px;
    border-bottom: 1px solid #eee;
    padding: 18px 0;
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
  .addressChoise {
    font-size: 16px;
    color: #aaa;
  }
}
</style>