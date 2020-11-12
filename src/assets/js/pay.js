//信用卡支付export function getHours(time) {
import { appByStripePay, appByStripeCancel, newAliPay, paypal } from "@/api/home"; //确定下单的按钮
//信用卡支付
export function xinyongCard(orderNo) {
    let stripe = Stripe("pk_test_GI2whV6Nxgc0DhTPzGwZYAry");
    let data = new FormData();
    data.append("orderNo", orderNo);
    appByStripePay(data).then((res) => {
        let data = JSON.parse(res.data)
        return stripe.redirectToCheckout({ sessionId: data.id });
    });
}
//所有的已支付退款接口
export function zhifuCancel(orderNo) {
    return new Promise(resolve => {
        let data = new FormData();
        data.append("orderId", orderNo);
        appByStripeCancel(data).then((res) => {
            resolve(res)
        });
    })
}
//支付宝支付
export function aliPay(orderNo, _this) {
    let data = new FormData();
    data.append("orderNo", orderNo);
    data.append("type", 3);
    newAliPay(data).then((res) => {
        if (res.code == 1000) {
            console.log(res.data);
            _this.$router.push({
                path: "/payGateWay",
                query: {
                    html: res.data,
                },
            });
        }
    });
}
//paypal支付
export function paypalPay(orderNo) {
    let data = new FormData();
    data.append("orderNo", orderNo);
    paypal(data).then((res) => {
        if (res.code == 1000) {
            window.location.href = res.data



        }
    });
}


