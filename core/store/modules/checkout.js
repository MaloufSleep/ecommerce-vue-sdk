const state = () => { 
    return {
        order: {},
        needsRecycleEmail: false
    }
}
const getters = {}
const mutations = {
    setOrder(state, order){
        state.order = Object.assign({}, state.order, order)
    },
    setRecycleEmail(state, needsEmail) {
        state.needsRecycleEmail = needsEmail
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