const state = () => {
    return  {}
}

const getters = {
}

const mutations = {
}

const actions = {
    authenticate(context){
        return this._vm.$api.payment.synchrony.authenticate(context.rootGetters('cart/uuid')).catch(err => {
            if(err.response?.data?.cart){
                context.dispatch('cart/setCart', err.response.data.cart, {root: true})
            }
            throw err
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}