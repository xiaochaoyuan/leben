import { orderdelete, notPay, orderRush, } from "@/api/home"; //删除/取消/催单
//删除
export function deleteOrder(orderId) {
    return new Promise(resolve => {
        let data = new FormData();
        data.append("orderId", orderId);
        orderdelete(data).then((res) => {
            resolve(res)
        });
    })
}
//取消
export function calcelOrder(orderId) {
    return new Promise(resolve => {
        let data = new FormData();
        data.append("orderId", orderId);
        notPay(data).then((res) => {
            resolve(res)
        });
    })
}
//催单
export function rushOrder(orderId) {
    return new Promise(resolve => {
        let data = new FormData();
        data.append("orderNum", orderId);
        orderRush(data).then((res) => {
            resolve(res)
        });
    })

}