<template>
  <div class="container">
    <login v-if="childVal" @Child="getChild" @showQuick="goQuick" @close="closeWindow"></login>
    <Registration v-if="childCode" @Child="getChild" @close="closeWindow"></Registration>
    <Forget v-if="childPas" :tochild="isphone" @Child="getChild" @close="closeWindow"></Forget>
  </div>
</template>
<script>
import login from './components/login'
import Registration from './components/AccountRegistration'
import Forget from './components/ForgetThePassword'
export default {
  components: {
    login,
    Registration,
    Forget,
  },
  data() {
    return {
      childVal: true,
      childCode: false,
      childPas: false,
      isphone: true,
    }
  },
  methods: {
    //关闭按钮
    closeWindow(status){
      this.$emit('closeStatus',status)

    },
    goQuick(status){
      this.$emit('quickStatus',status)
    },
    getChild(v) {
      console.log(v)
      if (v === 1) {
        this.childVal = false
        this.childCode = true
      } else if (v === 2 || v === 5) {
        this.childCode = false
        this.childPas = false
        this.childVal = true
      } else if (v === 3) {
        this.isphone = true
        this.childVal = false
        this.childPas = true
      } else if (v === 4) {
        this.isphone = false
        this.childVal = false
        this.childPas = true
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  background-color: #fff;
  position: absolute;
  width: 100vw;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  font-family: 'Source Han Sans CN';
  z-index: 999;
}
</style>
