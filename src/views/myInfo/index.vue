<template>
  <div class="container">
    <InfoDetail :info="info"></InfoDetail>
    <ItemInfo></ItemInfo>
  </div>
</template>

<script>
import InfoDetail from "./components/infoDetail";
import ItemInfo from "./components/itemInfo";
import { userDetail } from "@/api/home";
export default {
  components: {
    InfoDetail,
    ItemInfo,
  },

  data() {
    return {
      info:{
        username:'',
        headImg:'',
        id:'',
      },
    };
  },
  methods:{
    getUserDetail(){
      userDetail().then(res=>{
       if(res.code==1000){
         Object.keys(this.info).forEach(keys=>{
           this.info[keys]=res.data[keys]
         })
       }
      })

    }
  },
  mounted(){
    this.getUserDetail()
  }

};
</script>

<style lang="scss" scoped>
.container {
  background-color: #fff;
  min-height: 100vh;
  padding: 0 22px 0 25px;
}
</style>