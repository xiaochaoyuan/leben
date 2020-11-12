import Vue from 'vue'
import { debounce } from './utils'
// 防抖自定义指令
Vue.directive('debounce', {
  bind (el, binding) {
    const executeFunction = debounce(binding.value, 5000)
    el.addEventListener('click', executeFunction)
  }
})
