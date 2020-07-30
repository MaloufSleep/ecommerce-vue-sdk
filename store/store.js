import cart from './modules/cart'
import checkout from './modules/checkout'
import site from './modules/site'
import payment from './modules/payment'

const state = () => {
    return  {}
}

const getters = {
}

const mutations = {
}

const actions = {
    launched(context){
        context.dispatch('cart/launched', null, {root: true})
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true,
    modules: {
        cart,
        checkout,
        site,
        payment
    }
}