import Vue from 'vue'
import Vuex from 'vuex'
import {state,mutations, actions,getters} from './modules/app'

Vue.use(Vuex)

const store =  new Vuex.Store({
  namespaced:true,
  modules: {
    app
  },
  state,
  actions,
  mutations,
  getters
})
export default store