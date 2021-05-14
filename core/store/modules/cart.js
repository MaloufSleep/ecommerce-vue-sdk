const state = () => { 
    return {
        cart: {},
        customer: {}
    }
}
const getters = {}
const mutations = {
    set(state, cart){
        state.cart = Object.assign({}, state.cart, cart)
    },
    delete(state){
        state.cart = {}
    },
    setCustomer(state, customer){
        state.customer = Object.assign({}, state.customer, customer)
    },
    resetCustomer(state){
        state.customer = {}
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