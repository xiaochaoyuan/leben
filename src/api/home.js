import server from "../utils/requests";
//登录接口
export function login(data) {
    return server.request({
        method: 'post',
        url: '/auth/login',
        data
    })
}
//手机端用户注册
export function authRegister(data) {
    return server.request({
        method: 'post',
        url: '/auth/register',
        data
    })
}
//找回密码
export function authGetback(data) {
    return server.request({
        method: 'post',
        url: '/auth/getBack',
        data
    })
}
//发送短信
export function sendSMS(data) {
    return server.request({
        method: 'post',
        url: '/center/message/sendSMS',
        data
    })
}
//发送邮件
export function sendMail(data) {
    return server.request({
        method: 'post',
        url: '/center/mail/sendMail',
        data
    })
}
//获取用户信息
export function userDetail(params) {
    return server.request({
        method: 'get',
        url: '/auth/user/app/getUserDetail',
        params
    })
}
//帮买闪送的下单
export function buyOrder(data) {
    return server.request({
        method: 'post',
        url: '/order/generate/app/buy/order',
        data
    })
}
//地址管理
export function addAddress(data) {
    return server.request({
        method: 'post',
        url: '/takeout/userMerchantAddress/app/add',
        data
    })
}
//意见反馈
export function addOpinion(data) {
    return server.request({
        method: 'post',
        url: '/takeout/userFeedback/add',
        data
    })
}

//获取用户地址管理
export function addressList(data) {
    return server.request({
        method: 'post',
        url: '/takeout/userMerchantAddress/app/list',
        data
    })
}
//获取所有地址
export function addressLists(data) {
    return server.request({
        method: 'post',
        url: '/takeout/userMerchantAddress/app/buylist',
        data
    })
}
//查询用户地址详情
export function addressDetail(data) {
    return server.request({
        method: 'post',
        url: '/takeout/userMerchantAddress/app/detail',
        data
    })
}
//编辑用户地址
export function editAddressDetail(data) {
    return server.request({
        method: 'post',
        url: '/takeout/userMerchantAddress/app/edit',
        data
    })
}
//删除用户地址管理
export function deleteAddress(data) {
    return server.request({
        method: 'post',
        url: '/takeout/userMerchantAddress/app/delete',
        data
    })
}
//订单管理
export function orderList(data) {
    return server.request({
        method: 'post',
        url: '/order/order/list',
        data
    })
}

//配送费明显
export function detailType(data) {
    return server.request({
        method: 'post',
        url: '/center/systemCost/detail/type',
        data
    })
}
//闪送的地址管理添加
export function saveOrder(data) {
    return server.request({
        method: 'post',
        url: '/takeout/orderDistributionAddress/add',
        data
    })
}
//闪送的的常用地址列表
export function addressFind(id) {
    return server.request({
        method: 'get',
        url: `/takeout/orderDistributionAddress/findList/${id}`,

    })
}
//闪送常用地址的的查询
export function findOne(data) {
    return server.request({
        method: 'post',
        url: '/order/distributionAddress/findOne',
        data
    })
}
//闪送常用地址的的删除
export function deleteOne(id) {
    return server.request({
        method: 'delete',
        url: `/takeout/orderDistributionAddress/del/${id}`,

    })
}
//编辑闪送地址
export function updateOneAddress(data) {
    return server.request({
        method: 'post',
        url: '/takeout/orderDistributionAddress/update',
        data
    })
}
//根据类型查询服务分类、类型
export function systemTypeList(data) {
    return server.request({
        method: 'post',
        url: '/center/systemType/type/list',
        data
    })
}
//获取优惠券的接口
export function systemCouponsManagerList(data) {
    return server.request({
        method: 'post',
        url: '/center/systemCouponsManager/app/list',
        data
    })
}
//闪送的订单 3帮买，4闪送
export function queryBuyOrderList(data) {
    return server.request({
        method: 'post',
        url: '/order/list/app/queryBuyOrderList',
        data
    })
}
//订单详情页面
export function orderInfoDetail(id) {
    return server.request({
        method: 'get',
        url: `/order/orderInfoDetail/app/get/buyOrderDetail/${id}`,

    })
}
//明细接口
export function orderCostDetail(data) {
    return server.request({
        method: 'post',
        url: '/order/orderCost/detail',
        data
    })
}
//用户取消待支付订单
export function notPay(data) {
    return server.request({
        method: 'post',
        url: '/order/order/app/not/pay',
        data
    })
}
//用户催单
export function orderRush(data) {
    return server.request({
        method: 'post',
        url: '/order/order/app/rush/user',
        data
    })
}
//删除订单
export function orderdelete(data) {
    return server.request({
        method: 'post',
        url: '/order/order/delete',
        data
    })
}
//帮买的常用商品的查询
export function buyOrderGoods(params) {
    return server.request({
        method: 'get',
        url: '/order/orderInfoDetail/app/get/buyOrderGoods',
        params
    })
}
//帮买配送员经纬度
export function latLgt(data) {
    return server.request({
        method: 'post',
        url: '/order/orderDelivery/app/get/lat/lgt',
        data
    })
}
//------------------------------支付方式paypal
export function paypal(data) {
    return server.request({
        method: 'post',
        url: '/order/payer/app/paypal',
        data
    })
}
//支付宝支付
export function aliPay(data) {
    return server.request({
        method: 'post',
        url: '/order/payer/app/aliPay',
        data
    })
}
//支付宝支付new
export function newAliPay(data) {
    return server.request({
        method: 'post',
        url: '/order/payer/app/appByaliPay',
        data
    })
}
//-----------------------------------

//支付宝支付
export function couponsManagerList(data) {
    return server.request({
        method: 'post',
        url: '/center/systemCouponsManager/app/list/num',
        data
    })
}
//获取乐币
export function orderCostGet(data) {
    return server.request({
        method: 'post',
        url: '/order/orderCost/app/get',
        data
    })
}
//信用卡支付
export function appByStripePay(data) {
    return server.request({
        method: 'post',
        url: '/order/payer/app/appByStripePay',
        data
    })
}
//改变状态
export function appByStripeBack(data) {
    return server.request({
        method: 'post',
        url: '/order/payer/app/appByStripeBack',
        data
    })
}
//所有的退款
export function appByStripeCancel(data) {
    return server.request({
        method: 'post',
        url: '/order/payer/web/cancel/user',
        data
    })
}


