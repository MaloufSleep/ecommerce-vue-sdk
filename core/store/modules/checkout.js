const state = () => { 
    return {
        order: {}
    }
}
const getters = {}
const mutations = {
    setOrder(state, order){
        state.order = Object.assign({}, state.order, order)
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