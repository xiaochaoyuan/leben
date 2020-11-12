import Vue from 'vue'
import VueRouter from 'vue-router'
//-----------------------
const downOrder = () => import('views/downOrder/index') //确定下单
const shippingAddress = () => import('views/shippingAddress/index') //确定下单
const home = () => import('views/home/home.vue') //主页
const coupon = () => import('views/coupon/index') //优惠劵
const deliveryFee = () => import('views/deliveryFee/index') //配送费
const commonAddress = () => import('views/commonAddress/index') //常用地址
const editNewAddress = () => import('views/commonAddress/editNewAddress/index') //帮买编辑地址
const quickEditNewAddress = () => import('views/commonAddress/quickEditNewAddress/index') //闪送编辑地址
const addNewAddress = () => import('views/commonAddress/addNewAddress/index') //新增地址
const editRemarks = () => import('views/downOrder/components/editRemarks') //填写帮买备注
const quickeditRemarks = () => import('views/confirmOrder/components/quickEditRemarks') //填写闪送备注
const paywaiting = () => import('views/payStatus/paywaiting/index') //支付等待
const paymenting = () => import('views/payStatus/paymenting/index') //支付完成
const payError = () => import('views/payStatus/payError/index') //支付失败
const orderDetail = () => import('views/orderDetail/index') //订单详情
const myOrder = () => import('views/myOrder/index') //我的订单
const myInfo = () => import('views/myInfo/index') //我的
const feedback = () => import('views/myInfo/components/feedback') //意见反馈
const contactPeople = () => import('views/myInfo/components/contactPeople') //联系客户
const quick = () => import('views/quick/index') //闪送
const quickAddress = () => import('views/quickAddress/index') //取件地址
const receiptAddress = () => import('views/receiptAddress/index') //收件地址
const confirmOrder = () => import('views/confirmOrder/index') //闪送确认订单
const quickMyOrder = () => import('views/quickMyOrder/index') //闪送我的订单
const quickOrderDetail = () => import('views/quickOrderDetail/index') //闪送我的订单详情
const quickDeliveryFee = () => import('views/quickDeliveryFee/index') //闪送计价详情
const giveGoods = () => import('views/giveGoods/index') //闪送计价详情
const login = () => import('views/login/index') //登录
const payGateWay = () => import('views/payGateWay/payGateWay') //支付界面
const addressManagement = () => import('views/addressManagement/addressList') //支付界面
const xinyongCard = () => import('views/xinyongpay/clientSecret') //信用卡支付

//-----------------------

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/quick',
  },
  {
    name: 'home',
    path: '/home',
    component: home,
    meta: {
      title: '乐本',
      showTab: true,
    },
  },
  // ------------------------------
  {
    name: 'downorder',
    path: '/downOrder',
    component: downOrder,
    meta: {
      title: '确认下单',
      showTab: false,
    },
  },
  {
    name: 'login',
    path: '/login',
    component: login,
    meta: {
      title: '登录',
      showTab: false,
    },
  },
  //------------------------------Shipping addresscoupon
  {
    name: 'shippingaddress',
    path: '/shippingAddress',
    component: shippingAddress,
    meta: {
      title: '选择配送地址',
      showTab: false,
    },
  },
  {
    name: 'addressManagement',
    path: '/addressManagement',
    component: addressManagement,
    meta: {
      title: '地址管理',
      showTab: false,
    },
  },
  
  {
    name: 'coupon',
    path: '/coupon',
    component: coupon,
    meta: {
      title: '优惠劵',
      showTab: false,
    },
  },
  {
    name: 'deliveryFee',
    path: '/deliveryFee',
    component: deliveryFee,
    meta: {
      title: '计价说明',
      showTab: false,
    },
  },
  {
    name: 'commonAddress',
    path: '/commonAddress',
    component: commonAddress,
    meta: {
      title: '常用地址',
      showTab: false,
    },
  },
  {
    name: 'addNewAddress',
    path: '/addNewAddress',
    component: addNewAddress,
    meta: {
      title: '添加地址',
      showTab: false,
    },
  },
  {
    name: 'editNewAddress',
    path: '/editNewAddress',
    component: editNewAddress,
    meta: {
      title: '编辑地址',
      showTab: false,
    },
  },
  //闪送地址
  {
    name: 'quickEditNewAddress',
    path: '/quickEditNewAddress',
    component: quickEditNewAddress,
    meta: {
      title: '编辑地址',
      showTab: false,
    },
  },

  {
    name: 'editRemarks',
    path: '/editRemarks',
    component: editRemarks,
    meta: {
      title: '备注',
      showTab: false,
    },
  },
  {
    name: 'quickeditRemarks',
    path: '/quickeditRemarks',
    component: quickeditRemarks,
    meta: {
      title: '备注',
      showTab: false,
    },
  },
  // 支付完成
  {
    name: 'paymenting',
    path: '/paymenting',
    component: paymenting,
    meta: {
      title: '支付完成',
      showTab: false,
    },
  },
  //支付等待
  {
    name: 'paywaiting',
    path: '/paywaiting',
    component: paywaiting,
    meta: {
      title: '等待支付',
      showTab: false,
    },
  },
  //支付失败
  {
    name: 'payError',
    path: '/payError',
    component: payError,
    meta: {
      title: '支付失败',
      showTab: false,
    },
  },
  //信用卡支付
  {
    name: 'payStatus',
    path: '/payStatus',
    component: xinyongCard,
    meta: {
      title: '支付中',
      showTab: false,
    },
  },
  {
    name: 'orderDetail',
    path: '/orderDetail',
    component: orderDetail,
    meta: {
      title: '订单详情',
      showTab: false,
    },
  },
  {
    name: 'myOrder',
    path: '/myOrder',
    component: myOrder,
    meta: {
      title: '我的订单',
      showTab: true,
    },
  },
  {
    name: 'myInfo',
    path: '/myInfo',
    component: myInfo,
    meta: {
      title: '我的',
      showTab: true,
    },
  },
  {
    name: 'feedback',
    path: '/feedback',
    component: feedback,
    meta: {
      title: '意见反馈',
      showTab: false,
    },
  },
  {
    name: 'contactPeople',
    path: '/contactPeople',
    component: contactPeople,
    meta: {
      title: '联系客户',
      showTab: false,
    },
  },
  {
    name: 'quick',
    path: '/quick',
    component: quick,
    meta: {
      title: '闪送',
      showTab: true,
    },
  },
  {
    name: 'quickAddress',
    path: '/quickAddress',
    component: quickAddress,
    meta: {
      title: '取件地址',
      showTab: false,
    },
  },
  {
    name: 'receiptAddress',
    path: '/receiptAddress',
    component: receiptAddress,
    meta: {
      title: '收件地址',
      showTab: false,
    },
  },
  {
    name: 'confirmOrder',
    path: '/confirmOrder',
    component: confirmOrder,
    meta: {
      title: '确认订单',
      showTab: false,
    },
  },
  {
    name: 'quickMyOrder',
    path: '/quickMyOrder',
    component: quickMyOrder,
    meta: {
      title: '确认订单',
      showTab: true,
    },
  },
  {
    name: 'quickOrderDetail',
    path: '/quickOrderDetail',
    component: quickOrderDetail,
    meta: {
      title: '订单详情',
      showTab: false,
    },
  },
  {
    name: 'quickDeliveryFee',
    path: '/quickDeliveryFee',
    component: quickDeliveryFee,
    meta: {
      title: '计价说明',
      showTab: false,
    },
  },
  {
    name: 'giveGoods',
    path: '/giveGoods',
    component: giveGoods,
    meta: {
      title: '配送',
      showTab: false,
    },
  },
  {
    name: 'payGateWay',
    path: '/payGateWay',
    component: payGateWay,
    meta: {
      title: '支付',
      showTab: false,
    },
  },
  

]
//避免重复路由报错问题--------
// const originalReplace = VueRouter.prototype.replace
// VueRouter.prototype.replace = function replace(location) {
//   return originalReplace.call(this, location).catch((err) => err)
// }

//避免重复路由报错问题--------
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
//-----------------
const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ x: 0, y: 0 }),
  //解决跳转页面滚动条的问题 避免浏览器记住了上一个页面的高度
  scrollBehavior(to, from, savedPosition) {
    console.log(savedPosition, 'savedPosition');
    if (savedPosition) {
      console.log('进来了');
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes,
})

export default router
