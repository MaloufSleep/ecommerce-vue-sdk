const state = () => { 
    return {
        cart: {}
    }
}
const getters = {}
const mutations = {
    set(state, cart){
        state.cart = Object.assign({}, state.cart, cart)
    },
    delete(state){
        state.cart = {}
    }
}
const actions = {}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}