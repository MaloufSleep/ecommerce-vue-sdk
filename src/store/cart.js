import Dinero from 'dinero.js'

const state = () => {
    return  {}
}

const getters = {
    itemCount: state => {
        let count = 0
        if(!state.items) return count
        state.items.forEach(item => count += item.quantity)
        return count
    }
}

const mutations = {
    setCart(state, cart){
        Object.assign(state, cart)
        // this can probably be moved
        Dinero.globalLocale = cart.locale
        Dinero.defaultCurrency = cart.currency
    }
}

const actions = {
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}