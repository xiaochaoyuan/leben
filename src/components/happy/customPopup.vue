<template>
  <div>
    <!-- 弹出层 -->
    <div :class="{'CustomPopup':showCustomPopup}" @click="maskClick"></div>
    <div class="CustomPopupContent" :class="{'CustomPopupContentShow':showCustomPopup}">
      <slot name="PoperContent"></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showCustomPopup: false,
    };
  },
  methods: {
    showCustom() {
      this.showCustomPopup = true;
    },
    maskClick() {
      this.showCustomPopup = false;
      
    },
  },
};
</script>

<style scoped lang="scss">
.CustomPopup {
  height: 100%;
  position: fixed;
  z-index: 1;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  // background: rgba(0, 0, 0, 0.6);
}

.CustomPopupContent {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: all 0.3s ease;
  transform: translateY(100%);
  z-index: 1000;
}
.CustomPopupContentShow {
  transform: translateY(0);
}
</style>
