const state = () => { 
    return {
        cart: null
    }
}
const getters = {}
const mutations = {
    set(state, cart){
        state.cart = Object.assign({}, state.cart, cart)
    },
    delete(state){
        state.cart = null
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