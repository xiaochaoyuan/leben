<template>
  <gmap-map
    :center="centers"
    :zoom="15"
    style="width: 300px; height: 300px"
    @click="updateMaker"
  >
    <gmap-marker
      :position="position"
      :draggable="true"
      @dragend="updateMaker"
    />
  </gmap-map>
</template>
<script>
import axios from "axios";
import { gmapApi } from "vue2-google-maps";

export default {
  props: {
    position: {
      type: Object,
      default: () => {
        return {
          lat: 30.716175,
          lng: 103.990967,
        };
      },
    },
  },
  data() {
    return {
      place: null,
      // mapTypeId:google.maps.MapTypeId.ROADMAP,
      latitude: null, //经度
      longitude: null, //纬度
    };
  },
  computed: {
    google: gmapApi, // 获取官方的OBject 使用官方API的时候可以用
    centers() {
      return {
        lat: this.position.lat,
        lng: this.position.lng,
      };
    },
  },
  beforeMount() {
    // console.log( this.latitude);
    // this.position.lat = this.latitude;
    // this.position.lng = this.longitude;
  },
  created() {
    navigator.geolocation.getCurrentPosition(function (pos, error) {
      if (!navigator.geolocation) throw "geolocation not support";
      this.latitude = pos.coords.latitude;
      this.longitude = pos.coords.longitude;
      var accuracy = pos.coords.accuracy;

      console.log(
        "当前位置：经度：" +
          latitude +
          " 纬度：" +
          longitude +
          " 精度：" +
          accuracy
      );
    });
  },
  mounted() {},
  methods: {
    updateMaker: function (event) {
      console.log("updateMaker, ", event.latLng.lat(), event.latLng.lng());
      this.position = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      console.log([this.position.lat, this.position.lng]);
      this.pointToAddress(
        this.position.lat,
        this.position.lng,
        this.pushAddress
      );
    },
    pushAddress(res) {
      this.$emit("mark", res, this.position);
    },
    pointToAddress(lat, lng, backcall) {
      // 实例化Geocoder服务用于解析地址
      var geocoder = new this.google.maps.Geocoder();
      // 地理反解析
      geocoder.geocode(
        { location: new this.google.maps.LatLng(lat, lng) },
        function geoResults(results, status) {
          if (status === this.google.maps.GeocoderStatus.OK) {
            backcall(results[0].formatted_address);
          } else {
            console.log("：error " + status);
          }
        }
      );
    },
  },
};
</script>
<style lang="scss" scoped></style>
