import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import 'lib-flexible'
import md5 from 'js-md5'
Vue.prototype.$md5 = md5
import LangENUS from './locales/en-us'
import LangZHCN from './locales/zh-cn'
import VueI18n from 'vue-i18n'
Vue.prototype.$axios = axios
Vue.prototype.$imgUrl = 'http://192.168.16.82/'//图片地址
// Vue.prototype.$imgUrl = 'http://8.211.49.242/'//图片地址
import './css/pulic.css'
import './icons/alIcon/icon.css'
import VueClipboard from 'vue-clipboard2'//复制功能
Vue.use(VueClipboard)
Vue.config.productionTip = false
import * as VueGoogleMaps from 'vue2-google-maps' // 谷歌地图
import VueJsonp from 'vue-jsonp'
Vue.prototype.$key = 'AIzaSyAt4GvA-0Agf_M_JuFl6hCj6TYYSzDCqEM'

Vue.use(VueJsonp)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAt4GvA-0Agf_M_JuFl6hCj6TYYSzDCqEM',
    libraries: 'places',
    region: 'VI', // 这个地区自己定
    language: 'zh', // 这个语言自己定
  },
  installComponents: true,
})
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'zh-cn',
  messages: {
    'en-us': LangENUS,
    'zh-cn': LangZHCN,
  },
})
router.beforeEach((to, from, next) => {
  if (to.path === '/quick') {
    next();
  } else {
    let isLogin = sessionStorage.getItem('JWTToken');
    if (isLogin === null || isLogin === '') {
      if (to.path === '/myOrder') {
        next('/quick?id=1')
      } else if (to.path === '/myInfo') {
        next('/quick?id=2')
      } else {
        next('/quick?id=3')
      }
      console.log(to);
      next('/quick')
    } else {
      if (to.meta.title) {
        document.title = to.meta.title
        next();
      }
    }
  }
})
import {
  Button,
  NavBar,
  Tabbar,
  TabbarItem,
  Lazyload,
  Image,
  Icon,
  Tab,
  Tabs,
  List,
  PullRefresh,
  Cell,
  CellGroup,
  Dialog,
  Field,
  Search,
  Collapse,
  CollapseItem,
  Popup,
  DatetimePicker,
  Picker,
  Checkbox,
  CheckboxGroup,
  Divider,
  Radio,
  RadioGroup,
  Uploader,
  ImagePreview,
  NoticeBar,
  Swipe,
  SwipeItem,
  TreeSelect,
  Pagination,
  Toast,
  Step,
  Steps,
  Progress,
  Col,
  Row,
  ActionSheet,
  DropdownMenu,
  DropdownItem,
  Form,
  Notify,
  Stepper,
  SwipeCell,
  Sticky ,
  Empty 
} from 'vant'

Vue.config.productionTip = false
Vue.use(Button)
  .use(NavBar)
  .use(TabbarItem)
  .use(Tabbar)
  .use(Lazyload)
  .use(Image)
  .use(Icon)
  .use(Tab)
  .use(Tabs)
  .use(List)
  .use(PullRefresh)
  .use(Cell)
  .use(CellGroup)
  .use(Dialog)
  .use(Field)
  .use(Search)
  .use(Collapse)
  .use(CollapseItem)
  .use(Popup)
  .use(DatetimePicker)
  .use(Picker)
  .use(CheckboxGroup)
  .use(Checkbox)
  .use(Divider)
  .use(RadioGroup)
  .use(Radio)
  .use(Uploader)
  .use(ImagePreview)
  .use(NoticeBar)
  .use(Swipe)
  .use(SwipeItem)
  .use(Notify)
  .use(Form)
  .use(Stepper)
  .use(SwipeCell)
Vue.use(TreeSelect)
Vue.use(Pagination)
Vue.use(Toast)
Vue.use(Step)
Vue.use(Steps)
Vue.use(Progress)
Vue.use(Col)
Vue.use(Row)
Vue.use(ActionSheet)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Sticky);
Vue.use(Empty);

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app')
