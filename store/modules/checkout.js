const state = () => {
    return {
        customer: {
            email: '',
            wantsEmailContact: false,
            wantsTextContact: true
        },
        order: {}
    }
}

const getters = {
  
}

const mutations = {
    resetState(state){
        Object.assign(state, state())
    },
    setOrder(state, order){
        state.order = order
    }
}

const actions = {
    orderCompleted(context, response){
        context.commit('resetState')
        context.commit('setOrder', response.data.order)
        context.dispatch('cart/setCart', response.data.cart, {root: true})
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}