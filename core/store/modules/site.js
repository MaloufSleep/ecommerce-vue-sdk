const state = () => { 
    return {
        region: {},
        language: null,
        test: 'test'
    }
}
const getters = {}
const mutations = {
    setRegion(state, region){
        state.region = Object.assign({}, state.region, region)
    },
    setLanguage(state, language){
        state.language = language
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