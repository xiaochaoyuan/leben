export const state = {
    remake: '',//备注信息
    quickRemake: '',//闪送的备注
    // zhekou:'',//折扣
    // man:'',
    // id:'',
    // jian:'',
    couponNum: {},//优惠劵的使用
    //闪送取件地址
    quickgoAds: {
        pickupAddress: '',
        pickupName: '',
        pickupPhone: '',
    },
    //闪送收件地址
    quickFromAds: {
        shipAddress: '',
        shipName: '',
        shipPhone: '',
    },
    //帮买取件地址
    helpgoAds: {
        pickupAddress: '',
        pickupName: '',
        pickupPhone: '',
    },
    //帮买收件地址
    helpFromAds: {
        shipAddress: '',
        shipName: '',
        shipPhone: '',
    }

}
export const actions = {
    // setUserInfo({commit}, platform) {
    //     commit('SET_USER_INFO', platform);
    // },
}
export const mutations = {
    //闪送取件地址
    quickgoAds(state, value) {
        state.quickgoAds = value
    },
    //闪送收货地址
    quickFromAds(state, value) {
        state.quickFromAds = value
    },
    //帮买取件地址
    helpgoAds(state, value) {
        state.helpgoAds = value
    },
    //帮买收货地址
    helpFromAds(state, value) {
        state.helpFromAds = value
        console.log(state.helpFromAds);
    },
    //帮买的备注信息
    getRemake(state, value) {
        state.remake = value;
    },
    //闪送的备注信息
    quickRemake(state, value) {
        state.quickRemake = value;
    },
    couponNum(state, value) {
        state.couponNum = value;
    }

}
export const getters = {


}
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}